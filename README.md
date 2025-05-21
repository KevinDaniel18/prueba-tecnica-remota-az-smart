# 🚀 Prueba Técnica React + FastAPI

Este proyecto es una prueba técnica remota que integra:

- 🧠 **Frontend** con React + Vite
- ⚙️ **Backend** con Python + FastAPI
- 🐳 Contenedores con Docker Compose
- 🗄️ **Base de datos** con SQL Server (archivo proporcionado dentro de la carpeta sql file)

---

## 🚀 Inicio Rápido

- 🟦 **Frontend:** [http://localhost:5173](http://localhost:5173)
- 🔵 **Backend (Swagger UI):** [http://localhost:8000/docs](http://localhost:8000/docs)

---

## 📦 Requisitos

Antes de empezar, asegúrate de tener instalado:

- [Docker](https://www.docker.com/)
- (Opcional para la base de datos) [SQL Server Management Studio (SSMS)](https://learn.microsoft.com/sql/ssms)

---

## 🛠️ Instalación y ejecución

```bash
git clone <este repositorio>
cd tu-proyecto
docker-compose up --build
```

## 🔧 Uso del entorno virtual para el backend (opcional)

Si prefieres ejecutar el backend localmente sin Docker, puedes crear un entorno virtual en la carpeta `backend-python`.

### 📌 Pasos:

1. Entra al directorio:

```bash
cd backend-python
```

2. Crea el entorno virtual

```
python -m venv .venv
```

3. Activa el entorno:

- (en windows)

```
.venv\Scripts\activate
```

- (en macOis/Linux)

```
source .venv/bin/activate
```

4. Instala las dependencias:

```
pip install fastapi uvicorn
```

5. Ejecuta el servidor localmente:

```
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

[Fuente](https://fastapi.tiangolo.com/es/virtual-environments/#instala-paquetes-directamente)

# 🧾 Uso del archivo `Dispositivos.sql` en SQL Server

## 📌 Pasos en SSMS:

1. Abre **SQL Server Management Studio** y conéctate a tu servidor local.
2. Abre un **nuevo Query (consulta)**.
3. Copia y pega el contenido del archivo `Dispositivos.sql`.
4. Haz clic en el botón **Ejecutar** (o presiona `F5`).

## 📌 Estos pasos hará lo siguiente:

✅ Creará una base de datos llamado `GPS_DB`.
✅ Creará la tabla `Dispositivos`.
✅ Insertará algunos datos.
✅ Consultará dispositivos activos.
✅ Creará un procedimiento para actualizar el estado de un dispositivo.
✅ Ejecutará el procedimiento sobre un registro de ejemplo.
✅ Verificará los cambios.
✅ Finalmente una breve documentación al final del archivo `Dispositivos.sql` sobre como hacer un backup y restauracion parcial

---

✍️ **Autor:** _(Kevin Sierra Castro - Desarrollador Full Stack Multiplataforma)_
