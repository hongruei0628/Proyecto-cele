"""Asistente de IA de apoyo — simple y a prueba de fallos.

Responde en español a preguntas **abiertas** sobre los datos del dashboard
(ventas, clientes, riesgos, oportunidades, productos y conceptos comerciales),
respetando siempre los filtros activos.

Cuando no hay clave configurada usa un motor de **reglas locales** (deliberado,
a partir de las mismas métricas explicables del dashboard). Si hay una clave
gratuita en `.env` (`GEMINI_API_KEY` o `GROQ_API_KEY`), delega en la nube para
responder cualquier cosa.

Nunca lanza excepciones: toda salida es un texto corto en español.
"""

from __future__ import annotations

import json
import os
from datetime import date

import pandas as pd

from analisis import REF_DATE, fmt_money, metricas_por_cliente, nivel_riesgo, segmentar

# ------------------------------------------------------------------- utils ----
def _clave(nombre: str) -> str:
    """Clave desde `.env` (sin python-dotenv) o la variable de entorno."""
    valor = os.environ.get(nombre)
    if valor:
        return valor.strip()
    ruta = os.path.join(os.path.dirname(os.path.abspath(__file__)), ".env")
    try:
        with open(ruta, encoding="utf-8") as f:
            for linea in f:
                linea = linea.strip()
                if linea and not linea.startswith("#") and "=" in linea:
                    k, _, v = linea.partition("=")
                    if k.strip() == nombre:
                        return v.strip().strip('"').strip("'")
    except OSError:
        return ""
    return ""


def estado_motor() -> tuple[str, dict]:
    """Devuelve ('reglas' | 'nube', info). Info ayuda a etiquetar en la UI."""
    proveedor = "gemini" if _clave("GEMINI_API_KEY") else "groq"
    if _clave("GEMINI_API_KEY") or _clave("GROQ_API_KEY"):
        if proveedor == "gemini":
            return "nube", {"proveedor": "gemini", "nombre": "Gemini", "modelo": "gemini-3.5-flash"}
        return "nube", {"proveedor": "groq", "nombre": "Groq", "modelo": "llama-3.3-70b-versatile"}
    return "reglas", {}


def modelos_instalados() -> list[str]:
    """Compatibilidad con la interfaz anterior (ya no usamos Ollama)."""
    return ["gemini-3.5-flash", "llama-3.3-70b-versatile"]


LLM_MODELO_POR_DEFECTO = "gemini-3.5-flash"


# ------------------------------------------------------------- reglas -------
def _reglas(df: pd.DataFrame, prompt: str) -> str:
    p = prompt.lower()

    def hay(*pals):
        return any(x in p for x in pals)

    if hay("ayuda", "qué puedes", "opciones"):
        return (
            "Puedo responder en español sobre los datos de la vista activa:\n"
            "- «¿cuál es el total de ventas?»\n"
            "- «¿qué clientes están en riesgo?»\n"
            "- «¿cuál es el mejor/peor producto?»\n"
            "- «¿qué oportunidades hay?»\n\n"
            "Con una clave en `.env` (Gemini o Groq, gratis y sin descargas) respondo "
            "preguntas abiertas de gestión comercial. Mientras tanto uso reglas locales."
        )

    if hay("total", "venta", "ingreso", "resumen", "monto", "dinero", "cuánto"):
        return _resumen(df)

    if hay("riesgo", "riesgos", "fuga", "perdiendo"):
        m = metricas_por_cliente(df)
        if m.empty:
            return "No hay clientes en la vista activa."
        altos = m[m["caida_frecuencia"] >= 0.4]
        if altos.empty:
            return "No hay clientes en riesgo alto con los filtros activos. 🎉"
        return (
            "Clientes con **riesgo alto** (caída de frecuencia ≥ 40%): "
            + ", ".join(
                f"**{c}** ({fmt_money(g)} acumulado)"
                for c, g in altos[["Cliente", "gasto_acumulado"]].head(7).values
            )
            + "."
        )

    if hay("producto", "productos", "mejor", "peor"):
        per = df.groupby("Producto")["Importe"].sum().sort_values()
        if per.empty:
            return "No hay productos en la vista."
        return (
            f"**Mejor producto:** {per.idxmax()} ({fmt_money(per.max())}). "
            f"**Peor producto:** {per.idxmin()} ({fmt_money(per.min())})."
        )

    if hay("oportunidad", "oportunidades", "recontacto", "contactar", "prioritarios"):
        return (
            "Las oportunidades se muestran en la sección **Oportunidades comerciales** del "
            "dashboard: clientes prioritarios según gasto, frecuencia y tendencia. La app "
            "solo prioriza y recomienda; la decisión de contactar es **humana**."
        )

    if hay("cliente", "clientes", "cuántos"):
        return (
            f"En la vista hay **{len(df)}** ventas y **{df['Cliente'].nunique():,}** "
            f"clientes distintos, por {fmt_money(df['Importe'].sum())}."
        )

    return (
        "Vivo en **modo reglas locales**: respondo sobre lo que contienen los datos del "
        "dashboard (totales, clientes, riesgos, productos, oportunidades). Para preguntas "
        "abiertas, agrega una clave gratuita de Gemini o Groq en `.env` (ver instrucciones "
        "en la barra lateral) y reinicia la app."
    )


def _resumen(df: pd.DataFrame) -> str:
    if df.empty:
        return "No hay ventas en la vista activa."
    total = df["Importe"].sum()
    n = df["Importe"].count()
    top_prod = df.groupby("Producto")["Importe"].sum().idxmax()
    top_cli = df.groupby("Cliente")["Importe"].sum().idxmax()
    return (
        f"Ventas en la vista: **{n:,}** por **{fmt_money(total)}**. "
        f"Mejor producto: **{top_prod}**. Cliente tope: **{top_cli}**."
    )


def responder_ia(df: pd.DataFrame, prompt: str, motor: str = "") -> tuple[str, str]:
    """Devuelve (texto, motor_detectado). Motor: 'reglas' o 'nube'."""
    motor, info = estado_motor() if motor in ("", "auto") else (motor, {})
    if motor != "nube":
        return _reglas(df, prompt), motor

    clave = _clave("GEMINI_API_KEY") or _clave("GROQ_API_KEY")
    es_gemini = _clave("GEMINI_API_KEY") != ""
    try:
        if es_gemini:
            texto = _gemini(df, prompt, clave)
        else:
            texto = _groq(df, prompt, clave)
        return texto, "nube"
    except Exception:
        return _reglas(df, prompt), "reglas (la nube falló → local)"


# --------------------------------------------------------------- nube ---------
def _ssl_ctx():
    import ssl
    try:
        import certifi
        return ssl.create_default_context(cafile=certifi.where())
    except Exception:
        return ssl.create_default_context()


def _gemini(df: pd.DataFrame, prompt: str, clave: str) -> str:
    import urllib.request
    from urllib.parse import quote

    url = (
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent"
        f"?key={quote(clave)}"
    )
    cuerpo = [{"contents": [{"parts": [{"text": _contexto(df) + "\n\nPregunta: " + prompt}]}]}]
    req = urllib.request.Request(
        url,
        data=json.dumps(cuerpo[0]).encode(),
        headers={"Content-Type": "application/json"},
        method="POST",
    )
    with urllib.request.urlopen(req, timeout=60, context=_ssl_ctx()) as r:
        resp = json.loads(r.read().decode())
    return resp["candidates"][0]["content"]["parts"][0]["text"]


def _groq(df: pd.DataFrame, prompt: str, clave: str) -> str:
    import urllib.request

    url = "https://api.groq.com/openai/v1/chat/completions"
    cuerpo = {
        "model": "llama-3.3-70b-versatile",
        "temperature": 0.4,
        "messages": [
            {"role": "system", "content": "Eres un asistente comercial en español, breve y práctico."},
            {"role": "user", "content": _contexto(df) + "\n\nPregunta: " + prompt},
        ],
    }
    req = urllib.request.Request(
        url,
        data=json.dumps(cuerpo).encode(),
        headers={
            "Content-Type": "application/json",
            "Authorization": f"Bearer {clave}",
        },
        method="POST",
    )
    with urllib.request.urlopen(req, timeout=60, context=_ssl_ctx()) as r:
        resp = json.loads(r.read().decode())
    return resp["choices"][0]["message"]["content"]


def _contexto(df: pd.DataFrame) -> str:
    if df.empty:
        return "No hay ventas en la vista activa."

    lineas = [
        f"Dashboard de ventas: {len(df):,} transacciones por "
        f"{fmt_money(df['Importe'].sum())} "
        f"entre {df['Fecha'].min().date()} y {df['Fecha'].max().date()}.",
    ]

    for titulo, gb, col in [
        ("Top productos por ingreso",
         df.groupby("Producto")["Importe"].sum().sort_values(ascending=False).head(10), "Importe"),
        ("Top clientes por ingreso",
         df.groupby("Cliente")["Importe"].sum().sort_values(ascending=False).head(10), "Importe"),
        ("Ventas por región",
         df.groupby("Region")["Importe"].sum().sort_values(ascending=False), "Importe"),
        ("Ventas por canal",
         df.groupby("Canal")["Importe"].sum().sort_values(ascending=False), "Importe"),
        ("Top vendedores por ingreso",
         df.groupby("Vendedor")["Importe"].sum().sort_values(ascending=False).head(5), "Importe"),
    ]:
        tabla = gb.reset_index().to_string(index=False)
        lineas.append(f"\n{titulo}:\n{tabla}")

    lineas.append(
        "\nSon datos simulados con fines académicos; "
        "la app solo recomienda, la decisión es humana."
    )
    return "\n".join(lineas)
