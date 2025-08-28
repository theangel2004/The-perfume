# Usamos una imagen ligera de nginx
FROM nginx:alpine

# Eliminamos los archivos HTML por defecto de nginx
RUN rm -rf /usr/share/nginx/html/*

# Copiamos todos los archivos del frontend (html, css, js, imagenes, etc.)
COPY . /usr/share/nginx/html

# Exponemos el puerto 80
EXPOSE 80

# Comando por defecto: iniciar nginx en primer plano
CMD ["nginx", "-g", "daemon off;"]
