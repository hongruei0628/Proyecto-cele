#!/bin/bash
# Abre el Smart Business Dashboard en el navegador (doble clic sobre este archivo).
cd "$(dirname "$0")"
./.venv/bin/python -c "import streamlit; import pandas; import plotly; import numpy" 2>/dev/null || { echo "Faltan dependencias. Ejecuta:  ./.venv/bin/pip install -r requirements.txt"; read -n1; exit 1; }

# Limpia servidores viejos de este dashboard (solo puertos 8501/8502) para
# evitar "address already in use" al reabrir. No toca otros servicios.
pkill -f "streamlit run app.py" 2>/dev/null
sleep 2

printf '\n' | ./.venv/bin/streamlit run app.py --browser.gatherUsageStats=false