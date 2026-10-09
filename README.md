# Smart Business Dashboard — IA aplicada a la gestión comercial

Dashboard de análisis de ventas, clientes y oportunidades comerciales con alertas
**explicables** (no solo "riesgo alto", sino *por qué* se genera cada alerta) y
priorización de oportunidades **bajo supervisión humana**.

> ⚠️ **Los datos son SIMULADOS con fines académicos.** No corresponden a ninguna
> empresa real; se generan aleatoriamente con una semilla fija para ser reproducibles.

## 1. Instalación

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

## 2. Ejecución

### Opción A: Versión Web HTML Interactiva (Sin dependencias ni servidor)
Puedes abrir directamente el archivo en cualquier navegador:
- Doble clic en [Abrir Dashboard HTML.command](file:///Users/hongruei/Desktop/IA%20CELE/Abrir%20Dashboard%20HTML.command)
- O abrir directamente [index.html](file:///Users/hongruei/Desktop/IA%20CELE/index.html) en tu navegador preferido (Chrome, Safari, Edge, Firefox).

### Opción B: Versión Streamlit (Python)
```bash
streamlit run app.py
```
O con doble clic en [Abrir Dashboard.command](file:///Users/hongruei/Desktop/IA%20CELE/Abrir%20Dashboard.command).

La primera vez genera automáticamente `data/ventas_simuladas.csv` (~250 ventas, seed 42). Puedes regenerarlo con:

```bash
python generar_datos.py --ventas 300 --seed 7
```

## 3. Secciones

| Sección | ¿Qué muestra? |
| --- | --- |
| Resumen general | Ventas totales, evolución, ticket promedio, n.º de clientes, ventas por canal y región. |
| Análisis de clientes | Frecuencia, última compra, gasto acumulado y segmentación (Alto valor, Leal, Promedio, Nuevo, En riesgo, Inactivo). |
| Clientes en riesgo | Clientes con caída de frecuencia o mucha inactividad, con puntaje y criterios. |
| Alertas explicables | Tabla con la *explicación* de cada alerta (variable que la disparó) y acción sugerida. |
| Oportunidades comerciales | Clientes prioritarios para re-contacto y productos en crecimiento. |
| Productos | Mejor/peor desempeño por producto y tendencia. |
| 🎯 Misión | Tarea de la plan de evaluación: elegir 3 clientes prioritarios y justificar. |

Filtros por fecha, producto, cliente, región, canal y vendedor.

## 4. Criterios de riesgo (explicables)

- **+2 puntos**: más de 60 días sin comprar.
- **+1 punto**: entre 40 y 60 días sin comprar.
- **+2 puntos**: caída de frecuencia ≥ 40%.
- **+1 punto**: caída entre 20% y 40%.

Nivel: **3+ → riesgo alto · 1–2 → medio · 0 → bajo**.

La aplicación nunca decide contactar a un cliente: solo prioriza y recomienda.

