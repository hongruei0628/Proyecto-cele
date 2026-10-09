#!/usr/bin/env python3
"""Smart Business Dashboard — IA aplicada a la gestión comercial.

Dashboard de análisis de ventas con segmentación de clientes, alertas
explicables y priorización de oportunidades comerciales. Los datos son
SIMULADOS con fines académicos y no corresponden a ninguna empresa real.

Ejecutar con:
    streamlit run app.py
"""

import os
import json
from datetime import date, timedelta

try:
    from asistente import estado_motor, responder_ia
    ASSISTENTE_ACTIVO = True
except Exception:
    estado_motor, responder_ia = None, None
    ASSISTENTE_ACTIVO = False

import numpy as np
import pandas as pd
import plotly.express as px
import streamlit as st

from generar_datos import generar_ventas
from analisis import REF_DATE, fmt_money, metricas_por_cliente, nivel_riesgo, segmentar

try:  # la IA es opcional: la app funciona aunque este módulo falle
    from asistente import responder_ia
except Exception:
    responder_ia = None

metricas_por_cliente = st.cache_data(metricas_por_cliente)

DATA_PATH = "data/ventas_simuladas.csv"
N_VENTAS = 250
SEED = 42

PALETA = px.colors.qualitative.Set2


# ---------------------------------------------------------------- carga ----
@st.cache_data
def cargar_datos():
    if not os.path.exists(DATA_PATH):
        generar_ventas(n_ventas=N_VENTAS, seed=SEED, output=DATA_PATH)
    df = pd.read_csv(DATA_PATH, parse_dates=["Fecha"])
    return df


# ------------------------------------------------------------ secciones -----
def seccion_resumen(df):
    total = df["Importe"].sum()
    n_clientes = df["Cliente"].nunique()
    n_ordenes = len(df)
    ticket = df["Importe"].mean() if n_ordenes else 0

    c1, c2, c3, c4 = st.columns(4)
    c1.metric("Ventas totales", fmt_money(total))
    c2.metric("N° de clientes", f"{n_clientes:,}")
    c3.metric("Órdenes", f"{n_ordenes:,}")
    c4.metric("Ticket promedio", fmt_money(ticket))

    st.subheader("Evolución de ventas")
    evol = df.groupby(df["Fecha"].dt.to_period("M")).agg(ventas=("Importe", "sum")).reset_index()
    evol["Mes"] = evol["Fecha"].astype(str)
    fig = px.line(evol, x="Mes", y="ventas", markers=True,
                  labels={"ventas": "Ventas ($)"}, line_shape="spline",
                  color_discrete_sequence=PALETA)
    st.plotly_chart(fig, width="stretch")

    col1, col2 = st.columns(2)
    por_canal = df.groupby("Canal")["Importe"].sum().reset_index().sort_values("Importe", ascending=False)
    col1.subheader("Ventas por canal")
    col1.plotly_chart(
        px.bar(por_canal, x="Canal", y="Importe", color="Canal", color_discrete_sequence=PALETA,
               labels={"Importe": "Ventas ($)"}),
        width="stretch",
    )
    por_region = df.groupby("Region")["Importe"].sum().reset_index().sort_values("Importe", ascending=False)
    col2.subheader("Ventas por región")
    col2.plotly_chart(
        px.bar(por_region, x="Region", y="Importe", color="Region", color_discrete_sequence=PALETA,
               labels={"Importe": "Ventas ($)"}),
        width="stretch",
    )


def seccion_clientes(df):
    m = metricas_por_cliente(df)
    m = segmentar(df, m)

    st.subheader("Frecuencia de compra, última compra y gasto acumulado")
    tabla = m.copy()
    tabla["recencia_dias"] = tabla["recencia_dias"].round(0)
    tabla["frec_anterior"] = tabla["frec_anterior"].round(2)
    tabla["frec_actual"] = tabla["frec_actual"].round(2)
    tabla["gasto_acumulado"] = tabla["gasto_acumulado"].map(fmt_money)
    tabla["ticket_promedio"] = tabla["ticket_promedio"].map(fmt_money)
    st.dataframe(
        tabla.rename(
            columns={
                "Cliente": "Cliente",
                "n_ordenes": "Órdenes",
                "gasto_acumulado": "Gasto acumulado",
                "ticket_promedio": "Ticket promedio",
                "frec_anterior": "Frec. anterior (comp/mes)",
                "frec_actual": "Frec. actual (comp/mes)",
                "recencia_dias": "Días sin comprar",
                "segmento": "Segmento",
            }
        )[["Cliente", "Gasto acumulado", "Ticket promedio", "Órdenes",
           "Días sin comprar", "Frec. anterior (comp/mes)", "Frec. actual (comp/mes)", "Segmento"]],
        width="stretch",
        hide_index=True,
    )

    st.subheader("Segmentación")
    seg = m["segmento"].value_counts().reset_index()
    seg.columns = ["Segmento", "Clientes"]
    col1, col2 = st.columns(2)
    col1.plotly_chart(
        px.pie(seg, names="Segmento", values="Clientes", color_discrete_sequence=PALETA),
        width="stretch",
    )

    sc = m[m["segmento"] != "Inactivo"] if len(m) > len(m[m["segmento"] == "Inactivo"]) else m
    col2.plotly_chart(
        px.scatter(
            sc, x="recencia_dias", y="gasto_acumulado", color="segmento", hover_name="Cliente",
            log_y=True,
            labels={"recencia_dias": "Días sin comprar", "gasto_acumulado": "Gasto acumulado ($)"},
            color_discrete_sequence=PALETA,
        ),
        width="stretch",
    )

    st.subheader("Top clientes por gasto")
    top = m.sort_values("gasto_acumulado", ascending=False).head(10)
    st.plotly_chart(
        px.bar(top, x="Cliente", y="gasto_acumulado", color="segmento",
               labels={"gasto_acumulado": "Gasto acumulado ($)"},
               color_discrete_sequence=PALETA),
        width="stretch",
    )


def seccion_riesgo(df):
    m = metricas_por_cliente(df)
    m = nivel_riesgo(m)

    conteo = m["nivel_riesgo"].value_counts().reindex(["🔴 Alto", "🟠 Medio", "🟢 Bajo"], fill_value=0)
    c1, c2, c3 = st.columns(3)
    c1.metric("Riesgo alto", int(conteo["🔴 Alto"]))
    c2.metric("Riesgo medio", int(conteo["🟠 Medio"]))
    c3.metric("Riesgo bajo", int(conteo["🟢 Bajo"]))

    st.markdown(
        "**Criterios del puntaje de riesgo** (explicables): "
        "· +2 puntos si lleva más de 60 días sin comprar · +1 si entre 40 y 60 · "
        "+2 puntos si la frecuencia cayó ≥40% · +1 si cayó entre 20% y 40%. "
        "**3+ → riesgo alto · 1–2 → medio · 0 → bajo.**"
    )

    en_riesgo = m[m["nivel_riesgo"] != "🟢 Bajo"].sort_values("puntaje_riesgo", ascending=False)
    if en_riesgo.empty:
        st.success("No hay clientes con señales de riesgo en este conjunto de datos.")
        return

    st.subheader(f"Clientes con señales de riesgo ({len(en_riesgo)})")
    for _, r in en_riesgo.iterrows():
        with st.container(border=True):
            c1, c2 = st.columns([1, 4])
            c1.markdown(f"### {r['nivel_riesgo']}")
            c1.caption(f"Puntaje: {r['puntaje_riesgo']}/6")
            c2.markdown(f"**{r['Cliente']}**")
            c2.markdown(
                f"Última compra: **{r['recencia_dias']:.0f} días** · "
                f"Frecuencia anterior: **{r['frec_anterior']:.1f}/mes** → "
                f"actual: **{r['frec_actual']:.1f}/mes** · "
                f"Gasto acumulado: **{fmt_money(r['gasto_acumulado'])}**"
            )
            c2.markdown(f"🧠 **Explicación:** {r['explicacion']}")
            c2.markdown(f"💡 **Acción sugerida:** {r['accion_sugerida']}")


def seccion_alertas(df):
    m = metricas_por_cliente(df)
    m = nivel_riesgo(m).sort_values("puntaje_riesgo", ascending=False)

    st.markdown(
        "Cada alerta explica **qué variable** la disparó (recencia o caída de frecuencia) "
        "y propone una acción **bajo supervisión humana**. La aplicación prioriza y "
        "recomienda, pero no decide contactar al cliente automáticamente."
    )
    tabla = m.copy()
    tabla["recencia_dias"] = tabla["recencia_dias"].round(0)
    tabla["gasto_acumulado"] = tabla["gasto_acumulado"].map(fmt_money)
    tabla["frec_anterior"] = tabla["frec_anterior"].round(2)
    tabla["frec_actual"] = tabla["frec_actual"].round(2)
    tabla["caida_frecuencia"] = (tabla["caida_frecuencia"] * 100).round(0).astype(int).astype(str) + "%"
    st.dataframe(
        tabla.rename(
            columns={
                "Cliente": "Cliente",
                "nivel_riesgo": "Nivel",
                "recencia_dias": "Días sin comprar",
                "frec_anterior": "Frec. anterior",
                "frec_actual": "Frec. actual",
                "caida_frecuencia": "Caída de frecuencia",
                "gasto_acumulado": "Gasto acumulado",
                "explicacion": "Explicación (por qué)",
                "accion_sugerida": "Acción sugerida",
            }
        )[["Cliente", "Nivel", "Días sin comprar", "Frec. anterior", "Frec. actual",
           "Caída de frecuencia", "Gasto acumulado", "Explicación (por qué)", "Acción sugerida"]],
        width="stretch",
        hide_index=True,
    )


def seccion_oportunidades(df):
    st.markdown(
        "La IA **prioriza** oportunidades según dos criterios explicables: "
        "el **valor histórico** del cliente y la **tendencia** reciente. "
        "La decisión final de contacto siempre es humana."
    )
    col1, col2 = st.columns(2)

    with col1:
        st.subheader("Clientes prioritarios para re-contacto")
        m = metricas_por_cliente(df)
        m = nivel_riesgo(m)
        prio = m[(m["nivel_riesgo"] != "🟢 Bajo")].sort_values(
            ["puntaje_riesgo", "gasto_acumulado"], ascending=[False, False]
        ).head(5)
        if prio.empty:
            st.write("Sin candidatos.")
        else:
            for _, r in prio.iterrows():
                st.markdown(
                    f"**{r['Cliente']}** — {r['nivel_riesgo']} · "
                    f"Gasto histórico {fmt_money(r['gasto_acumulado'])} · "
                    f"{r['recencia_dias']:.0f} días sin comprar"
                )
                st.caption(r["explicacion"])

    with col2:
        st.subheader("Productos en crecimiento")
        ref = pd.Timestamp(REF_DATE)
        actual = df[df["Fecha"] >= ref - timedelta(days=90)]
        anterior = df[(df["Fecha"] >= ref - timedelta(days=180)) & (df["Fecha"] < ref - timedelta(days=90))]
        v_act = actual.groupby("Producto")["Importe"].sum()
        v_ant = anterior.groupby("Producto")["Importe"].sum()
        tendencia = pd.DataFrame({"actual": v_act, "anterior": v_ant}).fillna(0)
        tendencia["cambio"] = ((tendencia["actual"] - tendencia["anterior"]) / tendencia["anterior"].replace(0, np.nan)).fillna(1)
        tendencia = tendencia.sort_values("cambio", ascending=False)
        for prod, r in tendencia.head(5).iterrows():
            flecha = "📈" if r["cambio"] > 0 else "📉"
            st.markdown(
                f"**{prod}** {flecha} — "
                f"{fmt_money(r['actual'])} en últimos 90 días "
                f"({'+' if r['cambio'] >= 0 else ''}{r['cambio'] * 100:.0f}% vs. período anterior)"
            )

    st.subheader("Ventas por vendedor")
    vv = df.groupby("Vendedor")["Importe"].sum().reset_index().sort_values("Importe", ascending=False)
    st.plotly_chart(
        px.bar(vv, x="Vendedor", y="Importe", color="Vendedor", color_discrete_sequence=PALETA,
               labels={"Importe": "Ventas ($)"}),
        width="stretch",
    )


def seccion_productos(df):
    ref = pd.Timestamp(REF_DATE)
    actual = df[df["Fecha"] >= ref - timedelta(days=90)]
    anterior = df[(df["Fecha"] >= ref - timedelta(days=180)) & (df["Fecha"] < ref - timedelta(days=90))]

    prod = df.groupby("Producto").agg(
        ventas=("Importe", "sum"),
        unidades=("Cantidad", "sum"),
        ordenes=("Producto", "count"),
    )
    v_act = actual.groupby("Producto")["Importe"].sum()
    v_ant = anterior.groupby("Producto")["Importe"].sum()
    prod["ventas_ultimos_90d"] = v_act
    prod["ventas_previos_90d"] = v_ant
    prod["ventas_ultimos_90d"] = prod["ventas_ultimos_90d"].fillna(0)
    prod["ventas_previos_90d"] = prod["ventas_previos_90d"].fillna(0)
    prod["cambio"] = (prod["ventas_ultimos_90d"] - prod["ventas_previos_90d"]) / prod["ventas_previos_90d"].replace(0, np.nan)
    prod = prod.fillna(0).reset_index().sort_values("ventas", ascending=False)

    col1, col2 = st.columns(2)
    with col1:
        st.subheader("Mejor desempeño")
        mejor = prod.head(3).copy()
        mejor["ventas"] = mejor["ventas"].map(fmt_money)
        st.dataframe(
            mejor[["Producto", "ventas", "unidades", "cambio"]]
            .rename(columns={"ventas": "Ventas", "cambio": "Cambio últimos 90d"}),
            width="stretch", hide_index=True,
        )
    with col2:
        st.subheader("Peor desempeño")
        peor = prod.tail(3).copy()
        peor["ventas"] = peor["ventas"].map(fmt_money)
        st.dataframe(
            peor[["Producto", "ventas", "unidades", "cambio"]]
            .rename(columns={"ventas": "Ventas", "cambio": "Cambio últimos 90d"}),
            width="stretch", hide_index=True,
        )

    fig = px.bar(prod.sort_values("ventas"), x="Producto", y="ventas", color="Producto",
                 color_discrete_sequence=PALETA, labels={"ventas": "Ventas ($)"})
    fig.update_layout(showlegend=False, xaxis_tickangle=-30)
    st.plotly_chart(fig, width="stretch")

    prod_tabla = prod.copy()
    prod_tabla["ventas"] = prod_tabla["ventas"].map(fmt_money)
    prod_tabla["unidades"] = prod_tabla["unidades"].map(lambda x: f"{x:,.0f}")
    prod_tabla["cambio"] = prod_tabla["cambio"].apply(lambda x: f"{x * 100:+.0f}%")
    st.dataframe(prod_tabla, width="stretch", hide_index=True)


def seccion_mision(df):
    st.subheader("🎯 Misión de evaluación")
    st.markdown(
        "**Contexto:** te mostramos los candidatos que la app considera prioritarios "
        "para atención comercial y luego deberás responder la verificación. "
        "La aplicación propone, pero la decisión final es humana."
    )
    m = metricas_por_cliente(df)
    m = nivel_riesgo(m)
    prioridad = m[m["nivel_riesgo"] != "🟢 Bajo"].sort_values(
        ["puntaje_riesgo", "gasto_acumulado"], ascending=[False, False]
    )
    if prioridad.empty:
        prioridad = m.sort_values("gasto_acumulado", ascending=False).head(5)

    st.markdown("**Candidatos sugeridos por la IA (con justificación explicable):**")
    with st.container(border=True):
        for _, r in prioridad.head(6).iterrows():
            st.markdown(
                f"- **{r['Cliente']}** · {r['nivel_riesgo']} · "
                f"Gasto histórico {fmt_money(r['gasto_acumulado'])} · "
                f"{r['recencia_dias']:.0f} días sin comprar"
            )
            st.caption(r["explicacion"])

    st.divider()
    st.subheader("Verificación rápida (6 preguntas de alternativa)")

    if "quiz_reset" not in st.session_state:
        st.session_state["quiz_reset"] = 0
    if "crono_corriendo" not in st.session_state:
        st.session_state["crono_corriendo"] = False
    if "crono_acum" not in st.session_state:
        st.session_state["crono_acum"] = 0.0

    def _tiempo_crono():
        import time as _t
        if st.session_state["crono_corriendo"]:
            return st.session_state["crono_acum"] + (_t.time() - st.session_state["crono_inicio"])
        return st.session_state["crono_acum"]

    @st.fragment(run_every="1s")
    def _cronometro():
        total = _tiempo_crono()
        mins, secs = divmod(int(total), 60)
        etiqueta = "⏱ Cronómetro (en marcha…)" if st.session_state["crono_corriendo"] else "⏱ Cronómetro (pausado)"
        st.metric(etiqueta, f"{mins:02d}:{secs:02d}")

    _cronometro()

    col_a, col_b = st.columns(2)
    if col_a.button(
        "⏸️ Pausar" if st.session_state["crono_corriendo"] else "▶️ Iniciar",
        use_container_width=True,
    ):
        import time as _t
        if st.session_state["crono_corriendo"]:
            st.session_state["crono_acum"] += _t.time() - st.session_state["crono_inicio"]
            st.session_state["crono_corriendo"] = False
        else:
            st.session_state["crono_inicio"] = _t.time()
            st.session_state["crono_corriendo"] = True
        st.rerun()
    if col_b.button("↺ Reiniciar cronómetro", use_container_width=True):
        st.session_state["crono_corriendo"] = False
        st.session_state["crono_acum"] = 0.0
        st.rerun()

    tanda = st.session_state["quiz_reset"]

    def verificar(pregunta, alternativas, correcta, clave):
        elegida = st.radio(pregunta, alternativas, index=None, key=f"{clave}_{tanda}")
        if not elegida:
            return 0 if elegida is None else (1 if elegida == correcta else 0)
        if elegida == correcta:
            st.success(f"**¡Correcto! ✓** {correcta}")
            return 1
        else:
            st.error(f"**Incorrecto ✗** Elegiste: {elegida}")
            st.markdown(
                f"<span style='color:#2e7d32;font-weight:bold'>✓ La respuesta correcta es: "
                f"{correcta}</span>",
                unsafe_allow_html=True,
            )
            return 0

    c1 = verificar(
        "1) Un cliente con más de 60 días sin comprar y una caída de frecuencia de al menos "
        "40% tiene un nivel de riesgo:",
        ["🟢 Bajo", "🟠 Medio", "🔴 Alto"],
        "🔴 Alto",
        "quiz_01_riesgo",
    )

    c2 = verificar(
        "2) Según el análisis, un cliente con más de 120 días sin comprar se clasifica como:",
        ["Alto valor", "En riesgo", "Inactivo", "Nuevo"],
        "Inactivo",
        "quiz_02_segmento",
    )

    tope = prioridad["Cliente"].tolist()
    faltan = m.sort_values("gasto_acumulado", ascending=False)["Cliente"].tolist()
    blanco = []
    for c in faltan:
        if c not in tope:
            blanco.append(c)
    candidatos = (tope + blanco)[:4]
    if candidatos:
        import random

        barajadas = random.Random(7).sample(candidatos, len(candidatos))
        c3 = verificar(
            "3) Con los filtros activos, ¿qué cliente encabezaría la cola de atención "
            "comercial prioritaria?",
            barajadas,
            tope[0],
            "quiz_03_prioridad",
        )
    else:
        c3 = 0

    c4 = verificar(
        "4) Un cliente lleva 80 días sin comprar y su frecuencia cayó un 30%. "
        "¿Cuál es su puntaje de riesgo total?",
        ["1", "2", "3", "4"],
        "3",
        "quiz_04_puntaje",
    )

    c5 = verificar(
        "5) En la segmentación, un cliente con gasto acumulado alto y recencia "
        "menor a 60 días se clasifica como:",
        ["Nuevo", "Alto valor", "Leal", "En riesgo"],
        "Alto valor",
        "quiz_05_segmento",
    )

    c6 = verificar(
        "6) La acción sugerida automáticamente para un cliente con nivel de "
        "riesgo '🔴 Alto' es:",
        [
            "No requiere acción inmediata",
            "Monitorear evolución y programar seguimiento",
            "Revisar historial y considerar contacto comercial prioritario",
        ],
        "Revisar historial y considerar contacto comercial prioritario",
        "quiz_06_accion",
    )

    correctas = (c1 or 0) + (c2 or 0) + (c3 or 0) + (c4 or 0) + (c5 or 0) + (c6 or 0)

    st.progress(correctas / 6, text=f"Preguntas correctas: {correctas}/6")

    if correctas == 6:
        import time as _time
        total = _tiempo_crono()
        tmin, tsec = divmod(int(total), 60)
        st.success(
            f"🎉 **¡Ejercicio completado!** Acertaste las 6 preguntas en "
            f"**{tmin:02d}:{tsec:02d}**."
        )

    if st.button("🔄 Reiniciar preguntas", use_container_width=True):
        st.session_state["quiz_reset"] = st.session_state.get("quiz_reset", 0) + 1
        st.rerun()



def seccion_evaluacion():
    st.subheader("📝 Tu evaluación de la aplicación")
    st.markdown(
        "Tu opinión nos ayuda a mejorar. Valora cada aspecto con una nota del **1 al 10** "
        "(1 = muy deficiente, 10 = excelente) y deja un comentario si quieres."
    )

    utilidad = st.slider("Utilidad de la aplicación", 1, 10, key="eval_utilidad")
    facilidad = st.slider("Facilidad de uso", 1, 10, key="eval_facilidad")
    calidad = st.slider("Calidad del análisis", 1, 10, key="eval_calidad")
    confianza = st.slider("Confianza en las recomendaciones", 1, 10, key="eval_confianza")
    aprendizaje = st.slider("Aprendizaje logrado", 1, 10, key="eval_aprendizaje")
    comentario = st.text_area(
        "Comentarios (opcional)",
        placeholder="¿Qué te gustó? ¿Qué mejorarías?",
        key="eval_comentario",
    )

    guardado = st.session_state.get("eval_guardado", False)
    if st.button("📨 Enviar evaluación", type="primary", use_container_width=True):
        registro = {
            "fecha": date.today().isoformat(),
            "utilidad": utilidad,
            "facilidad": facilidad,
            "calidad": calidad,
            "confianza": confianza,
            "aprendizaje": aprendizaje,
            "comentario": comentario,
        }
        try:
            file = "data/evaluaciones.json"
            if os.path.exists(file):
                with open(file, encoding="utf-8") as f:
                    lista = json.load(f)
            else:
                lista = []
            lista.append(registro)
            with open(file, "w", encoding="utf-8") as f:
                json.dump(lista, f, ensure_ascii=False, indent=2)
            st.session_state["eval_guardado"] = True
            st.success(
                "✅ **¡Gracias por tu evaluación!** Quedó guardada.\n\n"
                f"- Utilidad: {utilidad}/10 · Facilidad: {facilidad}/10 · "
                f"Análisis: {calidad}/10\n"
                f"- Confianza: {confianza}/10 · Aprendizaje: {aprendizaje}/10\n"
                "Puedes volver a valorar cuando quieras."
            )
        except Exception as ex:
            st.error(f"No se pudo guardar tu evaluación: {ex}")
    elif guardado:
        st.success("✅ Tu evaluación ya fue guardada.")
    else:
        st.caption("Cuando termines de ajustar las notas, pulsa **📨 Enviar evaluación**.")


def seccion_asistente(df):
    st.subheader("🤖 Asistente de IA de apoyo")
    st.markdown(
        "Pregúntale **cualquier cosa** sobre los datos del dashboard (ventas, clientes, "
        "riesgos, oportunidades, productos) o conceptos de gestión comercial. Las respuestas "
        "consideran los **filtros activos**; la decisión final siempre es humana."
    )

    motor, info = estado_motor()
    sel = None
    if motor == "nube":
        nombre, modelo = info["nombre"], info["modelo"]
        st.success(f"☁️ **IA en la nube activa** · {nombre} · modelo **{modelo}**")
        if st.checkbox("Mostrar instrucciones de configuración"):
            st.info(
                "Para **IA real en la nube** (sin descargas), crea un archivo `.env` en esta "
                "carpeta con **una** de estas claves gratuitas y reinicia:\n\n"
                "**Google Gemini (gratis):**\n"
                "```\nGEMINI_API_KEY=tu_clave_de_aistudio.google.com\n```\n\n"
                "**Groq (gratis, muy rápido):**\n"
                "```\nGROQ_API_KEY=tu_clave_de_console.groq.com\n```\n\n"
                "Sin clave, el asistente usa **reglas locales** (funciona sin internet y "
                "sin descargar nada); las decisiones finales siempre son humanas."
            )
    else:
        sel = None
        st.info(
            "Modo **reglas locales**: funciona sin internet y sin descargas. Para **IA real "
            "en la nube** (gratis), crea un archivo `.env` en esta carpeta con una de estas "
            "claves y reinicia:\n\n"
            "**Google Gemini:**\n"
            "```\nGEMINI_API_KEY=tu_clave_de_aistudio.google.com\n```\n\n"
            "**Groq (gratis y muy rápido):**\n"
            "```\nGROQ_API_KEY=tu_clave_de_console.groq.com\n```"
        )

    if "asistente_mensajes" not in st.session_state:
        st.session_state["asistente_mensajes"] = [
            {
                "role": "assistant",
                "content": (
                    "¡Hola! 👋 Soy tu **asistente de apoyo comercial**. Puedo responder "
                    "tus dudas sobre los datos del dashboard y conceptos de gestión. "
                    "Por ejemplo: \"¿qué clientes están en riesgo?\", \"¿cuál es el mejor "
                    "producto?\" o \"explica qué es la segmentación RFM\".\n\nEscribe "
                    "**\"ayuda\"** para ver todas las opciones."
                ),
            }
        ]

    for msg in st.session_state["asistente_mensajes"]:
        with st.chat_message(msg["role"]):
            st.markdown(msg["content"])

    if prompt := st.chat_input("Escribe tu consulta…"):
        st.session_state["asistente_mensajes"].append({"role": "user", "content": prompt})
        with st.chat_message("user"):
            st.markdown(prompt)

        with st.chat_message("assistant"):
            with st.spinner("Consultando…"):
                texto, motor = responder_ia(df, prompt, sel or "")
            st.caption(f"Motor: {motor}")
            st.markdown(texto)
        st.session_state["asistente_mensajes"].append({"role": "assistant", "content": texto})


# ----------------------------------------------------------------- UI -------
def main():
    st.set_page_config(page_title="Smart Business Dashboard", page_icon="📊", layout="wide")

    df_completo = cargar_datos()

    st.sidebar.title("📊 Smart Business Dashboard")
    st.sidebar.caption(
        "Datos **simulados** con fines académicos (no corresponden a una empresa real)."
    )

    # --- Filtros -----------------------------------------------------------
    with st.sidebar.expander("Filtros", expanded=True):
        min_f, max_f = df_completo["Fecha"].min().date(), df_completo["Fecha"].max().date()
        f_rango = st.date_input("Período", value=(min_f, max_f), min_value=min_f, max_value=max_f)
        if isinstance(f_rango, tuple) and len(f_rango) == 2:
            f_inicio, f_fin = f_rango
        else:
            f_inicio, f_fin = min_f, max_f

        f_producto = st.multiselect("Producto", df_completo["Producto"].unique())
        f_cliente = st.multiselect("Cliente", df_completo["Cliente"].unique().tolist())
        col_r, col_c = st.columns(2)
        f_region = col_r.multiselect("Región", df_completo["Region"].unique())
        f_canal = col_c.multiselect("Canal", df_completo["Canal"].unique())
        f_vendedor = st.multiselect("Vendedor", df_completo["Vendedor"].unique())

    f_producto = f_producto or df_completo["Producto"].unique().tolist()
    f_cliente = f_cliente or df_completo["Cliente"].unique().tolist()
    f_region = f_region or df_completo["Region"].unique().tolist()
    f_canal = f_canal or df_completo["Canal"].unique().tolist()
    f_vendedor = f_vendedor or df_completo["Vendedor"].unique().tolist()

    filtro = (
        (df_completo["Fecha"] >= pd.Timestamp(f_inicio))
        & (df_completo["Fecha"] <= pd.Timestamp(f_fin + timedelta(days=1)))
        & (df_completo["Producto"].isin(f_producto))
        & (df_completo["Cliente"].isin(f_cliente))
        & (df_completo["Region"].isin(f_region))
        & (df_completo["Canal"].isin(f_canal))
        & (df_completo["Vendedor"].isin(f_vendedor))
    )
    df = df_completo[filtro].copy()

    seccion = st.sidebar.radio(
        "Sección",
        [
            "Resumen general",
            "Análisis de clientes",
            "Clientes en riesgo",
            "Alertas explicables",
            "Oportunidades comerciales",
            "Productos",
            "🎯 Misión de evaluación",
            "🤖 Asistente de IA de apoyo",
            "📝 Evaluación",
        ],
    )

    st.sidebar.divider()
    st.sidebar.caption(f"Ventas en vista: **{len(df):,}** | Clientes: **{df['Cliente'].nunique():,}**")

    st.title("Smart Business Dashboard")
    st.caption("IA aplicada a la gestión comercial · datos simulados académicos")

    if df.empty:
        st.warning("No hay ventas que coincidan con los filtros seleccionados.")
    elif seccion == "Resumen general":
        seccion_resumen(df)
    elif seccion == "Análisis de clientes":
        seccion_clientes(df)
    elif seccion == "Clientes en riesgo":
        seccion_riesgo(df)
    elif seccion == "Alertas explicables":
        seccion_alertas(df)
    elif seccion == "Oportunidades comerciales":
        seccion_oportunidades(df)
    elif seccion == "Productos":
        seccion_productos(df)
    elif seccion == "🎯 Misión de evaluación":
        seccion_mision(df)
    elif seccion == "🤖 Asistente de IA de apoyo":
        seccion_asistente(df)
    elif seccion == "📝 Evaluación":
        seccion_evaluacion()


    st.divider()
    st.caption(
        "Estos datos son **ficticios**, generados aleatoriamente con fines académicos "
        "y no representan a ninguna empresa real. La herramienta apoya la toma de decisiones "
        "humanas (prioriza y recomienda); no automatiza el contacto con clientes."
    )


if __name__ == "__main__":
    main()