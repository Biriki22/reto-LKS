FROM node:22

WORKDIR /app

# Copiar solo package.json y package-lock.json para optimizar la caché de npm install
COPY package*.json ./

# Instalar Angular CLI y las dependencias
RUN npm install -g @angular/cli
RUN npm install

# Copiar todo el código después de instalar dependencias
COPY . .

# Exponer el puerto 4200 para Angular
EXPOSE 4200

# Ejecutar el servidor de Angular
CMD ["ng", "serve", "--host", "0.0.0.0"]
