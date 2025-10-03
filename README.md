# The perfume v.0.1 
Proyecto de ejemplo que combina **frontend estático**, **backend con Express + MongoDB** y **orquestación con Docker Compose**.

## 📂 Estructura del proyecto
The-perfume/
│── backend/ # API con Express y conexión a Mongo
│ ├── models/ # Modelos de MongoDB
│ ├── routes/ # Rutas de la API
│ ├── controllers/ # Controladores de negocio
│ └── Dockerfile
│
│── frontend/ # Sitio estático con Nginx
│ ├── index.html
│ ├── styles.css
│ ├── script.js
│ ├── img/
│ └── Dockerfile
│
│── docker-compose.yml # Orquestación de frontend, backend y Mongo
│── README.md

### 1. Clonar el repositorio
```bash
git clone https://github.com/tuUsuario/The-perfume.git o busca donde diga clonar 
cd The-perfume

### 🚀 Cómo ejecutar el proyecto
sudo docker compose up --build importante no tener el docker -compese antiguo sino el actualizado 
tener docker compose instalado 

Frontend → http://localhost:3000

Backend (API) → http://localhost:5000

MongoDB → puerto 27017
como ingresar al contenedor de mongol para ver los registros en la base  de datos
docker exec -it mongol sh

