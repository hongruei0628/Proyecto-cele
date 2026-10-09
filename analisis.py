#!/usr/bin/env python3
"""Lógica de análisis reutilizable por el dashboard."""

from datetime import timedelta

import numpy as np
import pandas as pd

from generar_datos import REF_DATE


def metricas_por_cliente(df: pd.DataFrame) -> pd.DataFrame:
    """Indicadores por cliente calculados sobre el conjunto filtrado."""
    ref = pd.Timestamp(REF_DATE)

    def ventanas(g):
        ultim = ref - timedelta(days=90)
        anterior = ref - timedelta(days=180)
        n_act = g.loc[g["Fecha"] >= ultim, "Importe"].count()
        n_ant = g.loc[(g["Fecha"] >= anterior) & (g["Fecha"] < ultim), "Importe"].count()
        return n_act, n_ant

    n_act, n_ant = zip(*df.groupby("Cliente").apply(lambda g: ventanas(g)))
    primer = df.groupby("Cliente")["Fecha"].min()
    ultimo = df.groupby("Cliente")["Fecha"].max()

    m = df.groupby("Cliente").agg(
        n_ordenes=("Importe", "count"),
        gasto_acumulado=("Importe", "sum"),
        ticket_promedio=("Importe", "mean"),
    )
    m["frec_actual"] = pd.Series(n_act, index=m.index) / 3.0
    m["frec_anterior"] = pd.Series(n_ant, index=m.index) / 3.0
    m["recencia_dias"] = (ref - ultimo).dt.days
    m["dias_desde_primer_compra"] = (ref - primer).dt.days
    m = m.fillna(0).reset_index()

    m["caida_frecuencia"] = (
        (m["frec_anterior"] - m["frec_actual"]) / m["frec_anterior"].replace(0, np.nan)
    ).fillna(0)
    m["caida_frecuencia"] = m["caida_frecuencia"].clip(lower=0)

    m = m.sort_values(["gasto_acumulado", "recencia_dias"], ascending=[False, True])
    return m


def segmentar(df: pd.DataFrame, m: pd.DataFrame) -> pd.DataFrame:
    top25 = m["gasto_acumulado"].quantile(0.75)
    segmentos = []
    for _, r in m.iterrows():
        if r["recencia_dias"] > 120:
            seg = "Inactivo"
        elif r["recencia_dias"] > 60 or r["caida_frecuencia"] >= 0.4:
            seg = "En riesgo"
        elif r["dias_desde_primer_compra"] <= 90 and r["n_ordenes"] <= 3:
            seg = "Nuevo"
        elif r["gasto_acumulado"] >= top25 and r["recencia_dias"] <= 60:
            seg = "Alto valor"
        elif r["frec_actual"] >= 1 and r["recencia_dias"] <= 45 and r["caida_frecuencia"] <= 0.2:
            seg = "Leal"
        else:
            seg = "Promedio"
        segmentos.append(seg)
    return m.assign(segmento=segmentos)


def nivel_riesgo(m: pd.DataFrame) -> pd.DataFrame:
    """Puntaje y nivel de riesgo explican POR QUÉ se genera cada alerta."""
    puntaje = pd.Series(index=m.index, dtype=int)
    for i, r in m.iterrows():
        p = 0
        if r["recencia_dias"] > 60:
            p += 2
        elif r["recencia_dias"] > 40:
            p += 1
        if r["caida_frecuencia"] >= 0.4:
            p += 2
        elif r["caida_frecuencia"] >= 0.2:
            p += 1
        puntaje[i] = p
    m = m.copy()
    m["puntaje_riesgo"] = puntaje
    m["nivel_riesgo"] = m["puntaje_riesgo"].map(
        lambda p: "🔴 Alto" if p >= 3 else ("🟠 Medio" if p >= 1 else "🟢 Bajo")
    )

    def explicar(r):
        partes = []
        if r["recencia_dias"] > 60:
            partes.append(f"lleva {r['recencia_dias']:.0f} días sin comprar (umbral: 60)")
        if r["caida_frecuencia"] >= 0.2:
            partes.append(
                f"frecuencia cayó de {r['frec_anterior']:.1f} a {r['frec_actual']:.1f} "
                f"compras/mes (−{r['caida_frecuencia'] * 100:.0f}%)"
            )
        if not partes:
            return "Sin señales de riesgo relevantes en este conjunto."
        return "Este cliente " + " y ".join(partes) + "."

    def accion(r):
        if r["nivel_riesgo"] == "🔴 Alto":
            return "Revisar historial y considerar contacto comercial prioritario."
        if r["nivel_riesgo"] == "🟠 Medio":
            return "Monitorear evolución y programar seguimiento si persiste la tendencia."
        return "No requiere acción inmediata."

    m["explicacion"] = m.apply(explicar, axis=1)
    m["accion_sugerida"] = m.apply(accion, axis=1)
    return m


def fmt_money(x):
    return f"${x:,.0f}"


def fmt_cambio(x):
    if x is None or (isinstance(x, float) and np.isnan(x)):
        return "—"
    return f"{x * 100:+.0f}%"