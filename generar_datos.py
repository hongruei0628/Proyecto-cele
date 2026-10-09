#!/usr/bin/env python3
"""Generador de datos comerciales SIMULADOS (fines académicos).

Crea un archivo CSV con ~N ventas ficticias de una empresa de software/servicios B2B.
Los datos no corresponden a ninguna empresa real: son generados aleatoriamente
con una semilla fija para que los resultados sean reproducibles.

Uso:
    python generar_datos.py                       # genera data/ventas_simuladas.csv (250 ventas, seed 42)
    python generar_datos.py --ventas 300 --seed 7
    python generar_datos.py --output mi_archivo.csv
"""

import argparse
import os
from datetime import date, datetime, timedelta

import numpy as np
import pandas as pd

REF_DATE = date(2026, 9, 10)  # fecha de referencia para cálculos (p.ej. "hoy")

REGIONES = ["Norte", "Centro", "Sur", "Oriente", "Occidente"]
CANALES = ["Directo", "Distribuidor", "Online", "Tienda"]
VENDEDORES = ["Ana Torres", "Luis Pérez", "Carla Ríos", "Juan Mora", "Sofía Vega", "Diego Núñez"]

PRODUCTOS = pd.DataFrame(
    [
        ("Licencia CRM Pro", "Software", 250_000),
        ("Módulo de Analítica", "Software", 180_000),
        ("Reportes Automatizados", "Software", 90_000),
        ("App Móvil para Ventas", "Software", 300_000),
        ("Capacitación Comercial", "Servicios", 120_000),
        ("Consultoría de Procesos", "Servicios", 350_000),
        ("Integración ERP", "Servicios", 600_000),
        ("Migración de Datos", "Servicios", 220_000),
        ("Soporte Premium (anual)", "Servicios", 150_000),
        ("Plan de Fidelización", "Servicios", 75_000),
    ],
    columns=["Producto", "Categoria", "Precio_base"],
)


def generar_ventas(n_ventas=250, seed=42, output="data/ventas_simuladas.csv"):
    rng = np.random.default_rng(seed)

    # --- Perfil de clientes -------------------------------------------------
    n_clientes = 32
    clientes = []
    for i in range(1, n_clientes + 1):
        tier = rng.choice(["alto", "medio", "bajo"], p=[0.25, 0.40, 0.35])
        base_freq = {
            "alto": rng.uniform(0.8, 1.5),
            "medio": rng.uniform(0.4, 0.9),
            "bajo": rng.uniform(0.2, 0.5),
        }[tier]
        perfil = rng.choice(
            ["constante", "declinando", "inactivo", "creciente"], p=[0.35, 0.25, 0.20, 0.20]
        )
        decline = 0.0
        if perfil == "declinando":
            decline = rng.uniform(0.5, 0.85)
        churn_month = None
        if perfil == "inactivo":
            churn_month = int(rng.uniform(5, 9))  # deja de comprar hace ~3 a 7 meses
        region = rng.choice(REGIONES)
        canal = rng.choice(CANALES)
        vendedor = rng.choice(VENDEDORES)
        n_prod = int(rng.integers(2, 6))
        productos = rng.choice(PRODUCTOS["Producto"].to_numpy(), size=n_prod, replace=False)
        descuento = rng.uniform(0.0, 0.15) if tier == "alto" else 0.0
        clientes.append(
            {
                "id": i,
                "nombre": f"Cliente {i:03d}",
                "tier": tier,
                "base_freq": base_freq,
                "perfil": perfil,
                "decline": decline,
                "churn_month": churn_month,
                "region": region,
                "canal": canal,
                "vendedor": vendedor,
                "productos": productos,
                "descuento": descuento,
            }
        )

    # --- Generar órdenes mes a mes ------------------------------------------
    start, end = REF_DATE - timedelta(days=364), REF_DATE
    meses = pd.date_range(start=start, end=end, freq="MS").tolist()

    registros = []
    fecha_ref = datetime(REF_DATE.year, REF_DATE.month, REF_DATE.day)

    for cliente in clientes:
        for m_idx, mes in enumerate(meses):
            # Intensidad según perfil
            frac = m_idx / max(len(meses) - 1, 1)
            intensidad = cliente["base_freq"]
            if cliente["perfil"] == "declinando":
                intensidad *= 1 - cliente["decline"] * frac
            elif cliente["perfil"] == "creciente":
                intensidad *= 0.35 + 0.65 * frac
            if cliente["churn_month"] is not None and m_idx > cliente["churn_month"]:
                intensidad = 0.0

            n_ordenes = int(rng.poisson(intensidad))
            if n_ordenes <= 0:
                continue

            for _ in range(n_ordenes):
                # Fecha aleatoria dentro del mes
                max_dia = (mes + pd.offsets.MonthEnd(0)).day
                dia = int(rng.integers(1, max_dia + 1))
                fecha = mes.to_pydatetime().replace(day=dia, hour=0, minute=0, second=0)
                if fecha > fecha_ref:
                    fecha = fecha_ref

                producto = str(rng.choice(cliente["productos"]))
                precio_base = float(PRODUCTOS.loc[PRODUCTOS["Producto"] == producto, "Precio_base"].iloc[0])
                precio = precio_base * (1 - cliente["descuento"])
                cantidad = int(rng.integers(1, 4 if cliente["tier"] == "alto" else 3))
                precio_unit = round(rng.uniform(0.95, 1.05) * precio)

                registros.append(
                    {
                        "Fecha": fecha,
                        "Cliente": cliente["nombre"],
                        "Region": cliente["region"],
                        "Canal": cliente["canal"],
                        "Vendedor": cliente["vendedor"],
                        "Producto": producto,
                        "Categoria": PRODUCTOS.loc[PRODUCTOS["Producto"] == producto, "Categoria"].iloc[0],
                        "Cantidad": cantidad,
                        "Precio_unitario": precio_unit,
                        "Importe": precio_unit * cantidad,
                    }
                )

    df = pd.DataFrame(registros)
    df = df.sort_values("Fecha").reset_index(drop=True)

    # --- Ajustar al número objetivo de ventas --------------------------------
    if len(df) > n_ventas:
        df = df.tail(n_ventas).reset_index(drop=True)
    elif len(df) < n_ventas:
        print(f"Aviso: se generaron {len(df)} ventas (objetivo {n_ventas}).")

    df["Fecha"] = pd.to_datetime(df["Fecha"]).dt.date
    df = df[["Fecha", "Cliente", "Producto", "Categoria", "Cantidad", "Precio_unitario",
             "Importe", "Region", "Canal", "Vendedor"]]

    if output:
        os.makedirs(os.path.dirname(output) or ".", exist_ok=True)
        df.to_csv(output, index=False)
        print(f"✅ {len(df)} ventas simuladas guardadas en {output} (seed={seed})")
    return df


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Genera datos comerciales simulados (académicos).")
    parser.add_argument("--ventas", type=int, default=250, help="Número objetivo de ventas (por defecto 250).")
    parser.add_argument("--seed", type=int, default=42, help="Semilla aleatoria (por defecto 42).")
    parser.add_argument("--output", type=str, default="data/ventas_simuladas.csv", help="Ruta de salida CSV.")
    args = parser.parse_args()
    generar_ventas(n_ventas=args.ventas, seed=args.seed, output=args.output)