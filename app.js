/**
 * Smart Business Dashboard — Interactive Application Logic
 * Converted from Python/Streamlit to Native Client-Side JavaScript
 */

// --- Base Constants & Reference Date ---
const REF_DATE = new Date('2026-09-10T00:00:00');

// Initial simulated sales dataset embedded directly
const INITIAL_SALES_DATA = [
  {"Fecha":"2025-10-02","Cliente":"Cliente 012","Producto":"Consultoría de Procesos","Categoria":"Servicios","Cantidad":2,"Precio_unitario":333988,"Importe":667976,"Region":"Sur","Canal":"Directo","Vendedor":"Juan Mora"},
  {"Fecha":"2025-10-05","Cliente":"Cliente 020","Producto":"Soporte Premium (anual)","Categoria":"Servicios","Cantidad":1,"Precio_unitario":150289,"Importe":150289,"Region":"Occidente","Canal":"Distribuidor","Vendedor":"Luis Pérez"},
  {"Fecha":"2025-10-05","Cliente":"Cliente 022","Producto":"Licencia CRM Pro","Categoria":"Software","Cantidad":2,"Precio_unitario":255655,"Importe":511310,"Region":"Occidente","Canal":"Tienda","Vendedor":"Diego Núñez"},
  {"Fecha":"2025-10-06","Cliente":"Cliente 020","Producto":"Migración de Datos","Categoria":"Servicios","Cantidad":1,"Precio_unitario":207163,"Importe":207163,"Region":"Occidente","Canal":"Distribuidor","Vendedor":"Luis Pérez"},
  {"Fecha":"2025-10-06","Cliente":"Cliente 021","Producto":"Migración de Datos","Categoria":"Servicios","Cantidad":3,"Precio_unitario":211878,"Importe":635634,"Region":"Sur","Canal":"Directo","Vendedor":"Diego Núñez"},
  {"Fecha":"2025-10-07","Cliente":"Cliente 026","Producto":"Capacitación Comercial","Categoria":"Servicios","Cantidad":1,"Precio_unitario":118240,"Importe":118240,"Region":"Occidente","Canal":"Online","Vendedor":"Ana Torres"},
  {"Fecha":"2025-10-13","Cliente":"Cliente 005","Producto":"Plan de Fidelización","Categoria":"Servicios","Cantidad":2,"Precio_unitario":76119,"Importe":152238,"Region":"Occidente","Canal":"Directo","Vendedor":"Sofía Vega"},
  {"Fecha":"2025-10-14","Cliente":"Cliente 023","Producto":"Soporte Premium (anual)","Categoria":"Servicios","Cantidad":1,"Precio_unitario":129060,"Importe":129060,"Region":"Oriente","Canal":"Tienda","Vendedor":"Carla Ríos"},
  {"Fecha":"2025-10-15","Cliente":"Cliente 027","Producto":"Licencia CRM Pro","Categoria":"Software","Cantidad":1,"Precio_unitario":221179,"Importe":221179,"Region":"Occidente","Canal":"Online","Vendedor":"Sofía Vega"},
  {"Fecha":"2025-10-16","Cliente":"Cliente 024","Producto":"Módulo de Analítica","Categoria":"Software","Cantidad":2,"Precio_unitario":188608,"Importe":377216,"Region":"Norte","Canal":"Tienda","Vendedor":"Juan Mora"},
  {"Fecha":"2025-10-17","Cliente":"Cliente 001","Producto":"Migración de Datos","Categoria":"Servicios","Cantidad":2,"Precio_unitario":230095,"Importe":460190,"Region":"Sur","Canal":"Tienda","Vendedor":"Sofía Vega"},
  {"Fecha":"2025-10-17","Cliente":"Cliente 012","Producto":"Integración ERP","Categoria":"Servicios","Cantidad":3,"Precio_unitario":584835,"Importe":1754505,"Region":"Sur","Canal":"Directo","Vendedor":"Juan Mora"},
  {"Fecha":"2025-10-17","Cliente":"Cliente 021","Producto":"Soporte Premium (anual)","Categoria":"Servicios","Cantidad":2,"Precio_unitario":147946,"Importe":295892,"Region":"Sur","Canal":"Directo","Vendedor":"Diego Núñez"},
  {"Fecha":"2025-10-18","Cliente":"Cliente 009","Producto":"App Móvil para Ventas","Categoria":"Software","Cantidad":1,"Precio_unitario":307887,"Importe":307887,"Region":"Sur","Canal":"Online","Vendedor":"Carla Ríos"},
  {"Fecha":"2025-10-22","Cliente":"Cliente 031","Producto":"Consultoría de Procesos","Categoria":"Servicios","Cantidad":2,"Precio_unitario":333339,"Importe":666678,"Region":"Oriente","Canal":"Tienda","Vendedor":"Sofía Vega"},
  {"Fecha":"2025-10-22","Cliente":"Cliente 026","Producto":"Plan de Fidelización","Categoria":"Servicios","Cantidad":1,"Precio_unitario":73637,"Importe":73637,"Region":"Occidente","Canal":"Online","Vendedor":"Ana Torres"},
  {"Fecha":"2025-10-25","Cliente":"Cliente 002","Producto":"Consultoría de Procesos","Categoria":"Servicios","Cantidad":2,"Precio_unitario":338016,"Importe":676032,"Region":"Occidente","Canal":"Tienda","Vendedor":"Sofía Vega"},
  {"Fecha":"2025-10-25","Cliente":"Cliente 023","Producto":"Soporte Premium (anual)","Categoria":"Servicios","Cantidad":1,"Precio_unitario":136074,"Importe":136074,"Region":"Oriente","Canal":"Tienda","Vendedor":"Carla Ríos"},
  {"Fecha":"2025-10-26","Cliente":"Cliente 004","Producto":"Integración ERP","Categoria":"Servicios","Cantidad":1,"Precio_unitario":577495,"Importe":577495,"Region":"Centro","Canal":"Online","Vendedor":"Sofía Vega"},
  {"Fecha":"2025-10-27","Cliente":"Cliente 004","Producto":"Módulo de Analítica","Categoria":"Software","Cantidad":2,"Precio_unitario":171723,"Importe":343446,"Region":"Centro","Canal":"Online","Vendedor":"Sofía Vega"},
  {"Fecha":"2025-10-27","Cliente":"Cliente 008","Producto":"Plan de Fidelización","Categoria":"Servicios","Cantidad":2,"Precio_unitario":77379,"Importe":154758,"Region":"Occidente","Canal":"Online","Vendedor":"Sofía Vega"},
  {"Fecha":"2025-10-28","Cliente":"Cliente 031","Producto":"Integración ERP","Categoria":"Servicios","Cantidad":2,"Precio_unitario":597821,"Importe":1195642,"Region":"Oriente","Canal":"Tienda","Vendedor":"Sofía Vega"},
  {"Fecha":"2025-10-30","Cliente":"Cliente 013","Producto":"Plan de Fidelización","Categoria":"Servicios","Cantidad":1,"Precio_unitario":74006,"Importe":74006,"Region":"Norte","Canal":"Online","Vendedor":"Sofía Vega"},
  {"Fecha":"2025-10-31","Cliente":"Cliente 003","Producto":"Integración ERP","Categoria":"Servicios","Cantidad":2,"Precio_unitario":609941,"Importe":1219882,"Region":"Sur","Canal":"Directo","Vendedor":"Sofía Vega"},
  {"Fecha":"2025-10-31","Cliente":"Cliente 026","Producto":"Capacitación Comercial","Categoria":"Servicios","Cantidad":1,"Precio_unitario":119097,"Importe":119097,"Region":"Occidente","Canal":"Online","Vendedor":"Ana Torres"},
  {"Fecha":"2025-11-02","Cliente":"Cliente 030","Producto":"App Móvil para Ventas","Categoria":"Software","Cantidad":1,"Precio_unitario":312717,"Importe":312717,"Region":"Sur","Canal":"Distribuidor","Vendedor":"Carla Ríos"},
  {"Fecha":"2025-11-03","Cliente":"Cliente 020","Producto":"Capacitación Comercial","Categoria":"Servicios","Cantidad":2,"Precio_unitario":116357,"Importe":232714,"Region":"Occidente","Canal":"Distribuidor","Vendedor":"Luis Pérez"},
  {"Fecha":"2025-11-04","Cliente":"Cliente 030","Producto":"App Móvil para Ventas","Categoria":"Software","Cantidad":2,"Precio_unitario":313366,"Importe":626732,"Region":"Sur","Canal":"Distribuidor","Vendedor":"Carla Ríos"},
  {"Fecha":"2025-11-05","Cliente":"Cliente 001","Producto":"Consultoría de Procesos","Categoria":"Servicios","Cantidad":2,"Precio_unitario":360329,"Importe":720658,"Region":"Sur","Canal":"Tienda","Vendedor":"Sofía Vega"},
  {"Fecha":"2025-11-07","Cliente":"Cliente 020","Producto":"Consultoría de Procesos","Categoria":"Servicios","Cantidad":2,"Precio_unitario":349629,"Importe":699258,"Region":"Occidente","Canal":"Distribuidor","Vendedor":"Luis Pérez"},
  {"Fecha":"2025-11-07","Cliente":"Cliente 014","Producto":"App Móvil para Ventas","Categoria":"Software","Cantidad":1,"Precio_unitario":310883,"Importe":310883,"Region":"Sur","Canal":"Distribuidor","Vendedor":"Carla Ríos"},
  {"Fecha":"2025-11-09","Cliente":"Cliente 013","Producto":"Reportes Automatizados","Categoria":"Software","Cantidad":1,"Precio_unitario":82378,"Importe":82378,"Region":"Norte","Canal":"Online","Vendedor":"Sofía Vega"},
  {"Fecha":"2025-11-13","Cliente":"Cliente 012","Producto":"Integración ERP","Categoria":"Servicios","Cantidad":3,"Precio_unitario":554028,"Importe":1662084,"Region":"Sur","Canal":"Directo","Vendedor":"Juan Mora"},
  {"Fecha":"2025-11-15","Cliente":"Cliente 026","Producto":"Capacitación Comercial","Categoria":"Servicios","Cantidad":1,"Precio_unitario":124549,"Importe":124549,"Region":"Occidente","Canal":"Online","Vendedor":"Ana Torres"},
  {"Fecha":"2025-11-16","Cliente":"Cliente 020","Producto":"Reportes Automatizados","Categoria":"Software","Cantidad":1,"Precio_unitario":83948,"Importe":83948,"Region":"Occidente","Canal":"Distribuidor","Vendedor":"Luis Pérez"},
  {"Fecha":"2025-11-18","Cliente":"Cliente 025","Producto":"Soporte Premium (anual)","Categoria":"Servicios","Cantidad":1,"Precio_unitario":147542,"Importe":147542,"Region":"Occidente","Canal":"Online","Vendedor":"Diego Núñez"},
  {"Fecha":"2025-11-19","Cliente":"Cliente 013","Producto":"Plan de Fidelización","Categoria":"Servicios","Cantidad":1,"Precio_unitario":69259,"Importe":69259,"Region":"Norte","Canal":"Online","Vendedor":"Sofía Vega"},
  {"Fecha":"2025-11-19","Cliente":"Cliente 031","Producto":"Reportes Automatizados","Categoria":"Software","Cantidad":1,"Precio_unitario":91068,"Importe":91068,"Region":"Oriente","Canal":"Tienda","Vendedor":"Sofía Vega"},
  {"Fecha":"2025-11-21","Cliente":"Cliente 026","Producto":"Licencia CRM Pro","Categoria":"Software","Cantidad":1,"Precio_unitario":256221,"Importe":256221,"Region":"Occidente","Canal":"Online","Vendedor":"Ana Torres"},
  {"Fecha":"2025-11-21","Cliente":"Cliente 005","Producto":"Migración de Datos","Categoria":"Servicios","Cantidad":2,"Precio_unitario":217889,"Importe":435778,"Region":"Occidente","Canal":"Directo","Vendedor":"Sofía Vega"},
  {"Fecha":"2025-11-22","Cliente":"Cliente 008","Producto":"Reportes Automatizados","Categoria":"Software","Cantidad":2,"Precio_unitario":84440,"Importe":168880,"Region":"Occidente","Canal":"Online","Vendedor":"Sofía Vega"},
  {"Fecha":"2025-11-22","Cliente":"Cliente 026","Producto":"Plan de Fidelización","Categoria":"Servicios","Cantidad":1,"Precio_unitario":77948,"Importe":77948,"Region":"Occidente","Canal":"Online","Vendedor":"Ana Torres"},
  {"Fecha":"2025-11-23","Cliente":"Cliente 020","Producto":"Consultoría de Procesos","Categoria":"Servicios","Cantidad":1,"Precio_unitario":331335,"Importe":331335,"Region":"Occidente","Canal":"Distribuidor","Vendedor":"Luis Pérez"},
  {"Fecha":"2025-11-24","Cliente":"Cliente 008","Producto":"App Móvil para Ventas","Categoria":"Software","Cantidad":1,"Precio_unitario":292629,"Importe":292629,"Region":"Occidente","Canal":"Online","Vendedor":"Sofía Vega"},
  {"Fecha":"2025-11-25","Cliente":"Cliente 021","Producto":"Licencia CRM Pro","Categoria":"Software","Cantidad":3,"Precio_unitario":224514,"Importe":673542,"Region":"Sur","Canal":"Directo","Vendedor":"Diego Núñez"},
  {"Fecha":"2025-11-26","Cliente":"Cliente 028","Producto":"Licencia CRM Pro","Categoria":"Software","Cantidad":1,"Precio_unitario":242807,"Importe":242807,"Region":"Centro","Canal":"Directo","Vendedor":"Diego Núñez"},
  {"Fecha":"2025-12-01","Cliente":"Cliente 028","Producto":"Capacitación Comercial","Categoria":"Servicios","Cantidad":2,"Precio_unitario":119639,"Importe":239278,"Region":"Centro","Canal":"Directo","Vendedor":"Diego Núñez"},
  {"Fecha":"2025-12-01","Cliente":"Cliente 025","Producto":"Capacitación Comercial","Categoria":"Servicios","Cantidad":1,"Precio_unitario":123292,"Importe":123292,"Region":"Occidente","Canal":"Online","Vendedor":"Diego Núñez"},
  {"Fecha":"2025-12-02","Cliente":"Cliente 013","Producto":"Plan de Fidelización","Categoria":"Servicios","Cantidad":1,"Precio_unitario":73116,"Importe":73116,"Region":"Norte","Canal":"Online","Vendedor":"Sofía Vega"},
  {"Fecha":"2025-12-02","Cliente":"Cliente 029","Producto":"Módulo de Analítica","Categoria":"Software","Cantidad":1,"Precio_unitario":150812,"Importe":150812,"Region":"Sur","Canal":"Tienda","Vendedor":"Juan Mora"},
  {"Fecha":"2025-12-03","Cliente":"Cliente 004","Producto":"Reportes Automatizados","Categoria":"Software","Cantidad":1,"Precio_unitario":92112,"Importe":92112,"Region":"Centro","Canal":"Online","Vendedor":"Sofía Vega"},
  {"Fecha":"2025-12-05","Cliente":"Cliente 018","Producto":"Plan de Fidelización","Categoria":"Servicios","Cantidad":1,"Precio_unitario":76751,"Importe":76751,"Region":"Norte","Canal":"Directo","Vendedor":"Diego Núñez"},
  {"Fecha":"2025-12-06","Cliente":"Cliente 017","Producto":"Plan de Fidelización","Categoria":"Servicios","Cantidad":1,"Precio_unitario":71629,"Importe":71629,"Region":"Oriente","Canal":"Distribuidor","Vendedor":"Juan Mora"},
  {"Fecha":"2025-12-08","Cliente":"Cliente 020","Producto":"Capacitación Comercial","Categoria":"Servicios","Cantidad":1,"Precio_unitario":114374,"Importe":114374,"Region":"Occidente","Canal":"Distribuidor","Vendedor":"Luis Pérez"},
  {"Fecha":"2025-12-09","Cliente":"Cliente 017","Producto":"Reportes Automatizados","Categoria":"Software","Cantidad":2,"Precio_unitario":88153,"Importe":176306,"Region":"Oriente","Canal":"Distribuidor","Vendedor":"Juan Mora"},
  {"Fecha":"2025-12-10","Cliente":"Cliente 002","Producto":"Migración de Datos","Categoria":"Servicios","Cantidad":1,"Precio_unitario":225053,"Importe":225053,"Region":"Occidente","Canal":"Tienda","Vendedor":"Sofía Vega"},
  {"Fecha":"2025-12-10","Cliente":"Cliente 022","Producto":"Plan de Fidelización","Categoria":"Servicios","Cantidad":1,"Precio_unitario":78375,"Importe":78375,"Region":"Occidente","Canal":"Tienda","Vendedor":"Diego Núñez"},
  {"Fecha":"2025-12-11","Cliente":"Cliente 021","Producto":"Consultoría de Procesos","Categoria":"Servicios","Cantidad":2,"Precio_unitario":337383,"Importe":674766,"Region":"Sur","Canal":"Directo","Vendedor":"Diego Núñez"},
  {"Fecha":"2025-12-11","Cliente":"Cliente 015","Producto":"Reportes Automatizados","Categoria":"Software","Cantidad":1,"Precio_unitario":86744,"Importe":86744,"Region":"Centro","Canal":"Tienda","Vendedor":"Ana Torres"},
  {"Fecha":"2025-12-14","Cliente":"Cliente 010","Producto":"Plan de Fidelización","Categoria":"Servicios","Cantidad":1,"Precio_unitario":71305,"Importe":71305,"Region":"Oriente","Canal":"Distribuidor","Vendedor":"Sofía Vega"},
  {"Fecha":"2025-12-15","Cliente":"Cliente 029","Producto":"Integración ERP","Categoria":"Servicios","Cantidad":2,"Precio_unitario":541242,"Importe":1082484,"Region":"Sur","Canal":"Tienda","Vendedor":"Juan Mora"},
  {"Fecha":"2025-12-15","Cliente":"Cliente 019","Producto":"Módulo de Analítica","Categoria":"Software","Cantidad":2,"Precio_unitario":180396,"Importe":360792,"Region":"Norte","Canal":"Tienda","Vendedor":"Diego Núñez"},
  {"Fecha":"2025-12-20","Cliente":"Cliente 030","Producto":"Integración ERP","Categoria":"Servicios","Cantidad":2,"Precio_unitario":603760,"Importe":1207520,"Region":"Sur","Canal":"Distribuidor","Vendedor":"Carla Ríos"},
  {"Fecha":"2025-12-20","Cliente":"Cliente 018","Producto":"Capacitación Comercial","Categoria":"Servicios","Cantidad":2,"Precio_unitario":120204,"Importe":240408,"Region":"Norte","Canal":"Directo","Vendedor":"Diego Núñez"},
  {"Fecha":"2025-12-22","Cliente":"Cliente 012","Producto":"Consultoría de Procesos","Categoria":"Servicios","Cantidad":2,"Precio_unitario":320781,"Importe":641562,"Region":"Sur","Canal":"Directo","Vendedor":"Juan Mora"},
  {"Fecha":"2025-12-22","Cliente":"Cliente 027","Producto":"Capacitación Comercial","Categoria":"Servicios","Cantidad":3,"Precio_unitario":111402,"Importe":334206,"Region":"Occidente","Canal":"Online","Vendedor":"Sofía Vega"},
  {"Fecha":"2025-12-23","Cliente":"Cliente 001","Producto":"Consultoría de Procesos","Categoria":"Servicios","Cantidad":1,"Precio_unitario":354066,"Importe":354066,"Region":"Sur","Canal":"Tienda","Vendedor":"Sofía Vega"},
  {"Fecha":"2025-12-25","Cliente":"Cliente 023","Producto":"Consultoría de Procesos","Categoria":"Servicios","Cantidad":1,"Precio_unitario":295381,"Importe":295381,"Region":"Oriente","Canal":"Tienda","Vendedor":"Carla Ríos"},
  {"Fecha":"2025-12-26","Cliente":"Cliente 028","Producto":"Licencia CRM Pro","Categoria":"Software","Cantidad":2,"Precio_unitario":238987,"Importe":477974,"Region":"Centro","Canal":"Directo","Vendedor":"Diego Núñez"},
  {"Fecha":"2025-12-26","Cliente":"Cliente 020","Producto":"Consultoría de Procesos","Categoria":"Servicios","Cantidad":1,"Precio_unitario":347147,"Importe":347147,"Region":"Occidente","Canal":"Distribuidor","Vendedor":"Luis Pérez"},
  {"Fecha":"2026-01-01","Cliente":"Cliente 014","Producto":"App Móvil para Ventas","Categoria":"Software","Cantidad":1,"Precio_unitario":308417,"Importe":308417,"Region":"Sur","Canal":"Distribuidor","Vendedor":"Carla Ríos"},
  {"Fecha":"2026-01-04","Cliente":"Cliente 029","Producto":"Soporte Premium (anual)","Categoria":"Servicios","Cantidad":3,"Precio_unitario":124747,"Importe":374241,"Region":"Sur","Canal":"Tienda","Vendedor":"Juan Mora"},
  {"Fecha":"2026-01-06","Cliente":"Cliente 017","Producto":"Soporte Premium (anual)","Categoria":"Servicios","Cantidad":1,"Precio_unitario":145969,"Importe":145969,"Region":"Oriente","Canal":"Distribuidor","Vendedor":"Juan Mora"},
  {"Fecha":"2026-01-07","Cliente":"Cliente 029","Producto":"Capacitación Comercial","Categoria":"Servicios","Cantidad":1,"Precio_unitario":109255,"Importe":109255,"Region":"Sur","Canal":"Tienda","Vendedor":"Juan Mora"},
  {"Fecha":"2026-01-07","Cliente":"Cliente 021","Producto":"Licencia CRM Pro","Categoria":"Software","Cantidad":2,"Precio_unitario":238359,"Importe":476718,"Region":"Sur","Canal":"Directo","Vendedor":"Diego Núñez"},
  {"Fecha":"2026-01-08","Cliente":"Cliente 003","Producto":"App Móvil para Ventas","Categoria":"Software","Cantidad":1,"Precio_unitario":308303,"Importe":308303,"Region":"Sur","Canal":"Directo","Vendedor":"Sofía Vega"},
  {"Fecha":"2026-01-10","Cliente":"Cliente 007","Producto":"Migración de Datos","Categoria":"Servicios","Cantidad":2,"Precio_unitario":220080,"Importe":440160,"Region":"Oriente","Canal":"Directo","Vendedor":"Carla Ríos"},
  {"Fecha":"2026-01-12","Cliente":"Cliente 018","Producto":"Capacitación Comercial","Categoria":"Servicios","Cantidad":2,"Precio_unitario":120839,"Importe":241678,"Region":"Norte","Canal":"Directo","Vendedor":"Diego Núñez"},
  {"Fecha":"2026-01-12","Cliente":"Cliente 032","Producto":"Plan de Fidelización","Categoria":"Servicios","Cantidad":2,"Precio_unitario":78558,"Importe":157116,"Region":"Oriente","Canal":"Online","Vendedor":"Sofía Vega"},
  {"Fecha":"2026-01-13","Cliente":"Cliente 012","Producto":"Consultoría de Procesos","Categoria":"Servicios","Cantidad":1,"Precio_unitario":322983,"Importe":322983,"Region":"Sur","Canal":"Directo","Vendedor":"Juan Mora"},
  {"Fecha":"2026-01-23","Cliente":"Cliente 008","Producto":"Migración de Datos","Categoria":"Servicios","Cantidad":2,"Precio_unitario":227644,"Importe":455288,"Region":"Occidente","Canal":"Online","Vendedor":"Sofía Vega"},
  {"Fecha":"2026-01-25","Cliente":"Cliente 013","Producto":"Plan de Fidelización","Categoria":"Servicios","Cantidad":3,"Precio_unitario":72339,"Importe":217017,"Region":"Norte","Canal":"Online","Vendedor":"Sofía Vega"},
  {"Fecha":"2026-01-29","Cliente":"Cliente 015","Producto":"Licencia CRM Pro","Categoria":"Software","Cantidad":2,"Precio_unitario":240266,"Importe":480532,"Region":"Centro","Canal":"Tienda","Vendedor":"Ana Torres"},
  {"Fecha":"2026-02-01","Cliente":"Cliente 015","Producto":"Licencia CRM Pro","Categoria":"Software","Cantidad":2,"Precio_unitario":252255,"Importe":504510,"Region":"Centro","Canal":"Tienda","Vendedor":"Ana Torres"},
  {"Fecha":"2026-02-03","Cliente":"Cliente 013","Producto":"Reportes Automatizados","Categoria":"Software","Cantidad":3,"Precio_unitario":85426,"Importe":256278,"Region":"Norte","Canal":"Online","Vendedor":"Sofía Vega"},
  {"Fecha":"2026-02-04","Cliente":"Cliente 012","Producto":"Integración ERP","Categoria":"Servicios","Cantidad":3,"Precio_unitario":573878,"Importe":1721634,"Region":"Sur","Canal":"Directo","Vendedor":"Juan Mora"},
  {"Fecha":"2026-02-04","Cliente":"Cliente 002","Producto":"Consultoría de Procesos","Categoria":"Servicios","Cantidad":2,"Precio_unitario":357622,"Importe":715244,"Region":"Occidente","Canal":"Tienda","Vendedor":"Sofía Vega"},
  {"Fecha":"2026-02-05","Cliente":"Cliente 013","Producto":"Plan de Fidelización","Categoria":"Servicios","Cantidad":1,"Precio_unitario":72185,"Importe":72185,"Region":"Norte","Canal":"Online","Vendedor":"Sofía Vega"},
  {"Fecha":"2026-02-10","Cliente":"Cliente 029","Producto":"Módulo de Analítica","Categoria":"Software","Cantidad":3,"Precio_unitario":156824,"Importe":470472,"Region":"Sur","Canal":"Tienda","Vendedor":"Juan Mora"},
  {"Fecha":"2026-02-10","Cliente":"Cliente 008","Producto":"Migración de Datos","Categoria":"Servicios","Cantidad":3,"Precio_unitario":215591,"Importe":646773,"Region":"Occidente","Canal":"Online","Vendedor":"Sofía Vega"},
  {"Fecha":"2026-02-13","Cliente":"Cliente 014","Producto":"Módulo de Analítica","Categoria":"Software","Cantidad":1,"Precio_unitario":175365,"Importe":175365,"Region":"Sur","Canal":"Distribuidor","Vendedor":"Carla Ríos"},
  {"Fecha":"2026-02-15","Cliente":"Cliente 026","Producto":"Capacitación Comercial","Categoria":"Servicios","Cantidad":1,"Precio_unitario":119236,"Importe":119236,"Region":"Occidente","Canal":"Online","Vendedor":"Ana Torres"},
  {"Fecha":"2026-02-15","Cliente":"Cliente 029","Producto":"Capacitación Comercial","Categoria":"Servicios","Cantidad":1,"Precio_unitario":103317,"Importe":103317,"Region":"Sur","Canal":"Tienda","Vendedor":"Juan Mora"},
  {"Fecha":"2026-02-16","Cliente":"Cliente 030","Producto":"App Móvil para Ventas","Categoria":"Software","Cantidad":2,"Precio_unitario":311363,"Importe":622726,"Region":"Sur","Canal":"Distribuidor","Vendedor":"Carla Ríos"},
  {"Fecha":"2026-02-17","Cliente":"Cliente 017","Producto":"Plan de Fidelización","Categoria":"Servicios","Cantidad":2,"Precio_unitario":75402,"Importe":150804,"Region":"Oriente","Canal":"Distribuidor","Vendedor":"Juan Mora"},
  {"Fecha":"2026-02-20","Cliente":"Cliente 030","Producto":"Integración ERP","Categoria":"Servicios","Cantidad":1,"Precio_unitario":570328,"Importe":570328,"Region":"Sur","Canal":"Distribuidor","Vendedor":"Carla Ríos"},
  {"Fecha":"2026-02-20","Cliente":"Cliente 023","Producto":"Migración de Datos","Categoria":"Servicios","Cantidad":2,"Precio_unitario":187912,"Importe":375824,"Region":"Oriente","Canal":"Tienda","Vendedor":"Carla Ríos"},
  {"Fecha":"2026-02-21","Cliente":"Cliente 012","Producto":"Consultoría de Procesos","Categoria":"Servicios","Cantidad":1,"Precio_unitario":341799,"Importe":341799,"Region":"Sur","Canal":"Directo","Vendedor":"Juan Mora"},
  {"Fecha":"2026-02-22","Cliente":"Cliente 008","Producto":"Plan de Fidelización","Categoria":"Servicios","Cantidad":2,"Precio_unitario":71402,"Importe":142804,"Region":"Occidente","Canal":"Online","Vendedor":"Sofía Vega"},
  {"Fecha":"2026-02-22","Cliente":"Cliente 020","Producto":"Soporte Premium (anual)","Categoria":"Servicios","Cantidad":3,"Precio_unitario":139045,"Importe":417135,"Region":"Occidente","Canal":"Distribuidor","Vendedor":"Luis Pérez"},
  {"Fecha":"2026-02-22","Cliente":"Cliente 012","Producto":"Integración ERP","Categoria":"Servicios","Cantidad":2,"Precio_unitario":566789,"Importe":1133578,"Region":"Sur","Canal":"Directo","Vendedor":"Juan Mora"},
  {"Fecha":"2026-02-24","Cliente":"Cliente 008","Producto":"Plan de Fidelización","Categoria":"Servicios","Cantidad":2,"Precio_unitario":73192,"Importe":146384,"Region":"Occidente","Canal":"Online","Vendedor":"Sofía Vega"},
  {"Fecha":"2026-02-27","Cliente":"Cliente 028","Producto":"Licencia CRM Pro","Categoria":"Software","Cantidad":2,"Precio_unitario":242852,"Importe":485704,"Region":"Centro","Canal":"Directo","Vendedor":"Diego Núñez"},
  {"Fecha":"2026-02-27","Cliente":"Cliente 023","Producto":"Migración de Datos","Categoria":"Servicios","Cantidad":2,"Precio_unitario":201353,"Importe":402706,"Region":"Oriente","Canal":"Tienda","Vendedor":"Carla Ríos"},
  {"Fecha":"2026-02-27","Cliente":"Cliente 013","Producto":"Reportes Automatizados","Categoria":"Software","Cantidad":1,"Precio_unitario":89240,"Importe":89240,"Region":"Norte","Canal":"Online","Vendedor":"Sofía Vega"},
  {"Fecha":"2026-02-28","Cliente":"Cliente 002","Producto":"Migración de Datos","Categoria":"Servicios","Cantidad":2,"Precio_unitario":211607,"Importe":423214,"Region":"Occidente","Canal":"Tienda","Vendedor":"Sofía Vega"},
  {"Fecha":"2026-03-01","Cliente":"Cliente 026","Producto":"Licencia CRM Pro","Categoria":"Software","Cantidad":2,"Precio_unitario":258078,"Importe":516156,"Region":"Occidente","Canal":"Online","Vendedor":"Ana Torres"},
  {"Fecha":"2026-03-01","Cliente":"Cliente 018","Producto":"Plan de Fidelización","Categoria":"Servicios","Cantidad":1,"Precio_unitario":71424,"Importe":71424,"Region":"Norte","Canal":"Directo","Vendedor":"Diego Núñez"},
  {"Fecha":"2026-03-01","Cliente":"Cliente 004","Producto":"Migración de Datos","Categoria":"Servicios","Cantidad":1,"Precio_unitario":224611,"Importe":224611,"Region":"Centro","Canal":"Online","Vendedor":"Sofía Vega"},
  {"Fecha":"2026-03-04","Cliente":"Cliente 002","Producto":"Módulo de Analítica","Categoria":"Software","Cantidad":1,"Precio_unitario":183350,"Importe":183350,"Region":"Occidente","Canal":"Tienda","Vendedor":"Sofía Vega"},
  {"Fecha":"2026-03-05","Cliente":"Cliente 027","Producto":"Licencia CRM Pro","Categoria":"Software","Cantidad":1,"Precio_unitario":232146,"Importe":232146,"Region":"Occidente","Canal":"Online","Vendedor":"Sofía Vega"},
  {"Fecha":"2026-03-05","Cliente":"Cliente 003","Producto":"Consultoría de Procesos","Categoria":"Servicios","Cantidad":1,"Precio_unitario":332690,"Importe":332690,"Region":"Sur","Canal":"Directo","Vendedor":"Sofía Vega"},
  {"Fecha":"2026-03-05","Cliente":"Cliente 004","Producto":"Integración ERP","Categoria":"Servicios","Cantidad":1,"Precio_unitario":606979,"Importe":606979,"Region":"Centro","Canal":"Online","Vendedor":"Sofía Vega"},
  {"Fecha":"2026-03-09","Cliente":"Cliente 015","Producto":"App Móvil para Ventas","Categoria":"Software","Cantidad":2,"Precio_unitario":289882,"Importe":579764,"Region":"Centro","Canal":"Tienda","Vendedor":"Ana Torres"},
  {"Fecha":"2026-03-11","Cliente":"Cliente 014","Producto":"Módulo de Analítica","Categoria":"Software","Cantidad":2,"Precio_unitario":187747,"Importe":375494,"Region":"Sur","Canal":"Distribuidor","Vendedor":"Carla Ríos"},
  {"Fecha":"2026-03-13","Cliente":"Cliente 012","Producto":"Integración ERP","Categoria":"Servicios","Cantidad":2,"Precio_unitario":538227,"Importe":1076454,"Region":"Sur","Canal":"Directo","Vendedor":"Juan Mora"},
  {"Fecha":"2026-03-14","Cliente":"Cliente 021","Producto":"Licencia CRM Pro","Categoria":"Software","Cantidad":1,"Precio_unitario":234110,"Importe":234110,"Region":"Sur","Canal":"Directo","Vendedor":"Diego Núñez"},
  {"Fecha":"2026-03-15","Cliente":"Cliente 011","Producto":"Integración ERP","Categoria":"Servicios","Cantidad":1,"Precio_unitario":592362,"Importe":592362,"Region":"Norte","Canal":"Distribuidor","Vendedor":"Sofía Vega"},
  {"Fecha":"2026-03-17","Cliente":"Cliente 007","Producto":"Módulo de Analítica","Categoria":"Software","Cantidad":1,"Precio_unitario":173085,"Importe":173085,"Region":"Oriente","Canal":"Directo","Vendedor":"Carla Ríos"},
  {"Fecha":"2026-03-21","Cliente":"Cliente 009","Producto":"App Móvil para Ventas","Categoria":"Software","Cantidad":2,"Precio_unitario":310560,"Importe":621120,"Region":"Sur","Canal":"Online","Vendedor":"Carla Ríos"},
  {"Fecha":"2026-03-23","Cliente":"Cliente 027","Producto":"Licencia CRM Pro","Categoria":"Software","Cantidad":2,"Precio_unitario":236089,"Importe":472178,"Region":"Occidente","Canal":"Online","Vendedor":"Sofía Vega"},
  {"Fecha":"2026-03-23","Cliente":"Cliente 023","Producto":"Consultoría de Procesos","Categoria":"Servicios","Cantidad":2,"Precio_unitario":312138,"Importe":624276,"Region":"Oriente","Canal":"Tienda","Vendedor":"Carla Ríos"},
  {"Fecha":"2026-03-24","Cliente":"Cliente 018","Producto":"Plan de Fidelización","Categoria":"Servicios","Cantidad":2,"Precio_unitario":74079,"Importe":148158,"Region":"Norte","Canal":"Directo","Vendedor":"Diego Núñez"},
  {"Fecha":"2026-03-25","Cliente":"Cliente 018","Producto":"Capacitación Comercial","Categoria":"Servicios","Cantidad":2,"Precio_unitario":118736,"Importe":237472,"Region":"Norte","Canal":"Directo","Vendedor":"Diego Núñez"},
  {"Fecha":"2026-03-28","Cliente":"Cliente 022","Producto":"Plan de Fidelización","Categoria":"Servicios","Cantidad":2,"Precio_unitario":75236,"Importe":150472,"Region":"Occidente","Canal":"Tienda","Vendedor":"Diego Núñez"},
  {"Fecha":"2026-03-30","Cliente":"Cliente 027","Producto":"Migración de Datos","Categoria":"Servicios","Cantidad":1,"Precio_unitario":202485,"Importe":202485,"Region":"Occidente","Canal":"Online","Vendedor":"Sofía Vega"},
  {"Fecha":"2026-03-30","Cliente":"Cliente 025","Producto":"Soporte Premium (anual)","Categoria":"Servicios","Cantidad":1,"Precio_unitario":151795,"Importe":151795,"Region":"Occidente","Canal":"Online","Vendedor":"Diego Núñez"},
  {"Fecha":"2026-03-31","Cliente":"Cliente 022","Producto":"Consultoría de Procesos","Categoria":"Servicios","Cantidad":1,"Precio_unitario":358737,"Importe":358737,"Region":"Occidente","Canal":"Tienda","Vendedor":"Diego Núñez"},
  {"Fecha":"2026-04-08","Cliente":"Cliente 025","Producto":"Capacitación Comercial","Categoria":"Servicios","Cantidad":1,"Precio_unitario":121961,"Importe":121961,"Region":"Occidente","Canal":"Online","Vendedor":"Diego Núñez"},
  {"Fecha":"2026-04-10","Cliente":"Cliente 030","Producto":"App Móvil para Ventas","Categoria":"Software","Cantidad":1,"Precio_unitario":308247,"Importe":308247,"Region":"Sur","Canal":"Distribuidor","Vendedor":"Carla Ríos"},
  {"Fecha":"2026-04-11","Cliente":"Cliente 022","Producto":"Licencia CRM Pro","Categoria":"Software","Cantidad":2,"Precio_unitario":255963,"Importe":511926,"Region":"Occidente","Canal":"Tienda","Vendedor":"Diego Núñez"},
  {"Fecha":"2026-04-13","Cliente":"Cliente 025","Producto":"Migración de Datos","Categoria":"Servicios","Cantidad":1,"Precio_unitario":226396,"Importe":226396,"Region":"Occidente","Canal":"Online","Vendedor":"Diego Núñez"},
  {"Fecha":"2026-04-16","Cliente":"Cliente 027","Producto":"Consultoría de Procesos","Categoria":"Servicios","Cantidad":3,"Precio_unitario":319568,"Importe":958704,"Region":"Occidente","Canal":"Online","Vendedor":"Sofía Vega"},
  {"Fecha":"2026-04-18","Cliente":"Cliente 010","Producto":"Reportes Automatizados","Categoria":"Software","Cantidad":1,"Precio_unitario":92353,"Importe":92353,"Region":"Oriente","Canal":"Distribuidor","Vendedor":"Sofía Vega"},
  {"Fecha":"2026-04-19","Cliente":"Cliente 008","Producto":"Soporte Premium (anual)","Categoria":"Servicios","Cantidad":1,"Precio_unitario":147829,"Importe":147829,"Region":"Occidente","Canal":"Online","Vendedor":"Sofía Vega"},
  {"Fecha":"2026-04-19","Cliente":"Cliente 015","Producto":"Plan de Fidelización","Categoria":"Servicios","Cantidad":2,"Precio_unitario":74658,"Importe":149316,"Region":"Centro","Canal":"Tienda","Vendedor":"Ana Torres"},
  {"Fecha":"2026-04-20","Cliente":"Cliente 020","Producto":"Consultoría de Procesos","Categoria":"Servicios","Cantidad":1,"Precio_unitario":329334,"Importe":329334,"Region":"Occidente","Canal":"Distribuidor","Vendedor":"Luis Pérez"},
  {"Fecha":"2026-04-23","Cliente":"Cliente 017","Producto":"Plan de Fidelización","Categoria":"Servicios","Cantidad":1,"Precio_unitario":78626,"Importe":78626,"Region":"Oriente","Canal":"Distribuidor","Vendedor":"Juan Mora"},
  {"Fecha":"2026-04-30","Cliente":"Cliente 029","Producto":"Integración ERP","Categoria":"Servicios","Cantidad":1,"Precio_unitario":506779,"Importe":506779,"Region":"Sur","Canal":"Tienda","Vendedor":"Juan Mora"},
  {"Fecha":"2026-04-30","Cliente":"Cliente 015","Producto":"Reportes Automatizados","Categoria":"Software","Cantidad":2,"Precio_unitario":88754,"Importe":177508,"Region":"Centro","Canal":"Tienda","Vendedor":"Ana Torres"},
  {"Fecha":"2026-05-04","Cliente":"Cliente 009","Producto":"Módulo de Analítica","Categoria":"Software","Cantidad":1,"Precio_unitario":179979,"Importe":179979,"Region":"Sur","Canal":"Online","Vendedor":"Carla Ríos"},
  {"Fecha":"2026-05-05","Cliente":"Cliente 020","Producto":"Reportes Automatizados","Categoria":"Software","Cantidad":3,"Precio_unitario":89310,"Importe":267930,"Region":"Occidente","Canal":"Distribuidor","Vendedor":"Luis Pérez"},
  {"Fecha":"2026-05-08","Cliente":"Cliente 030","Producto":"App Móvil para Ventas","Categoria":"Software","Cantidad":1,"Precio_unitario":310669,"Importe":310669,"Region":"Sur","Canal":"Distribuidor","Vendedor":"Carla Ríos"},
  {"Fecha":"2026-05-09","Cliente":"Cliente 010","Producto":"Reportes Automatizados","Categoria":"Software","Cantidad":2,"Precio_unitario":93301,"Importe":186602,"Region":"Oriente","Canal":"Distribuidor","Vendedor":"Sofía Vega"},
  {"Fecha":"2026-05-10","Cliente":"Cliente 008","Producto":"Migración de Datos","Categoria":"Servicios","Cantidad":1,"Precio_unitario":211465,"Importe":211465,"Region":"Occidente","Canal":"Online","Vendedor":"Sofía Vega"},
  {"Fecha":"2026-05-11","Cliente":"Cliente 020","Producto":"Soporte Premium (anual)","Categoria":"Servicios","Cantidad":1,"Precio_unitario":151206,"Importe":151206,"Region":"Occidente","Canal":"Distribuidor","Vendedor":"Luis Pérez"},
  {"Fecha":"2026-05-14","Cliente":"Cliente 020","Producto":"Consultoría de Procesos","Categoria":"Servicios","Cantidad":2,"Precio_unitario":329441,"Importe":658882,"Region":"Occidente","Canal":"Distribuidor","Vendedor":"Luis Pérez"},
  {"Fecha":"2026-05-16","Cliente":"Cliente 007","Producto":"Migración de Datos","Categoria":"Servicios","Cantidad":1,"Precio_unitario":216351,"Importe":216351,"Region":"Oriente","Canal":"Directo","Vendedor":"Carla Ríos"},
  {"Fecha":"2026-05-28","Cliente":"Cliente 018","Producto":"Plan de Fidelización","Categoria":"Servicios","Cantidad":1,"Precio_unitario":75763,"Importe":75763,"Region":"Norte","Canal":"Directo","Vendedor":"Diego Núñez"},
  {"Fecha":"2026-05-31","Cliente":"Cliente 015","Producto":"Capacitación Comercial","Categoria":"Servicios","Cantidad":2,"Precio_unitario":121209,"Importe":242418,"Region":"Centro","Canal":"Tienda","Vendedor":"Ana Torres"},
  {"Fecha":"2026-06-03","Cliente":"Cliente 001","Producto":"Consultoría de Procesos","Categoria":"Servicios","Cantidad":1,"Precio_unitario":353486,"Importe":353486,"Region":"Sur","Canal":"Tienda","Vendedor":"Sofía Vega"},
  {"Fecha":"2026-06-03","Cliente":"Cliente 026","Producto":"Licencia CRM Pro","Categoria":"Software","Cantidad":2,"Precio_unitario":243936,"Importe":487872,"Region":"Occidente","Canal":"Online","Vendedor":"Ana Torres"},
  {"Fecha":"2026-06-03","Cliente":"Cliente 018","Producto":"Plan de Fidelización","Categoria":"Servicios","Cantidad":1,"Precio_unitario":74206,"Importe":74206,"Region":"Norte","Canal":"Directo","Vendedor":"Diego Núñez"},
  {"Fecha":"2026-06-08","Cliente":"Cliente 016","Producto":"Licencia CRM Pro","Categoria":"Software","Cantidad":2,"Precio_unitario":254827,"Importe":509654,"Region":"Centro","Canal":"Tienda","Vendedor":"Luis Pérez"},
  {"Fecha":"2026-06-11","Cliente":"Cliente 022","Producto":"Consultoría de Procesos","Categoria":"Servicios","Cantidad":2,"Precio_unitario":364248,"Importe":728496,"Region":"Occidente","Canal":"Tienda","Vendedor":"Diego Núñez"},
  {"Fecha":"2026-06-12","Cliente":"Cliente 023","Producto":"Migración de Datos","Categoria":"Servicios","Cantidad":2,"Precio_unitario":201026,"Importe":402052,"Region":"Oriente","Canal":"Tienda","Vendedor":"Carla Ríos"},
  {"Fecha":"2026-06-13","Cliente":"Cliente 029","Producto":"Capacitación Comercial","Categoria":"Servicios","Cantidad":3,"Precio_unitario":109089,"Importe":327267,"Region":"Sur","Canal":"Tienda","Vendedor":"Juan Mora"},
  {"Fecha":"2026-06-14","Cliente":"Cliente 026","Producto":"Plan de Fidelización","Categoria":"Servicios","Cantidad":1,"Precio_unitario":74209,"Importe":74209,"Region":"Occidente","Canal":"Online","Vendedor":"Ana Torres"},
  {"Fecha":"2026-06-14","Cliente":"Cliente 020","Producto":"Consultoría de Procesos","Categoria":"Servicios","Cantidad":2,"Precio_unitario":335732,"Importe":671464,"Region":"Occidente","Canal":"Distribuidor","Vendedor":"Luis Pérez"},
  {"Fecha":"2026-06-18","Cliente":"Cliente 002","Producto":"Migración de Datos","Categoria":"Servicios","Cantidad":1,"Precio_unitario":218731,"Importe":218731,"Region":"Occidente","Canal":"Tienda","Vendedor":"Sofía Vega"},
  {"Fecha":"2026-06-21","Cliente":"Cliente 029","Producto":"Capacitación Comercial","Categoria":"Servicios","Cantidad":2,"Precio_unitario":105956,"Importe":211912,"Region":"Sur","Canal":"Tienda","Vendedor":"Juan Mora"},
  {"Fecha":"2026-06-27","Cliente":"Cliente 025","Producto":"Soporte Premium (anual)","Categoria":"Servicios","Cantidad":1,"Precio_unitario":150783,"Importe":150783,"Region":"Occidente","Canal":"Online","Vendedor":"Diego Núñez"},
  {"Fecha":"2026-07-02","Cliente":"Cliente 013","Producto":"Plan de Fidelización","Categoria":"Servicios","Cantidad":1,"Precio_unitario":67905,"Importe":67905,"Region":"Norte","Canal":"Online","Vendedor":"Sofía Vega"},
  {"Fecha":"2026-07-09","Cliente":"Cliente 029","Producto":"Capacitación Comercial","Categoria":"Servicios","Cantidad":3,"Precio_unitario":104164,"Importe":312492,"Region":"Sur","Canal":"Tienda","Vendedor":"Juan Mora"},
  {"Fecha":"2026-07-14","Cliente":"Cliente 012","Producto":"Integración ERP","Categoria":"Servicios","Cantidad":3,"Precio_unitario":576752,"Importe":1730256,"Region":"Sur","Canal":"Directo","Vendedor":"Juan Mora"},
  {"Fecha":"2026-07-16","Cliente":"Cliente 030","Producto":"Integración ERP","Categoria":"Servicios","Cantidad":1,"Precio_unitario":628929,"Importe":628929,"Region":"Sur","Canal":"Distribuidor","Vendedor":"Carla Ríos"},
  {"Fecha":"2026-07-17","Cliente":"Cliente 026","Producto":"Plan de Fidelización","Categoria":"Servicios","Cantidad":2,"Precio_unitario":74009,"Importe":148018,"Region":"Occidente","Canal":"Online","Vendedor":"Ana Torres"},
  {"Fecha":"2026-07-19","Cliente":"Cliente 027","Producto":"Migración de Datos","Categoria":"Servicios","Cantidad":2,"Precio_unitario":198844,"Importe":397688,"Region":"Occidente","Canal":"Online","Vendedor":"Sofía Vega"},
  {"Fecha":"2026-07-19","Cliente":"Cliente 006","Producto":"Soporte Premium (anual)","Categoria":"Servicios","Cantidad":2,"Precio_unitario":154311,"Importe":308622,"Region":"Oriente","Canal":"Directo","Vendedor":"Ana Torres"},
  {"Fecha":"2026-07-25","Cliente":"Cliente 001","Producto":"Módulo de Analítica","Categoria":"Software","Cantidad":2,"Precio_unitario":182842,"Importe":365684,"Region":"Sur","Canal":"Tienda","Vendedor":"Sofía Vega"},
  {"Fecha":"2026-07-25","Cliente":"Cliente 010","Producto":"Integración ERP","Categoria":"Servicios","Cantidad":2,"Precio_unitario":609246,"Importe":1218492,"Region":"Oriente","Canal":"Distribuidor","Vendedor":"Sofía Vega"},
  {"Fecha":"2026-07-27","Cliente":"Cliente 023","Producto":"Migración de Datos","Categoria":"Servicios","Cantidad":3,"Precio_unitario":195175,"Importe":585525,"Region":"Oriente","Canal":"Tienda","Vendedor":"Carla Ríos"},
  {"Fecha":"2026-07-28","Cliente":"Cliente 004","Producto":"Integración ERP","Categoria":"Servicios","Cantidad":2,"Precio_unitario":608185,"Importe":1216370,"Region":"Centro","Canal":"Online","Vendedor":"Sofía Vega"},
  {"Fecha":"2026-07-30","Cliente":"Cliente 030","Producto":"Integración ERP","Categoria":"Servicios","Cantidad":1,"Precio_unitario":618658,"Importe":618658,"Region":"Sur","Canal":"Distribuidor","Vendedor":"Carla Ríos"},
  {"Fecha":"2026-08-11","Cliente":"Cliente 028","Producto":"Licencia CRM Pro","Categoria":"Software","Cantidad":1,"Precio_unitario":246434,"Importe":246434,"Region":"Centro","Canal":"Directo","Vendedor":"Diego Núñez"},
  {"Fecha":"2026-08-14","Cliente":"Cliente 007","Producto":"Módulo de Analítica","Categoria":"Software","Cantidad":2,"Precio_unitario":177701,"Importe":355402,"Region":"Oriente","Canal":"Directo","Vendedor":"Carla Ríos"},
  {"Fecha":"2026-08-17","Cliente":"Cliente 029","Producto":"Soporte Premium (anual)","Categoria":"Servicios","Cantidad":1,"Precio_unitario":133621,"Importe":133621,"Region":"Sur","Canal":"Tienda","Vendedor":"Juan Mora"},
  {"Fecha":"2026-08-17","Cliente":"Cliente 002","Producto":"Módulo de Analítica","Categoria":"Software","Cantidad":1,"Precio_unitario":186826,"Importe":186826,"Region":"Occidente","Canal":"Tienda","Vendedor":"Sofía Vega"},
  {"Fecha":"2026-08-18","Cliente":"Cliente 030","Producto":"App Móvil para Ventas","Categoria":"Software","Cantidad":1,"Precio_unitario":297529,"Importe":297529,"Region":"Sur","Canal":"Distribuidor","Vendedor":"Carla Ríos"},
  {"Fecha":"2026-08-18","Cliente":"Cliente 029","Producto":"Módulo de Analítica","Categoria":"Software","Cantidad":2,"Precio_unitario":154941,"Importe":309882,"Region":"Sur","Canal":"Tienda","Vendedor":"Juan Mora"},
  {"Fecha":"2026-08-22","Cliente":"Cliente 022","Producto":"Consultoría de Procesos","Categoria":"Servicios","Cantidad":1,"Precio_unitario":336903,"Importe":336903,"Region":"Occidente","Canal":"Tienda","Vendedor":"Diego Núñez"},
  {"Fecha":"2026-08-24","Cliente":"Cliente 010","Producto":"Plan de Fidelización","Categoria":"Servicios","Cantidad":1,"Precio_unitario":71557,"Importe":71557,"Region":"Oriente","Canal":"Distribuidor","Vendedor":"Sofía Vega"},
  {"Fecha":"2026-08-24","Cliente":"Cliente 017","Producto":"Reportes Automatizados","Categoria":"Software","Cantidad":1,"Precio_unitario":86347,"Importe":86347,"Region":"Oriente","Canal":"Distribuidor","Vendedor":"Juan Mora"},
  {"Fecha":"2026-08-26","Cliente":"Cliente 010","Producto":"Reportes Automatizados","Categoria":"Software","Cantidad":2,"Precio_unitario":88618,"Importe":177236,"Region":"Oriente","Canal":"Distribuidor","Vendedor":"Sofía Vega"},
  {"Fecha":"2026-09-01","Cliente":"Cliente 020","Producto":"Reportes Automatizados","Categoria":"Software","Cantidad":3,"Precio_unitario":85349,"Importe":256047,"Region":"Occidente","Canal":"Distribuidor","Vendedor":"Luis Pérez"},
  {"Fecha":"2026-09-03","Cliente":"Cliente 001","Producto":"Soporte Premium (anual)","Categoria":"Servicios","Cantidad":1,"Precio_unitario":155975,"Importe":155975,"Region":"Sur","Canal":"Tienda","Vendedor":"Sofía Vega"},
  {"Fecha":"2026-09-05","Cliente":"Cliente 017","Producto":"Plan de Fidelización","Categoria":"Servicios","Cantidad":1,"Precio_unitario":78462,"Importe":78462,"Region":"Oriente","Canal":"Distribuidor","Vendedor":"Juan Mora"},
  {"Fecha":"2026-09-05","Cliente":"Cliente 029","Producto":"Módulo de Analítica","Categoria":"Software","Cantidad":2,"Precio_unitario":160854,"Importe":321708,"Region":"Sur","Canal":"Tienda","Vendedor":"Juan Mora"},
  {"Fecha":"2026-09-05","Cliente":"Cliente 020","Producto":"Soporte Premium (anual)","Categoria":"Servicios","Cantidad":3,"Precio_unitario":139314,"Importe":417942,"Region":"Occidente","Canal":"Distribuidor","Vendedor":"Luis Pérez"},
  {"Fecha":"2026-09-05","Cliente":"Cliente 016","Producto":"Módulo de Analítica","Categoria":"Software","Cantidad":1,"Precio_unitario":188876,"Importe":188876,"Region":"Centro","Canal":"Tienda","Vendedor":"Luis Pérez"},
  {"Fecha":"2026-09-10","Cliente":"Cliente 013","Producto":"Plan de Fidelización","Categoria":"Servicios","Cantidad":2,"Precio_unitario":69690,"Importe":139380,"Region":"Norte","Canal":"Online","Vendedor":"Sofía Vega"},
  {"Fecha":"2026-09-10","Cliente":"Cliente 009","Producto":"App Móvil para Ventas","Categoria":"Software","Cantidad":1,"Precio_unitario":295166,"Importe":295166,"Region":"Sur","Canal":"Online","Vendedor":"Carla Ríos"},
  {"Fecha":"2026-09-10","Cliente":"Cliente 011","Producto":"App Móvil para Ventas","Categoria":"Software","Cantidad":1,"Precio_unitario":292036,"Importe":292036,"Region":"Norte","Canal":"Distribuidor","Vendedor":"Sofía Vega"},
  {"Fecha":"2026-09-10","Cliente":"Cliente 010","Producto":"Reportes Automatizados","Categoria":"Software","Cantidad":2,"Precio_unitario":94301,"Importe":188602,"Region":"Oriente","Canal":"Distribuidor","Vendedor":"Sofía Vega"},
  {"Fecha":"2026-09-10","Cliente":"Cliente 018","Producto":"Plan de Fidelización","Categoria":"Servicios","Cantidad":2,"Precio_unitario":73077,"Importe":146154,"Region":"Norte","Canal":"Directo","Vendedor":"Diego Núñez"},
  {"Fecha":"2026-09-10","Cliente":"Cliente 020","Producto":"Soporte Premium (anual)","Categoria":"Servicios","Cantidad":2,"Precio_unitario":140600,"Importe":281200,"Region":"Occidente","Canal":"Distribuidor","Vendedor":"Luis Pérez"}
];

// App Global State
const state = {
  currentSection: 'resumen',
  allSales: INITIAL_SALES_DATA.map(d => ({
    ...d,
    dateObj: new Date(d.Fecha + 'T00:00:00'),
    Importe: Number(d.Importe),
    Cantidad: Number(d.Cantidad),
    Precio_unitario: Number(d.Precio_unitario)
  })),
  filteredSales: [],
  filters: {
    startDate: '2025-10-01',
    endDate: '2026-09-11',
    products: [],
    clients: [],
    regions: [],
    channels: [],
    salespeople: []
  },
  charts: {},
  quiz: {
    answers: {},
    resetCount: 0,
    timerRunning: false,
    startTime: 0,
    accumulatedSeconds: 0,
    timerInterval: null
  },
  ai: {
    apiKey: localStorage.getItem('sbd_api_key') || '',
    provider: localStorage.getItem('sbd_provider') || 'gemini', // 'gemini' | 'groq'
    messages: [
      {
        role: 'assistant',
        content: '¡Hola! 👋 Soy tu **asistente de apoyo comercial**. Puedo responder tus dudas sobre los datos del dashboard (ventas, clientes, riesgos, oportunidades, productos) o conceptos de gestión comercial.\n\nPuedes probar con preguntas como:\n- "¿cuál es el total de ventas?"\n- "¿qué clientes están en riesgo?"\n- "¿cuál es el mejor producto?"\n- "¿qué oportunidades hay?"'
      }
    ]
  },
  evaluations: JSON.parse(localStorage.getItem('sbd_evaluations') || '[]')
};

// If no evaluations, load initial academic sample
if (state.evaluations.length === 0) {
  state.evaluations = [
    {
      fecha: '2026-09-11',
      utilidad: 10,
      facilidad: 10,
      calidad: 10,
      confianza: 10,
      aprendizaje: 10,
      comentario: 'me gusto la aplicación, esta muy buena y accesible'
    }
  ];
}

// --- Format Utilities ---
function fmtMoney(amount) {
  if (amount === undefined || amount === null || isNaN(amount)) return '$0';
  return '$' + Math.round(amount).toLocaleString('en-US');
}

function fmtNum(n) {
  if (n === undefined || n === null || isNaN(n)) return '0';
  return Number(n).toLocaleString('en-US');
}

function fmtPercent(p) {
  if (p === undefined || p === null || isNaN(p)) return '0%';
  const sign = p > 0 ? '+' : '';
  return `${sign}${Math.round(p * 100)}%`;
}

// --- Analytical Calculations (Matching analisis.py) ---
function getClientMetrics(sales) {
  const ultim = new Date(REF_DATE.getTime() - 90 * 24 * 60 * 60 * 1000);
  const anterior = new Date(REF_DATE.getTime() - 180 * 24 * 60 * 60 * 1000);

  const clientGroups = {};
  sales.forEach(sale => {
    const c = sale.Cliente;
    if (!clientGroups[c]) {
      clientGroups[c] = {
        Cliente: c,
        sales: [],
        n_ordenes: 0,
        gasto_acumulado: 0,
        minDate: sale.dateObj,
        maxDate: sale.dateObj
      };
    }
    const g = clientGroups[c];
    g.sales.push(sale);
    g.n_ordenes += 1;
    g.gasto_acumulado += sale.Importe;
    if (sale.dateObj < g.minDate) g.minDate = sale.dateObj;
    if (sale.dateObj > g.maxDate) g.maxDate = sale.dateObj;
  });

  const clientList = Object.values(clientGroups).map(g => {
    const n_act = g.sales.filter(s => s.dateObj >= ultim).length;
    const n_ant = g.sales.filter(s => s.dateObj >= anterior && s.dateObj < ultim).length;
    
    const frec_actual = n_act / 3.0;
    const frec_anterior = n_ant / 3.0;
    const ticket_promedio = g.gasto_acumulado / (g.n_ordenes || 1);
    const recencia_dias = Math.max(0, Math.floor((REF_DATE - g.maxDate) / (1000 * 60 * 60 * 24)));
    const dias_desde_primer_compra = Math.max(0, Math.floor((REF_DATE - g.minDate) / (1000 * 60 * 60 * 24)));
    
    let caida_frecuencia = 0;
    if (frec_anterior > 0) {
      caida_frecuencia = Math.max(0, (frec_anterior - frec_actual) / frec_anterior);
    }

    return {
      Cliente: g.Cliente,
      n_ordenes: g.n_ordenes,
      gasto_acumulado: g.gasto_acumulado,
      ticket_promedio,
      frec_actual,
      frec_anterior,
      recencia_dias,
      dias_desde_primer_compra,
      caida_frecuencia
    };
  });

  // Calculate 75th percentile of gasto_acumulado
  if (clientList.length > 0) {
    const sortedGasto = [...clientList.map(c => c.gasto_acumulado)].sort((a, b) => a - b);
    const pos = 0.75 * (sortedGasto.length - 1);
    const base = Math.floor(pos);
    const rest = pos - base;
    const top25 = sortedGasto[base] + (sortedGasto[base + 1] !== undefined ? rest * (sortedGasto[base + 1] - sortedGasto[base]) : 0);

    // Segmentation
    clientList.forEach(r => {
      let seg = 'Promedio';
      if (r.recencia_dias > 120) {
        seg = 'Inactivo';
      } else if (r.recencia_dias > 60 || r.caida_frecuencia >= 0.4) {
        seg = 'En riesgo';
      } else if (r.dias_desde_primer_compra <= 90 && r.n_ordenes <= 3) {
        seg = 'Nuevo';
      } else if (r.gasto_acumulado >= top25 && r.recencia_dias <= 60) {
        seg = 'Alto valor';
      } else if (r.frec_actual >= 1 && r.recencia_dias <= 45 && r.caida_frecuencia <= 0.2) {
        seg = 'Leal';
      }
      r.segmento = seg;

      // Risk score
      let p = 0;
      if (r.recencia_dias > 60) p += 2;
      else if (r.recencia_dias > 40) p += 1;

      if (r.caida_frecuencia >= 0.4) p += 2;
      else if (r.caida_frecuencia >= 0.2) p += 1;

      r.puntaje_riesgo = p;
      r.nivel_riesgo = p >= 3 ? '🔴 Alto' : (p >= 1 ? '🟠 Medio' : '🟢 Bajo');

      // Explanation
      const partes = [];
      if (r.recencia_dias > 60) {
        partes.push(`lleva ${Math.round(r.recencia_dias)} días sin comprar (umbral: 60)`);
      }
      if (r.caida_frecuencia >= 0.2) {
        partes.push(`frecuencia cayó de ${r.frec_anterior.toFixed(1)} a ${r.frec_actual.toFixed(1)} compras/mes (−${Math.round(r.caida_frecuencia * 100)}%)`);
      }
      r.explicacion = partes.length > 0 
        ? `Este cliente ${partes.join(' y ')}.` 
        : 'Sin señales de riesgo relevantes en este conjunto.';

      // Action
      if (r.nivel_riesgo === '🔴 Alto') {
        r.accion_sugerida = 'Revisar historial y considerar contacto comercial prioritario.';
      } else if (r.nivel_riesgo === '🟠 Medio') {
        r.accion_sugerida = 'Monitorear evolución y programar seguimiento si persiste la tendencia.';
      } else {
        r.accion_sugerida = 'No requiere acción inmediata.';
      }
    });
  }

  // Sort by gasto_acumulado desc, recencia asc
  return clientList.sort((a, b) => b.gasto_acumulado - a.gasto_acumulado || a.recencia_dias - b.recencia_dias);
}

// Product Performance Analysis
function getProductPerformance(sales) {
  const ultim = new Date(REF_DATE.getTime() - 90 * 24 * 60 * 60 * 1000);
  const anterior = new Date(REF_DATE.getTime() - 180 * 24 * 60 * 60 * 1000);

  const prodMap = {};
  sales.forEach(s => {
    const p = s.Producto;
    if (!prodMap[p]) {
      prodMap[p] = {
        Producto: p,
        Categoria: s.Categoria,
        ventas: 0,
        unidades: 0,
        ordenes: 0,
        actual90: 0,
        anterior90: 0
      };
    }
    const pm = prodMap[p];
    pm.ventas += s.Importe;
    pm.unidades += s.Cantidad;
    pm.ordenes += 1;

    if (s.dateObj >= ultim) {
      pm.actual90 += s.Importe;
    } else if (s.dateObj >= anterior && s.dateObj < ultim) {
      pm.anterior90 += s.Importe;
    }
  });

  const list = Object.values(prodMap).map(pm => {
    let cambio = 0;
    if (pm.anterior90 > 0) {
      cambio = (pm.actual90 - pm.anterior90) / pm.anterior90;
    } else if (pm.actual90 > 0) {
      cambio = 1.0;
    }
    return {
      ...pm,
      cambio
    };
  });

  return list.sort((a, b) => b.ventas - a.ventas);
}

// Filter evaluation
function applyFilters() {
  const f = state.filters;
  const start = new Date(f.startDate + 'T00:00:00');
  const end = new Date(f.endDate + 'T23:59:59');

  state.filteredSales = state.allSales.filter(item => {
    if (item.dateObj < start || item.dateObj > end) return false;
    if (f.products.length > 0 && !f.products.includes(item.Producto)) return false;
    if (f.clients.length > 0 && !f.clients.includes(item.Cliente)) return false;
    if (f.regions.length > 0 && !f.regions.includes(item.Region)) return false;
    if (f.channels.length > 0 && !f.channels.includes(item.Canal)) return false;
    if (f.salespeople.length > 0 && !f.salespeople.includes(item.Vendedor)) return false;
    return true;
  });

  updateSidebarStats();
  renderCurrentSection();
}

function updateSidebarStats() {
  const countEl = document.getElementById('stat-sales-count');
  const clientEl = document.getElementById('stat-clients-count');
  if (countEl) countEl.innerText = fmtNum(state.filteredSales.length);
  if (clientEl) {
    const clients = new Set(state.filteredSales.map(s => s.Cliente));
    clientEl.innerText = fmtNum(clients.size);
  }
}

// --- Chart Rendering Helpers ---
function destroyChart(id) {
  if (state.charts[id]) {
    state.charts[id].destroy();
    delete state.charts[id];
  }
}

function getThemeColors() {
  const isDark = document.documentElement.getAttribute('data-theme') !== 'light';
  return {
    grid: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.06)',
    text: isDark ? '#9ca3af' : '#4b5563',
    primary: '#6366f1',
    palette: ['#6366f1', '#10b981', '#f59e0b', '#ec4899', '#8b5cf6', '#06b6d4', '#84cc16', '#3b82f6', '#f43f5e', '#14b8a6']
  };
}

// --- Section Renderers ---

// 1. Resumen General
function renderSectionResumen() {
  const df = state.filteredSales;
  const metrics = getClientMetrics(df);
  const total = df.reduce((acc, s) => acc + s.Importe, 0);
  const n_clientes = new Set(df.map(s => s.Cliente)).size;
  const n_ordenes = df.length;
  const ticket = n_ordenes > 0 ? total / n_ordenes : 0;

  const html = `
    <div class="metrics-grid">
      <div class="metric-card">
        <div class="metric-top">
          <span class="metric-label">Ventas totales</span>
          <div class="metric-icon-wrap" style="color: #6366f1;">💰</div>
        </div>
        <div class="metric-value">${fmtMoney(total)}</div>
        <div class="metric-caption">Ingresos en el período seleccionado</div>
      </div>
      <div class="metric-card">
        <div class="metric-top">
          <span class="metric-label">N° de clientes</span>
          <div class="metric-icon-wrap" style="color: #10b981;">👥</div>
        </div>
        <div class="metric-value">${fmtNum(n_clientes)}</div>
        <div class="metric-caption">Clientes únicos activos</div>
      </div>
      <div class="metric-card">
        <div class="metric-top">
          <span class="metric-label">Órdenes totales</span>
          <div class="metric-icon-wrap" style="color: #f59e0b;">📦</div>
        </div>
        <div class="metric-value">${fmtNum(n_ordenes)}</div>
        <div class="metric-caption">Transacciones comerciales</div>
      </div>
      <div class="metric-card">
        <div class="metric-top">
          <span class="metric-label">Ticket promedio</span>
          <div class="metric-icon-wrap" style="color: #8b5cf6;">🏷️</div>
        </div>
        <div class="metric-value">${fmtMoney(ticket)}</div>
        <div class="metric-caption">Monto promedio por transacción</div>
      </div>
    </div>

    <div class="charts-grid charts-grid-full">
      <div class="chart-card">
        <div class="chart-card-header">
          <h3>📈 Evolución Mensual de Ventas</h3>
          <span class="subtitle">Tendencia temporal por mes calendario</span>
        </div>
        <div class="chart-wrapper chart-wrapper-tall">
          <canvas id="chart-evolucion"></canvas>
        </div>
      </div>
    </div>

    <div class="charts-grid">
      <div class="chart-card">
        <div class="chart-card-header">
          <h3>🌐 Ventas por Canal</h3>
          <span class="subtitle">Distribución por canal comercial</span>
        </div>
        <div class="chart-wrapper">
          <canvas id="chart-canal"></canvas>
        </div>
      </div>
      <div class="chart-card">
        <div class="chart-card-header">
          <h3>📍 Ventas por Región</h3>
          <span class="subtitle">Distribución geográfica</span>
        </div>
        <div class="chart-wrapper">
          <canvas id="chart-region"></canvas>
        </div>
      </div>
    </div>
  `;

  document.getElementById('content-area').innerHTML = html;

  // Chart 1: Evolución
  setTimeout(() => {
    const monthlyMap = {};
    df.forEach(s => {
      const ym = s.Fecha.substring(0, 7);
      monthlyMap[ym] = (monthlyMap[ym] || 0) + s.Importe;
    });
    const months = Object.keys(monthlyMap).sort();
    const values = months.map(m => monthlyMap[m]);
    const tc = getThemeColors();

    destroyChart('chart-evolucion');
    const ctx = document.getElementById('chart-evolucion');
    if (ctx) {
      state.charts['chart-evolucion'] = new Chart(ctx, {
        type: 'line',
        data: {
          labels: months,
          datasets: [{
            label: 'Ventas ($)',
            data: values,
            borderColor: tc.primary,
            backgroundColor: 'rgba(99, 102, 241, 0.12)',
            fill: true,
            tension: 0.35,
            pointBackgroundColor: tc.primary,
            pointRadius: 4,
            pointHoverRadius: 6
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
            tooltip: {
              callbacks: {
                label: (ctx) => `Ventas: ${fmtMoney(ctx.raw)}`
              }
            }
          },
          scales: {
            x: { grid: { color: tc.grid }, ticks: { color: tc.text } },
            y: {
              grid: { color: tc.grid },
              ticks: {
                color: tc.text,
                callback: (val) => '$' + (val / 1000).toLocaleString() + 'k'
              }
            }
          }
        }
      });
    }

    // Chart 2: Canal
    const canalMap = {};
    df.forEach(s => { canalMap[s.Canal] = (canalMap[s.Canal] || 0) + s.Importe; });
    const canales = Object.keys(canalMap).sort((a, b) => canalMap[b] - canalMap[a]);
    destroyChart('chart-canal');
    const ctxCanal = document.getElementById('chart-canal');
    if (ctxCanal) {
      state.charts['chart-canal'] = new Chart(ctxCanal, {
        type: 'bar',
        data: {
          labels: canales,
          datasets: [{
            label: 'Ventas ($)',
            data: canales.map(c => canalMap[c]),
            backgroundColor: tc.palette.slice(0, canales.length),
            borderRadius: 6
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
            tooltip: { callbacks: { label: (ctx) => fmtMoney(ctx.raw) } }
          },
          scales: {
            x: { grid: { display: false }, ticks: { color: tc.text } },
            y: { grid: { color: tc.grid }, ticks: { color: tc.text, callback: val => '$' + (val/1000) + 'k' } }
          }
        }
      });
    }

    // Chart 3: Region
    const regMap = {};
    df.forEach(s => { regMap[s.Region] = (regMap[s.Region] || 0) + s.Importe; });
    const regiones = Object.keys(regMap).sort((a, b) => regMap[b] - regMap[a]);
    destroyChart('chart-region');
    const ctxReg = document.getElementById('chart-region');
    if (ctxReg) {
      state.charts['chart-region'] = new Chart(ctxReg, {
        type: 'bar',
        data: {
          labels: regiones,
          datasets: [{
            label: 'Ventas ($)',
            data: regiones.map(r => regMap[r]),
            backgroundColor: tc.palette.slice(2, 2 + regiones.length),
            borderRadius: 6
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
            tooltip: { callbacks: { label: (ctx) => fmtMoney(ctx.raw) } }
          },
          scales: {
            x: { grid: { display: false }, ticks: { color: tc.text } },
            y: { grid: { color: tc.grid }, ticks: { color: tc.text, callback: val => '$' + (val/1000) + 'k' } }
          }
        }
      });
    }
  }, 50);
}

// 2. Análisis de Clientes
function renderSectionClientes() {
  const metrics = getClientMetrics(state.filteredSales);

  const html = `
    <div class="table-card">
      <div class="table-toolbar">
        <div>
          <h3 style="font-size: 15px; font-weight: 700;">👥 Frecuencia de Compra, Última Compra y Gasto Acumulado</h3>
          <span style="font-size: 12px; color: var(--text-muted);">Métricas RFM y segmentación por comportamiento</span>
        </div>
        <div class="table-search-wrap">
          <span class="search-icon">🔍</span>
          <input type="text" id="client-search" class="table-search-input" placeholder="Buscar cliente..." oninput="filterClientTable()">
        </div>
      </div>
      <div class="table-responsive">
        <table class="data-table" id="clients-table">
          <thead>
            <tr>
              <th onclick="sortTable('clients-table', 0)">Cliente ↕</th>
              <th onclick="sortTable('clients-table', 1, true)">Gasto Acumulado ↕</th>
              <th onclick="sortTable('clients-table', 2, true)">Ticket Promedio ↕</th>
              <th onclick="sortTable('clients-table', 3, true)">Órdenes ↕</th>
              <th onclick="sortTable('clients-table', 4, true)">Días sin comprar ↕</th>
              <th onclick="sortTable('clients-table', 5, true)">Frec. anterior ↕</th>
              <th onclick="sortTable('clients-table', 6, true)">Frec. actual ↕</th>
              <th onclick="sortTable('clients-table', 7)">Segmento ↕</th>
            </tr>
          </thead>
          <tbody>
            ${metrics.map(r => `
              <tr>
                <td><strong>${r.Cliente}</strong></td>
                <td><strong>${fmtMoney(r.gasto_acumulado)}</strong></td>
                <td>${fmtMoney(r.ticket_promedio)}</td>
                <td>${r.n_ordenes}</td>
                <td>${Math.round(r.recencia_dias)} días</td>
                <td>${r.frec_anterior.toFixed(2)}/mes</td>
                <td>${r.frec_actual.toFixed(2)}/mes</td>
                <td><span class="badge-pill badge-segment">${r.segmento}</span></td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>

    <div class="charts-grid">
      <div class="chart-card">
        <div class="chart-card-header">
          <h3>🎯 Distribución por Segmento</h3>
          <span class="subtitle">Proporción de clientes según clasificación</span>
        </div>
        <div class="chart-wrapper">
          <canvas id="chart-seg-pie"></canvas>
        </div>
      </div>
      <div class="chart-card">
        <div class="chart-card-header">
          <h3>🏆 Top 10 Clientes por Gasto</h3>
          <span class="subtitle">Mayores aportantes de ingresos</span>
        </div>
        <div class="chart-wrapper">
          <canvas id="chart-top-clients"></canvas>
        </div>
      </div>
    </div>
  `;

  document.getElementById('content-area').innerHTML = html;

  setTimeout(() => {
    const tc = getThemeColors();

    // Segment counts
    const segCounts = {};
    metrics.forEach(m => { segCounts[m.segmento] = (segCounts[m.segmento] || 0) + 1; });
    const segLabels = Object.keys(segCounts);
    const segValues = segLabels.map(k => segCounts[k]);

    destroyChart('chart-seg-pie');
    const ctxPie = document.getElementById('chart-seg-pie');
    if (ctxPie) {
      state.charts['chart-seg-pie'] = new Chart(ctxPie, {
        type: 'doughnut',
        data: {
          labels: segLabels,
          datasets: [{
            data: segValues,
            backgroundColor: tc.palette.slice(0, segLabels.length),
            borderWidth: 2,
            borderColor: tc.grid
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { position: 'right', labels: { color: tc.text, boxWidth: 12 } }
          }
        }
      });
    }

    // Top 10 Clients
    const top10 = metrics.slice(0, 10);
    destroyChart('chart-top-clients');
    const ctxTop = document.getElementById('chart-top-clients');
    if (ctxTop) {
      state.charts['chart-top-clients'] = new Chart(ctxTop, {
        type: 'bar',
        data: {
          labels: top10.map(t => t.Cliente),
          datasets: [{
            label: 'Gasto ($)',
            data: top10.map(t => t.gasto_acumulado),
            backgroundColor: '#6366f1',
            borderRadius: 6
          }]
        },
        options: {
          indexAxis: 'y',
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
            tooltip: { callbacks: { label: ctx => fmtMoney(ctx.raw) } }
          },
          scales: {
            x: { grid: { color: tc.grid }, ticks: { color: tc.text, callback: val => '$' + (val/1000) + 'k' } },
            y: { grid: { display: false }, ticks: { color: tc.text } }
          }
        }
      });
    }
  }, 50);
}

// Table search filter helper
window.filterClientTable = function() {
  const q = document.getElementById('client-search').value.toLowerCase();
  const rows = document.querySelectorAll('#clients-table tbody tr');
  rows.forEach(r => {
    const text = r.innerText.toLowerCase();
    r.style.display = text.includes(q) ? '' : 'none';
  });
};

// 3. Clientes en Riesgo
function renderSectionRiesgo() {
  const metrics = getClientMetrics(state.filteredSales);
  const alto = metrics.filter(m => m.nivel_riesgo === '🔴 Alto').length;
  const medio = metrics.filter(m => m.nivel_riesgo === '🟠 Medio').length;
  const bajo = metrics.filter(m => m.nivel_riesgo === '🟢 Bajo').length;

  const enRiesgo = metrics.filter(m => m.nivel_riesgo !== '🟢 Bajo').sort((a, b) => b.puntaje_riesgo - a.puntaje_riesgo);

  const html = `
    <div class="metrics-grid">
      <div class="metric-card">
        <div class="metric-top">
          <span class="metric-label">Riesgo Alto</span>
          <div class="metric-icon-wrap" style="color: #ef4444;">🔴</div>
        </div>
        <div class="metric-value" style="color: #ef4444;">${alto}</div>
        <div class="metric-caption">Puntaje ≥ 3 pts (atención urgente)</div>
      </div>
      <div class="metric-card">
        <div class="metric-top">
          <span class="metric-label">Riesgo Medio</span>
          <div class="metric-icon-wrap" style="color: #f59e0b;">🟠</div>
        </div>
        <div class="metric-value" style="color: #f59e0b;">${medio}</div>
        <div class="metric-caption">Puntaje 1–2 pts (seguimiento)</div>
      </div>
      <div class="metric-card">
        <div class="metric-top">
          <span class="metric-label">Riesgo Bajo / Saludable</span>
          <div class="metric-icon-wrap" style="color: #10b981;">🟢</div>
        </div>
        <div class="metric-value" style="color: #10b981;">${bajo}</div>
        <div class="metric-caption">0 pts (comportamiento normal)</div>
      </div>
    </div>

    <div class="alert-box alert-info">
      <span>ℹ️</span>
      <div>
        <strong>Criterios del puntaje de riesgo explicable:</strong><br>
        • <strong>+2 puntos:</strong> más de 60 días sin comprar | <strong>+1 punto:</strong> entre 40 y 60 días sin comprar.<br>
        • <strong>+2 puntos:</strong> caída de frecuencia ≥ 40% | <strong>+1 punto:</strong> caída entre 20% y 40%.<br>
        <em>Nivel: 3+ → riesgo alto · 1–2 → medio · 0 → bajo. Supervisión humana garantizada.</em>
      </div>
    </div>

    <h3 style="margin-bottom: 16px; font-size: 16px; font-weight: 700;">
      Clientes con Señales de Riesgo (${enRiesgo.length})
    </h3>

    <div class="risk-card-list">
      ${enRiesgo.length === 0 ? '<div class="alert-box alert-success">No hay clientes con señales de riesgo en este conjunto de datos. 🎉</div>' : ''}
      ${enRiesgo.map(r => `
        <div class="risk-card ${r.nivel_riesgo === '🟠 Medio' ? 'risk-med' : ''}">
          <div class="risk-card-score">
            <h4>${r.nivel_riesgo}</h4>
            <div class="score-num">${r.puntaje_riesgo}</div>
            <div class="score-max">de 6 pts</div>
          </div>
          <div class="risk-card-body">
            <h3>${r.Cliente}</h3>
            <div class="risk-metrics-row">
              <span>Última compra: <strong>${Math.round(r.recencia_dias)} días</strong></span>
              <span>Frec. anterior: <strong>${r.frec_anterior.toFixed(1)}/mes</strong></span>
              <span>Frec. actual: <strong>${r.frec_actual.toFixed(1)}/mes</strong></span>
              <span>Gasto acumulado: <strong>${fmtMoney(r.gasto_acumulado)}</strong></span>
            </div>
            <div class="risk-callout">
              🧠 <strong>Explicación:</strong> ${r.explicacion}
            </div>
            <div class="risk-callout risk-callout-action">
              💡 <strong>Acción sugerida:</strong> ${r.accion_sugerida}
            </div>
          </div>
        </div>
      `).join('')}
    </div>
  `;

  document.getElementById('content-area').innerHTML = html;
}

// 4. Alertas Explicables
function renderSectionAlertas() {
  const metrics = getClientMetrics(state.filteredSales).sort((a, b) => b.puntaje_riesgo - a.puntaje_riesgo);

  const html = `
    <div class="alert-box alert-info">
      <span>🛡️</span>
      <div>
        Cada alerta explica <strong>qué variable</strong> la disparó (recencia o caída de frecuencia) y propone una acción <strong>bajo supervisión humana</strong>. La aplicación prioriza y recomienda, pero no toma decisiones automáticas de contacto.
      </div>
    </div>

    <div class="table-card">
      <div class="table-toolbar">
        <div>
          <h3 style="font-size: 15px; font-weight: 700;">🔔 Tabla de Alertas Explicables</h3>
          <span style="font-size: 12px; color: var(--text-muted);">Detalle transparente de cada variable y acción sugerida</span>
        </div>
        <div class="table-search-wrap">
          <span class="search-icon">🔍</span>
          <input type="text" id="alert-search" class="table-search-input" placeholder="Filtrar alertas..." oninput="filterAlertTable()">
        </div>
      </div>
      <div class="table-responsive">
        <table class="data-table" id="alerts-table">
          <thead>
            <tr>
              <th onclick="sortTable('alerts-table', 0)">Cliente ↕</th>
              <th onclick="sortTable('alerts-table', 1)">Nivel ↕</th>
              <th onclick="sortTable('alerts-table', 2, true)">Días sin comprar ↕</th>
              <th onclick="sortTable('alerts-table', 3, true)">Frec. anterior ↕</th>
              <th onclick="sortTable('alerts-table', 4, true)">Frec. actual ↕</th>
              <th onclick="sortTable('alerts-table', 5, true)">Caída frec. ↕</th>
              <th onclick="sortTable('alerts-table', 6, true)">Gasto Acumulado ↕</th>
              <th>Explicación (por qué)</th>
              <th>Acción sugerida</th>
            </tr>
          </thead>
          <tbody>
            ${metrics.map(r => `
              <tr>
                <td><strong>${r.Cliente}</strong></td>
                <td>
                  <span class="badge-pill ${r.nivel_riesgo.includes('Alto') ? 'badge-risk-high' : (r.nivel_riesgo.includes('Medio') ? 'badge-risk-med' : 'badge-risk-low')}">
                    ${r.nivel_riesgo}
                  </span>
                </td>
                <td>${Math.round(r.recencia_dias)} d</td>
                <td>${r.frec_anterior.toFixed(2)}</td>
                <td>${r.frec_actual.toFixed(2)}</td>
                <td><strong style="color: ${r.caida_frecuencia >= 0.4 ? '#ef4444' : '#f59e0b'};">${Math.round(r.caida_frecuencia * 100)}%</strong></td>
                <td>${fmtMoney(r.gasto_acumulado)}</td>
                <td style="max-width: 260px; font-size: 12px;">${r.explicacion}</td>
                <td style="max-width: 220px; font-size: 12px; color: var(--accent-primary); font-weight: 600;">${r.accion_sugerida}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;

  document.getElementById('content-area').innerHTML = html;
}

window.filterAlertTable = function() {
  const q = document.getElementById('alert-search').value.toLowerCase();
  const rows = document.querySelectorAll('#alerts-table tbody tr');
  rows.forEach(r => {
    r.style.display = r.innerText.toLowerCase().includes(q) ? '' : 'none';
  });
};

// 5. Oportunidades Comerciales
function renderSectionOportunidades() {
  const df = state.filteredSales;
  const metrics = getClientMetrics(df);
  const products = getProductPerformance(df);

  const prioClients = metrics.filter(m => m.nivel_riesgo !== '🟢 Bajo')
    .sort((a, b) => b.puntaje_riesgo - a.puntaje_riesgo || b.gasto_acumulado - a.gasto_acumulado)
    .slice(0, 5);

  const growingProds = [...products].sort((a, b) => b.cambio - a.cambio).slice(0, 5);

  // Sales by salesperson
  const sellerMap = {};
  df.forEach(s => { sellerMap[s.Vendedor] = (sellerMap[s.Vendedor] || 0) + s.Importe; });
  const sellers = Object.keys(sellerMap).sort((a, b) => sellerMap[b] - sellerMap[a]);

  const html = `
    <div class="alert-box alert-info">
      <span>💡</span>
      <div>
        La IA <strong>prioriza</strong> oportunidades según dos criterios explicables: el <strong>valor histórico</strong> del cliente y la <strong>tendencia</strong> reciente. La decisión final de contacto siempre es humana.
      </div>
    </div>

    <div class="charts-grid">
      <div class="chart-card">
        <div class="chart-card-header">
          <h3>🎯 Clientes Prioritarios para Re-contacto</h3>
          <span class="subtitle">Alto valor histórico con señales de fuga</span>
        </div>
        <div style="display: flex; flex-direction: column; gap: 10px; margin-top: 8px;">
          ${prioClients.length === 0 ? '<p style="color: var(--text-muted);">Sin candidatos prioritarios.</p>' : ''}
          ${prioClients.map(c => `
            <div style="background: var(--bg-secondary); padding: 12px; border-radius: var(--radius-md); border: 1px solid var(--border-glass);">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
                <strong>${c.Cliente}</strong>
                <span class="badge-pill ${c.nivel_riesgo.includes('Alto') ? 'badge-risk-high' : 'badge-risk-med'}">${c.nivel_riesgo}</span>
              </div>
              <div style="font-size: 12px; color: var(--text-secondary); margin-bottom: 4px;">
                Gasto histórico: <strong>${fmtMoney(c.gasto_acumulado)}</strong> · <strong>${Math.round(c.recencia_dias)} días</strong> sin comprar
              </div>
              <div style="font-size: 11.5px; color: var(--text-muted);">${c.explicacion}</div>
            </div>
          `).join('')}
        </div>
      </div>

      <div class="chart-card">
        <div class="chart-card-header">
          <h3>📈 Productos en Mayor Crecimiento</h3>
          <span class="subtitle">Comparativa últimos 90 días vs período anterior</span>
        </div>
        <div style="display: flex; flex-direction: column; gap: 10px; margin-top: 8px;">
          ${growingProds.map(p => {
            const arrow = p.cambio > 0 ? '📈' : '📉';
            return `
              <div style="background: var(--bg-secondary); padding: 12px; border-radius: var(--radius-md); border: 1px solid var(--border-glass);">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
                  <strong>${p.Producto}</strong>
                  <span style="font-size: 13px; font-weight: 700; color: ${p.cambio >= 0 ? '#10b981' : '#ef4444'};">
                    ${arrow} ${fmtPercent(p.cambio)}
                  </span>
                </div>
                <div style="font-size: 12px; color: var(--text-secondary);">
                  Ventas últimos 90 días: <strong>${fmtMoney(p.actual90)}</strong>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    </div>

    <div class="charts-grid charts-grid-full">
      <div class="chart-card">
        <div class="chart-card-header">
          <h3>👔 Rendimiento por Vendedor</h3>
          <span class="subtitle">Ventas totales acumuladas por ejecutivo comercial</span>
        </div>
        <div class="chart-wrapper">
          <canvas id="chart-vendedores"></canvas>
        </div>
      </div>
    </div>
  `;

  document.getElementById('content-area').innerHTML = html;

  setTimeout(() => {
    const tc = getThemeColors();
    destroyChart('chart-vendedores');
    const ctx = document.getElementById('chart-vendedores');
    if (ctx) {
      state.charts['chart-vendedores'] = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: sellers,
          datasets: [{
            label: 'Ventas ($)',
            data: sellers.map(s => sellerMap[s]),
            backgroundColor: tc.palette.slice(0, sellers.length),
            borderRadius: 6
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
            tooltip: { callbacks: { label: ctx => fmtMoney(ctx.raw) } }
          },
          scales: {
            x: { grid: { display: false }, ticks: { color: tc.text } },
            y: { grid: { color: tc.grid }, ticks: { color: tc.text, callback: val => '$' + (val/1000) + 'k' } }
          }
        }
      });
    }
  }, 50);
}

// 6. Productos
function renderSectionProductos() {
  const products = getProductPerformance(state.filteredSales);
  const best = products.slice(0, 3);
  const worst = [...products].sort((a, b) => a.ventas - b.ventas).slice(0, 3);

  const html = `
    <div class="charts-grid">
      <div class="chart-card">
        <div class="chart-card-header">
          <h3>🌟 Top 3 Mejor Desempeño</h3>
          <span class="subtitle">Mayores ingresos generados</span>
        </div>
        <div style="display: flex; flex-direction: column; gap: 8px;">
          ${best.map(p => `
            <div style="background: var(--bg-secondary); padding: 12px; border-radius: var(--radius-md); border: 1px solid var(--border-glass); display: flex; justify-content: space-between; align-items: center;">
              <div>
                <strong>${p.Producto}</strong><br>
                <span style="font-size: 11.5px; color: var(--text-muted);">${p.unidades} unidades · ${p.ordenes} órdenes</span>
              </div>
              <div style="text-align: right;">
                <strong style="color: #10b981;">${fmtMoney(p.ventas)}</strong><br>
                <span style="font-size: 11.5px; color: ${p.cambio >= 0 ? '#10b981' : '#ef4444'};">${fmtPercent(p.cambio)} 90d</span>
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <div class="chart-card">
        <div class="chart-card-header">
          <h3>🔻 Menor Desempeño</h3>
          <span class="subtitle">Oportunidad de impulso o revisión</span>
        </div>
        <div style="display: flex; flex-direction: column; gap: 8px;">
          ${worst.map(p => `
            <div style="background: var(--bg-secondary); padding: 12px; border-radius: var(--radius-md); border: 1px solid var(--border-glass); display: flex; justify-content: space-between; align-items: center;">
              <div>
                <strong>${p.Producto}</strong><br>
                <span style="font-size: 11.5px; color: var(--text-muted);">${p.unidades} unidades · ${p.ordenes} órdenes</span>
              </div>
              <div style="text-align: right;">
                <strong style="color: #ef4444;">${fmtMoney(p.ventas)}</strong><br>
                <span style="font-size: 11.5px; color: ${p.cambio >= 0 ? '#10b981' : '#ef4444'};">${fmtPercent(p.cambio)} 90d</span>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>

    <div class="charts-grid charts-grid-full">
      <div class="chart-card">
        <div class="chart-card-header">
          <h3>📊 Comparativa General de Productos</h3>
          <span class="subtitle">Ingresos por producto</span>
        </div>
        <div class="chart-wrapper">
          <canvas id="chart-all-prods"></canvas>
        </div>
      </div>
    </div>

    <div class="table-card">
      <div class="table-toolbar">
        <h3 style="font-size: 15px; font-weight: 700;">📦 Tabla Maestra de Productos</h3>
      </div>
      <div class="table-responsive">
        <table class="data-table" id="products-table">
          <thead>
            <tr>
              <th onclick="sortTable('products-table', 0)">Producto ↕</th>
              <th onclick="sortTable('products-table', 1)">Categoría ↕</th>
              <th onclick="sortTable('products-table', 2, true)">Ventas Totales ↕</th>
              <th onclick="sortTable('products-table', 3, true)">Unidades ↕</th>
              <th onclick="sortTable('products-table', 4, true)">Órdenes ↕</th>
              <th onclick="sortTable('products-table', 5, true)">Ventas Últimos 90d ↕</th>
              <th onclick="sortTable('products-table', 6, true)">Cambio 90d ↕</th>
            </tr>
          </thead>
          <tbody>
            ${products.map(p => `
              <tr>
                <td><strong>${p.Producto}</strong></td>
                <td>${p.Categoria}</td>
                <td><strong>${fmtMoney(p.ventas)}</strong></td>
                <td>${fmtNum(p.unidades)}</td>
                <td>${p.ordenes}</td>
                <td>${fmtMoney(p.actual90)}</td>
                <td><strong style="color: ${p.cambio >= 0 ? '#10b981' : '#ef4444'};">${fmtPercent(p.cambio)}</strong></td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;

  document.getElementById('content-area').innerHTML = html;

  setTimeout(() => {
    const tc = getThemeColors();
    destroyChart('chart-all-prods');
    const ctx = document.getElementById('chart-all-prods');
    if (ctx) {
      state.charts['chart-all-prods'] = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: products.map(p => p.Producto),
          datasets: [{
            label: 'Ventas ($)',
            data: products.map(p => p.ventas),
            backgroundColor: tc.palette.slice(0, products.length),
            borderRadius: 6
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
            tooltip: { callbacks: { label: ctx => fmtMoney(ctx.raw) } }
          },
          scales: {
            x: { grid: { display: false }, ticks: { color: tc.text, maxRotation: 30, minRotation: 30 } },
            y: { grid: { color: tc.grid }, ticks: { color: tc.text, callback: val => '$' + (val/1000) + 'k' } }
          }
        }
      });
    }
  }, 50);
}

// 7. Misión de Evaluación
function renderSectionMision() {
  const metrics = getClientMetrics(state.filteredSales);
  const prioridad = metrics.filter(m => m.nivel_riesgo !== '🟢 Bajo')
    .sort((a, b) => b.puntaje_riesgo - a.puntaje_riesgo || b.gasto_acumulado - a.gasto_acumulado);

  const candidates = prioridad.length > 0 ? prioridad : metrics.slice(0, 5);
  const topCandidate = candidates[0] ? candidates[0].Cliente : 'Cliente 012';

  // Format stopwatch
  const totalSecs = state.quiz.accumulatedSeconds + (state.quiz.timerRunning ? Math.floor((Date.now() - state.quiz.startTime) / 1000) : 0);
  const mins = Math.floor(totalSecs / 60);
  const secs = totalSecs % 60;
  const timerText = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;

  const questions = [
    {
      id: 'q1',
      title: '1) Un cliente con más de 60 días sin comprar y una caída de frecuencia de al menos 40% tiene un nivel de riesgo:',
      options: ['🟢 Bajo', '🟠 Medio', '🔴 Alto'],
      correct: '🔴 Alto'
    },
    {
      id: 'q2',
      title: '2) Según el análisis, un cliente con más de 120 días sin comprar se clasifica como:',
      options: ['Alto valor', 'En riesgo', 'Inactivo', 'Nuevo'],
      correct: 'Inactivo'
    },
    {
      id: 'q3',
      title: '3) Con los filtros activos, ¿qué cliente encabezaría la cola de atención comercial prioritaria?',
      options: [topCandidate, 'Cliente 001', 'Cliente 020', 'Cliente 005'].filter((v, i, a) => a.indexOf(v) === i),
      correct: topCandidate
    },
    {
      id: 'q4',
      title: '4) Un cliente lleva 80 días sin comprar y su frecuencia cayó un 30%. ¿Cuál es su puntaje de riesgo total?',
      options: ['1', '2', '3', '4'],
      correct: '3'
    },
    {
      id: 'q5',
      title: '5) En la segmentación, un cliente con gasto acumulado alto y recencia menor a 60 días se clasifica como:',
      options: ['Nuevo', 'Alto valor', 'Leal', 'En riesgo'],
      correct: 'Alto valor'
    },
    {
      id: 'q6',
      title: '6) La acción sugerida automáticamente para un cliente con nivel de riesgo "🔴 Alto" es:',
      options: [
        'No requiere acción inmediata',
        'Monitorear evolución y programar seguimiento',
        'Revisar historial y considerar contacto comercial prioritario'
      ],
      correct: 'Revisar historial y considerar contacto comercial prioritario'
    }
  ];

  // Calculate score
  let correctCount = 0;
  questions.forEach(q => {
    if (state.quiz.answers[q.id] === q.correct) correctCount++;
  });

  const progressPercent = Math.round((correctCount / questions.length) * 100);

  const html = `
    <div class="mission-container">
      <div class="alert-box alert-info">
        <span>🎯</span>
        <div>
          <strong>Misión de Evaluación Interactiva:</strong><br>
          Revisa los candidatos prioritarios propuestos por el motor de IA y responde las 6 preguntas de verificación. La aplicación propone y justifica, pero la decisión final siempre es humana.
        </div>
      </div>

      <div class="chart-card" style="margin-bottom: 20px;">
        <div class="chart-card-header">
          <h3>🧠 Candidatos Sugeridos por la IA (con justificación explicable)</h3>
        </div>
        <div style="display: flex; flex-direction: column; gap: 8px;">
          ${candidates.slice(0, 4).map(c => `
            <div style="padding: 10px 14px; background: var(--bg-secondary); border-radius: var(--radius-md); border: 1px solid var(--border-glass);">
              <strong>${c.Cliente}</strong> · <span class="badge-pill ${c.nivel_riesgo.includes('Alto') ? 'badge-risk-high' : 'badge-risk-med'}">${c.nivel_riesgo}</span> · 
              Gasto: <strong>${fmtMoney(c.gasto_acumulado)}</strong> · <strong>${Math.round(c.recencia_dias)} días</strong> sin comprar<br>
              <span style="font-size: 12px; color: var(--text-muted);">${c.explicacion}</span>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Timer Box -->
      <div class="timer-box">
        <div class="timer-display">
          <span>⏱️</span>
          <div>
            <div style="font-size: 11px; font-weight: 700; color: var(--text-muted); text-transform: uppercase;">
              ${state.quiz.timerRunning ? 'Cronómetro en marcha...' : 'Cronómetro pausado'}
            </div>
            <div class="timer-digits" id="timer-val">${timerText}</div>
          </div>
        </div>
        <div style="display: flex; gap: 8px;">
          <button class="btn-pill btn-pill-primary" onclick="toggleTimer()">
            ${state.quiz.timerRunning ? '⏸️ Pausar' : '▶️ Iniciar'}
          </button>
          <button class="btn-pill btn-pill-secondary" onclick="resetTimer()">
            ↺ Reiniciar
          </button>
        </div>
      </div>

      <!-- Progress -->
      <div style="margin-bottom: 20px;">
        <div style="display: flex; justify-content: space-between; font-size: 13px; font-weight: 700; margin-bottom: 6px;">
          <span>Progreso de Verificación</span>
          <span style="color: var(--accent-primary);">${correctCount} de ${questions.length} Correctas</span>
        </div>
        <div class="progress-bar-container">
          <div class="progress-bar-fill" style="width: ${progressPercent}%;"></div>
        </div>
      </div>

      ${correctCount === questions.length ? `
        <div class="alert-box alert-success" style="font-size: 15px;">
          🎉 <strong>¡Ejercicio Completado con Éxito!</strong> Acertaste las 6 preguntas en <strong>${timerText}</strong>.
        </div>
      ` : ''}

      <!-- Questions List -->
      ${questions.map((q, idx) => {
        const userChoice = state.quiz.answers[q.id];
        const isAnswered = userChoice !== undefined;
        const isCorrect = userChoice === q.correct;

        return `
          <div class="quiz-card">
            <div class="quiz-question-title">${q.title}</div>
            <div class="quiz-options">
              ${q.options.map(opt => `
                <label class="quiz-option-label" onclick="selectQuizAnswer('${q.id}', '${opt.replace(/'/g, "\\'")}')">
                  <input type="radio" name="${q.id}" value="${opt}" ${userChoice === opt ? 'checked' : ''}>
                  <span>${opt}</span>
                </label>
              `).join('')}
            </div>
            ${isAnswered ? `
              <div class="quiz-feedback ${isCorrect ? 'correct' : 'incorrect'}">
                ${isCorrect ? `✓ ¡Correcto! ${q.correct}` : `✗ Incorrecto. Elegiste: ${userChoice} — <span style="text-decoration: underline;">Respuesta correcta: ${q.correct}</span>`}
              </div>
            ` : ''}
          </div>
        `;
      }).join('')}

      <div style="text-align: center; margin-top: 20px;">
        <button class="btn-pill btn-pill-secondary" onclick="resetQuiz()">
          🔄 Reiniciar todas las preguntas
        </button>
      </div>
    </div>
  `;

  document.getElementById('content-area').innerHTML = html;
}

// Quiz interactive handlers
window.toggleTimer = function() {
  if (state.quiz.timerRunning) {
    state.quiz.accumulatedSeconds += Math.floor((Date.now() - state.quiz.startTime) / 1000);
    state.quiz.timerRunning = false;
    clearInterval(state.quiz.timerInterval);
  } else {
    state.quiz.startTime = Date.now();
    state.quiz.timerRunning = true;
    state.quiz.timerInterval = setInterval(() => {
      const el = document.getElementById('timer-val');
      if (el) {
        const total = state.quiz.accumulatedSeconds + Math.floor((Date.now() - state.quiz.startTime) / 1000);
        const m = Math.floor(total / 60);
        const s = total % 60;
        el.innerText = `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
      }
    }, 1000);
  }
  renderSectionMision();
};

window.resetTimer = function() {
  state.quiz.timerRunning = false;
  state.quiz.accumulatedSeconds = 0;
  clearInterval(state.quiz.timerInterval);
  renderSectionMision();
};

window.selectQuizAnswer = function(qid, val) {
  state.quiz.answers[qid] = val;
  renderSectionMision();
};

window.resetQuiz = function() {
  state.quiz.answers = {};
  renderSectionMision();
};

// 8. Asistente de IA de Apoyo
function renderSectionAsistente() {
  const isCloud = state.ai.apiKey && state.ai.apiKey.length > 5;
  const engineLabel = isCloud 
    ? `☁️ IA en la Nube Activa (${state.ai.provider === 'gemini' ? 'Google Gemini' : 'Groq Llama 3'})` 
    : '🟢 Motor de Reglas Locales (sin internet)';

  const html = `
    <div class="chat-container">
      <div class="chat-header">
        <div>
          <h3 style="font-size: 15px; font-weight: 700;">🤖 Asistente Comercial Inteligente</h3>
          <span style="font-size: 12px; color: var(--text-muted);">Consultas en lenguaje natural con contexto en tiempo real</span>
        </div>
        <div style="display: flex; align-items: center; gap: 10px;">
          <div class="chat-engine-status">
            <span class="status-dot ${isCloud ? 'cloud' : ''}"></span>
            <span>${engineLabel}</span>
          </div>
          <button class="btn-pill btn-pill-secondary" onclick="openApiModal()">
            ⚙️ Configurar API Key
          </button>
        </div>
      </div>

      <div class="chat-messages" id="chat-messages-box">
        ${state.ai.messages.map(m => `
          <div class="chat-bubble ${m.role}">
            <div class="chat-avatar">${m.role === 'assistant' ? '🤖' : '👤'}</div>
            <div class="chat-content">
              ${formatMarkdown(m.content)}
            </div>
          </div>
        `).join('')}
      </div>

      <div class="chat-suggestion-chips">
        <span class="suggestion-chip" onclick="sendQuickPrompt('¿Cuál es el total de ventas?')">💰 Total de ventas</span>
        <span class="suggestion-chip" onclick="sendQuickPrompt('¿Qué clientes están en riesgo?')">⚠️ Clientes en riesgo</span>
        <span class="suggestion-chip" onclick="sendQuickPrompt('¿Cuál es el mejor producto?')">🏆 Mejor producto</span>
        <span class="suggestion-chip" onclick="sendQuickPrompt('¿Qué oportunidades comerciales hay?')">💡 Oportunidades</span>
        <span class="suggestion-chip" onclick="sendQuickPrompt('Explica qué es la segmentación RFM')">📚 ¿Qué es RFM?</span>
        <span class="suggestion-chip" onclick="sendQuickPrompt('ayuda')">❓ Ayuda</span>
      </div>

      <form class="chat-input-row" onsubmit="handleChatSubmit(event)">
        <input type="text" id="chat-input-text" class="chat-input" placeholder="Escribe tu consulta sobre las ventas, clientes, riesgos..." autocomplete="off">
        <button type="submit" class="btn-pill btn-pill-primary">
          Enviar 🚀
        </button>
      </form>
    </div>
  `;

  document.getElementById('content-area').innerHTML = html;

  setTimeout(() => {
    const box = document.getElementById('chat-messages-box');
    if (box) box.scrollTop = box.scrollHeight;
  }, 50);
}

// Chat Assistant Response Logic
function localRuleResponse(prompt) {
  const p = prompt.toLowerCase();
  const df = state.filteredSales;
  const metrics = getClientMetrics(df);
  const products = getProductPerformance(df);

  const hay = (...words) => words.some(w => p.includes(w));

  if (hay('ayuda', 'opciones', 'que puedes', 'qué puedes')) {
    return `Puedo responder sobre los datos de la vista activa:
- **«¿cuál es el total de ventas?»**
- **«¿qué clientes están en riesgo?»**
- **«¿cuál es el mejor o peor producto?»**
- **«¿qué oportunidades hay?»**
- **«¿cuántos clientes hay?»**
- **«¿qué es la segmentación RFM?»**

*Si configuras una clave gratuita de Google Gemini o Groq en el botón ⚙️ Configurar, responderé cualquier consulta abierta.*`;
  }

  if (hay('total', 'venta', 'ventas', 'ingreso', 'monto', 'dinero', 'cuanto', 'cuánto')) {
    const total = df.reduce((a, s) => a + s.Importe, 0);
    const topProd = products[0] ? products[0].Producto : 'N/A';
    const topCli = metrics[0] ? metrics[0].Cliente : 'N/A';
    return `📊 **Resumen de Ventas en la Vista:**\n- **Total acumulado:** ${fmtMoney(total)}\n- **Órdenes:** ${fmtNum(df.length)}\n- **Producto estrella:** ${topProd}\n- **Cliente con mayor gasto:** ${topCli}`;
  }

  if (hay('riesgo', 'riesgos', 'fuga', 'perdiendo')) {
    const altos = metrics.filter(m => m.nivel_riesgo === '🔴 Alto');
    if (altos.length === 0) {
      return '🎉 **¡Excelentes noticias!** No hay clientes con nivel de riesgo alto en el período o filtros seleccionados.';
    }
    const lista = altos.slice(0, 5).map(c => `• **${c.Cliente}** (Gasto: ${fmtMoney(c.gasto_acumulado)}, Caída: ${Math.round(c.caida_frecuencia * 100)}%, Inactivo: ${Math.round(c.recencia_dias)} días)`).join('\n');
    return `⚠️ **Clientes con Riesgo Alto (${altos.length} detectados):**\n${lista}\n\n*Acción recomendada: Contactar prioritariamente para evitar la pérdida del cliente.*`;
  }

  if (hay('producto', 'productos', 'mejor', 'peor', 'estrella')) {
    if (products.length === 0) return 'No hay datos de productos en la vista activa.';
    const best = products[0];
    const worst = products[products.length - 1];
    return `📦 **Desempeño de Productos:**\n- **Mejor producto:** **${best.Producto}** (${fmtMoney(best.ventas)}, ${best.unidades} unidades)\n- **Menor venta:** **${worst.Producto}** (${fmtMoney(worst.ventas)}, ${worst.unidades} unidades)`;
  }

  if (hay('oportunidad', 'oportunidades', 'recontacto', 'contactar', 'prioritarios')) {
    const prio = metrics.filter(m => m.nivel_riesgo !== '🟢 Bajo').slice(0, 4);
    const lista = prio.map(c => `• **${c.Cliente}** (${c.nivel_riesgo}, Gasto histórico ${fmtMoney(c.gasto_acumulado)})`).join('\n');
    return `💡 **Oportunidades Comerciales Prioritarias:**\n${lista}\n\n*Recuerda: la IA prioriza y sugiere explicaciones, pero la decisión de contacto es 100% humana.*`;
  }

  if (hay('cliente', 'clientes', 'cuantos', 'cuántos')) {
    const n = new Set(df.map(s => s.Cliente)).size;
    const total = df.reduce((a, s) => a + s.Importe, 0);
    return `👥 En la vista activa hay **${fmtNum(df.length)}** transacciones de **${fmtNum(n)}** clientes distintos, con un gasto total de **${fmtMoney(total)}**.`;
  }

  if (hay('rfm', 'segmentacion', 'segmentación', 'segmento')) {
    return `📚 **Segmentación RFM Explicable:**\n- **Recencia (R):** Días transcurridos desde la última compra del cliente.\n- **Frecuencia (F):** Compras promedio por mes (últimos 90 días vs período anterior).\n- **Monto (M):** Gasto acumulado del cliente.\n\nClasifica a los clientes en: *Alto valor, Leal, Promedio, Nuevo, En riesgo e Inactivo*.`;
  }

  return `🤖 **Modo Reglas Locales:** Respondo sobre totales de ventas, clientes en riesgo, mejor/peor producto y oportunidades comerciales.\n\nPara consultas complejas o abiertas, puedes agregar una clave gratuita de Google Gemini o Groq en el botón superior **⚙️ Configurar API Key**.`;
}

// Simple Markdown Formatter
function formatMarkdown(text) {
  if (!text) return '';
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/«(.*?)»/g, '<em>«$1»</em>')
    .replace(/\n/g, '<br>');
}

window.sendQuickPrompt = function(prompt) {
  document.getElementById('chat-input-text').value = prompt;
  handleChatSubmit(new Event('submit'));
};

window.handleChatSubmit = async function(e) {
  if (e) e.preventDefault();
  const input = document.getElementById('chat-input-text');
  const text = input.value.trim();
  if (!text) return;

  state.ai.messages.push({ role: 'user', content: text });
  input.value = '';
  renderSectionAsistente();

  // If Cloud API Key configured, attempt Cloud Call
  if (state.ai.apiKey && state.ai.apiKey.length > 5) {
    try {
      const response = await callCloudAi(text);
      state.ai.messages.push({ role: 'assistant', content: response });
    } catch (err) {
      console.warn('Cloud LLM failed, fallback to rules:', err);
      const fallback = localRuleResponse(text);
      state.ai.messages.push({ role: 'assistant', content: fallback + '\n\n*(Nota: No se pudo conectar a la nube, respuesta generada con reglas locales)*' });
    }
  } else {
    const reply = localRuleResponse(text);
    state.ai.messages.push({ role: 'assistant', content: reply });
  }

  renderSectionAsistente();
};

async function callCloudAi(prompt) {
  const df = state.filteredSales;
  const metrics = getClientMetrics(df);
  const total = df.reduce((a, s) => a + s.Importe, 0);

  const context = `Contexto del Dashboard comercial:
- Total ventas: ${fmtMoney(total)}
- Total transacciones: ${df.length}
- Total clientes: ${metrics.length}
- Top 5 clientes: ${metrics.slice(0, 5).map(m => `${m.Cliente} (${fmtMoney(m.gasto_acumulado)})`).join(', ')}
- Clientes en riesgo: ${metrics.filter(m => m.nivel_riesgo === '🔴 Alto').map(m => m.Cliente).join(', ') || 'Ninguno'}
Responde siempre en español, de forma clara, ejecutiva y práctica.`;

  if (state.ai.provider === 'gemini') {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${encodeURIComponent(state.ai.apiKey)}`;
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: `${context}\n\nPregunta: ${prompt}` }] }]
      })
    });
    const data = await res.json();
    return data.candidates[0].content.parts[0].text;
  } else {
    const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${state.ai.apiKey}`
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [
          { role: 'system', content: context },
          { role: 'user', content: prompt }
        ]
      })
    });
    const data = await res.json();
    return data.choices[0].message.content;
  }
}

// 9. Evaluación
function renderSectionEvaluacion() {
  const html = `
    <div class="eval-card">
      <h3 style="font-size: 18px; font-weight: 800; margin-bottom: 6px;">📝 Tu Evaluación de la Aplicación</h3>
      <p style="font-size: 13px; color: var(--text-muted); margin-bottom: 24px;">
        Tu opinión nos ayuda a mejorar. Valora cada aspecto con una nota del <strong>1 al 10</strong> (1 = muy deficiente, 10 = excelente) y deja un comentario.
      </p>

      <form id="eval-form" onsubmit="handleEvaluationSubmit(event)">
        <div class="eval-slider-group">
          <div class="eval-slider-header">
            <label>Utilidad de la aplicación</label>
            <span class="eval-slider-value" id="val-utilidad">10/10</span>
          </div>
          <input type="range" class="eval-range" min="1" max="10" value="10" id="inp-utilidad" oninput="document.getElementById('val-utilidad').innerText = this.value + '/10'">
        </div>

        <div class="eval-slider-group">
          <div class="eval-slider-header">
            <label>Facilidad de uso e interfaz</label>
            <span class="eval-slider-value" id="val-facilidad">10/10</span>
          </div>
          <input type="range" class="eval-range" min="1" max="10" value="10" id="inp-facilidad" oninput="document.getElementById('val-facilidad').innerText = this.value + '/10'">
        </div>

        <div class="eval-slider-group">
          <div class="eval-slider-header">
            <label>Calidad del análisis y métricas</label>
            <span class="eval-slider-value" id="val-calidad">10/10</span>
          </div>
          <input type="range" class="eval-range" min="1" max="10" value="10" id="inp-calidad" oninput="document.getElementById('val-calidad').innerText = this.value + '/10'">
        </div>

        <div class="eval-slider-group">
          <div class="eval-slider-header">
            <label>Confianza en las recomendaciones</label>
            <span class="eval-slider-value" id="val-confianza">10/10</span>
          </div>
          <input type="range" class="eval-range" min="1" max="10" value="10" id="inp-confianza" oninput="document.getElementById('val-confianza').innerText = this.value + '/10'">
        </div>

        <div class="eval-slider-group">
          <div class="eval-slider-header">
            <label>Aprendizaje logrado</label>
            <span class="eval-slider-value" id="val-aprendizaje">10/10</span>
          </div>
          <input type="range" class="eval-range" min="1" max="10" value="10" id="inp-aprendizaje" oninput="document.getElementById('val-aprendizaje').innerText = this.value + '/10'">
        </div>

        <div style="margin-bottom: 24px;">
          <label style="font-size: 13.5px; font-weight: 600;">Comentarios y sugerencias (opcional)</label>
          <textarea class="eval-textarea" id="inp-comentario" placeholder="¿Qué te gustó? ¿Qué mejorarías?"></textarea>
        </div>

        <button type="submit" class="btn-pill btn-pill-primary" style="width: 100%; justify-content: center; padding: 12px;">
          📨 Enviar Evaluación
        </button>
      </form>

      ${state.evaluations.length > 0 ? `
        <div style="margin-top: 36px; padding-top: 24px; border-top: 1px solid var(--border-glass);">
          <h4 style="font-size: 14px; font-weight: 700; margin-bottom: 12px;">Evaluaciones Anteriores Registradas (${state.evaluations.length})</h4>
          <div style="display: flex; flex-direction: column; gap: 10px;">
            ${state.evaluations.map(e => `
              <div style="background: var(--bg-secondary); padding: 12px 16px; border-radius: var(--radius-md); border: 1px solid var(--border-glass); font-size: 12.5px;">
                <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
                  <strong>Fecha: ${e.fecha}</strong>
                  <span style="color: var(--accent-primary); font-weight: 700;">Promedio: ${((e.utilidad + e.facilidad + e.calidad + e.confianza + e.aprendizaje) / 5).toFixed(1)}/10</span>
                </div>
                <div>Utilidad: ${e.utilidad} · Facilidad: ${e.facilidad} · Calidad: ${e.calidad} · Confianza: ${e.confianza} · Aprendizaje: ${e.aprendizaje}</div>
                ${e.comentario ? `<div style="margin-top: 6px; font-style: italic; color: var(--text-muted);">«${e.comentario}»</div>` : ''}
              </div>
            `).join('')}
          </div>
        </div>
      ` : ''}
    </div>
  `;

  document.getElementById('content-area').innerHTML = html;
}

window.handleEvaluationSubmit = function(e) {
  e.preventDefault();
  const registro = {
    fecha: new Date().toISOString().substring(0, 10),
    utilidad: Number(document.getElementById('inp-utilidad').value),
    facilidad: Number(document.getElementById('inp-facilidad').value),
    calidad: Number(document.getElementById('inp-calidad').value),
    confianza: Number(document.getElementById('inp-confianza').value),
    aprendizaje: Number(document.getElementById('inp-aprendizaje').value),
    comentario: document.getElementById('inp-comentario').value.trim()
  };

  state.evaluations.push(registro);
  localStorage.setItem('sbd_evaluations', JSON.stringify(state.evaluations));

  alert('✅ ¡Gracias por tu evaluación! Ha sido guardada exitosamente.');
  renderSectionEvaluacion();
};

// --- Table Sorting Helper ---
window.sortTable = function(tableId, colIndex, isNumeric = false) {
  const table = document.getElementById(tableId);
  const tbody = table.querySelector('tbody');
  const rows = Array.from(tbody.querySelectorAll('tr'));

  const isAsc = table.getAttribute('data-sort-dir') !== 'asc';
  table.setAttribute('data-sort-dir', isAsc ? 'asc' : 'desc');

  rows.sort((a, b) => {
    let cellA = a.children[colIndex].innerText.trim();
    let cellB = b.children[colIndex].innerText.trim();

    if (isNumeric) {
      const numA = parseFloat(cellA.replace(/[^\d.-]/g, '')) || 0;
      const numB = parseFloat(cellB.replace(/[^\d.-]/g, '')) || 0;
      return isAsc ? numA - numB : numB - numA;
    } else {
      return isAsc ? cellA.localeCompare(cellB) : cellB.localeCompare(cellA);
    }
  });

  rows.forEach(r => tbody.appendChild(r));
};

// --- Router / View Switcher ---
function renderCurrentSection() {
  const titleEl = document.getElementById('current-section-title');
  const titles = {
    resumen: 'Resumen General',
    clientes: 'Análisis de Clientes',
    riesgo: 'Clientes en Riesgo',
    alertas: 'Alertas Explicables',
    oportunidades: 'Oportunidades Comerciales',
    productos: 'Productos',
    mision: '🎯 Misión de Evaluación',
    asistente: '🤖 Asistente de IA de Apoyo',
    evaluacion: '📝 Evaluación'
  };

  if (titleEl) titleEl.innerText = titles[state.currentSection] || 'Dashboard';

  // Highlight active sidebar item
  document.querySelectorAll('.nav-item').forEach(item => {
    if (item.getAttribute('data-section') === state.currentSection) {
      item.classList.add('active');
    } else {
      item.classList.remove('active');
    }
  });

  if (state.filteredSales.length === 0) {
    document.getElementById('content-area').innerHTML = `
      <div class="alert-box alert-warning">
        <span>⚠️</span>
        <div>No hay transacciones de ventas que coincidan con los filtros seleccionados. Intenta ampliar el rango de fechas o restablecer los filtros en la barra lateral.</div>
      </div>
    `;
    return;
  }

  switch (state.currentSection) {
    case 'resumen': renderSectionResumen(); break;
    case 'clientes': renderSectionClientes(); break;
    case 'riesgo': renderSectionRiesgo(); break;
    case 'alertas': renderSectionAlertas(); break;
    case 'oportunidades': renderSectionOportunidades(); break;
    case 'productos': renderSectionProductos(); break;
    case 'mision': renderSectionMision(); break;
    case 'asistente': renderSectionAsistente(); break;
    case 'evaluacion': renderSectionEvaluacion(); break;
  }
}

// Switch Section
window.switchSection = function(sectionKey) {
  state.currentSection = sectionKey;
  renderCurrentSection();

  // Close mobile sidebar if open
  document.getElementById('sidebar').classList.remove('open');
};

// --- Filter Multi-Select Setup ---
function populateFilterOptions() {
  const prods = [...new Set(state.allSales.map(s => s.Producto))].sort();
  const clients = [...new Set(state.allSales.map(s => s.Cliente))].sort();
  const regions = [...new Set(state.allSales.map(s => s.Region))].sort();
  const channels = [...new Set(state.allSales.map(s => s.Canal))].sort();
  const sellers = [...new Set(state.allSales.map(s => s.Vendedor))].sort();

  renderFilterChips('filter-prods-chips', prods, 'products');
  renderFilterChips('filter-clients-chips', clients, 'clients');
  renderFilterChips('filter-regions-chips', regions, 'regions');
  renderFilterChips('filter-channels-chips', channels, 'channels');
  renderFilterChips('filter-sellers-chips', sellers, 'salespeople');
}

function renderFilterChips(containerId, items, filterKey) {
  const c = document.getElementById(containerId);
  if (!c) return;
  c.innerHTML = items.map(item => `
    <span class="filter-chip ${state.filters[filterKey].includes(item) ? 'selected' : ''}" onclick="toggleFilterChip('${filterKey}', '${item.replace(/'/g, "\\'")}')">
      ${item}
    </span>
  `).join('');
}

window.toggleFilterChip = function(filterKey, value) {
  const arr = state.filters[filterKey];
  const idx = arr.indexOf(value);
  if (idx >= 0) arr.splice(idx, 1);
  else arr.push(value);

  populateFilterOptions();
  applyFilters();
};

window.resetAllFilters = function() {
  state.filters.startDate = '2025-10-01';
  state.filters.endDate = '2026-09-11';
  state.filters.products = [];
  state.filters.clients = [];
  state.filters.regions = [];
  state.filters.channels = [];
  state.filters.salespeople = [];

  const sInp = document.getElementById('filter-start-date');
  const eInp = document.getElementById('filter-end-date');
  if (sInp) sInp.value = state.filters.startDate;
  if (eInp) eInp.value = state.filters.endDate;

  populateFilterOptions();
  applyFilters();
};

// Date Presets
window.setDatePreset = function(days) {
  const end = new Date(REF_DATE);
  const start = new Date(REF_DATE.getTime() - days * 24 * 60 * 60 * 1000);

  state.filters.startDate = start.toISOString().substring(0, 10);
  state.filters.endDate = end.toISOString().substring(0, 10);

  document.getElementById('filter-start-date').value = state.filters.startDate;
  document.getElementById('filter-end-date').value = state.filters.endDate;

  applyFilters();
};

// --- Theme Management ---
window.toggleTheme = function() {
  const current = document.documentElement.getAttribute('data-theme') || 'dark';
  const next = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('sbd_theme', next);

  const btn = document.getElementById('btn-theme-toggle');
  if (btn) btn.innerText = next === 'dark' ? '🌙' : '☀️';

  renderCurrentSection();
};

// --- API Key Modal Handlers ---
window.openApiModal = function() {
  document.getElementById('api-modal').classList.add('open');
  document.getElementById('api-key-input').value = state.ai.apiKey;
  document.getElementById('api-provider-select').value = state.ai.provider;
};

window.closeApiModal = function() {
  document.getElementById('api-modal').classList.remove('open');
};

window.saveApiSettings = function() {
  const key = document.getElementById('api-key-input').value.trim();
  const provider = document.getElementById('api-provider-select').value;
  state.ai.apiKey = key;
  state.ai.provider = provider;
  localStorage.setItem('sbd_api_key', key);
  localStorage.setItem('sbd_provider', provider);
  closeApiModal();
  renderCurrentSection();
};

// --- Export CSV Handler ---
window.exportCurrentDataCsv = function() {
  const df = state.filteredSales;
  if (df.length === 0) return alert('No hay datos para exportar.');

  const headers = ['Fecha', 'Cliente', 'Producto', 'Categoria', 'Cantidad', 'Precio_unitario', 'Importe', 'Region', 'Canal', 'Vendedor'];
  const rows = df.map(s => [
    s.Fecha,
    `"${s.Cliente}"`,
    `"${s.Producto}"`,
    `"${s.Categoria}"`,
    s.Cantidad,
    s.Precio_unitario,
    s.Importe,
    `"${s.Region}"`,
    `"${s.Canal}"`,
    `"${s.Vendedor}"`
  ]);

  const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', `ventas_filtradas_${new Date().toISOString().substring(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

// --- Initialization ---
document.addEventListener('DOMContentLoaded', () => {
  // Theme init
  const savedTheme = localStorage.getItem('sbd_theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);
  const themeBtn = document.getElementById('btn-theme-toggle');
  if (themeBtn) themeBtn.innerText = savedTheme === 'dark' ? '🌙' : '☀️';

  // Date filters init
  const sInp = document.getElementById('filter-start-date');
  const eInp = document.getElementById('filter-end-date');
  if (sInp) {
    sInp.value = state.filters.startDate;
    sInp.addEventListener('change', (e) => {
      state.filters.startDate = e.target.value;
      applyFilters();
    });
  }
  if (eInp) {
    eInp.value = state.filters.endDate;
    eInp.addEventListener('change', (e) => {
      state.filters.endDate = e.target.value;
      applyFilters();
    });
  }

  // Mobile menu toggle
  const mobBtn = document.getElementById('btn-mobile-menu');
  if (mobBtn) {
    mobBtn.addEventListener('click', () => {
      document.getElementById('sidebar').classList.toggle('open');
    });
  }

  populateFilterOptions();
  applyFilters();
});
