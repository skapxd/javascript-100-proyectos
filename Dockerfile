# FROM mcr.microsoft.com/playwright:v1.50.0-jammy
FROM ubuntu:20.04

# Actualiza el sistema
RUN apt update && apt upgrade -y

# Instala herramientas necesarias
RUN apt install -y curl

# Agrega el repositorio de NodeSource y luego instala Node.js
RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
RUN apt install -y nodejs


WORKDIR /app

# Copia solo los archivos necesarios primero para cachear dependencias
COPY package.json ./
RUN npm install -g yarn
RUN yarn

# Copia el resto después de instalar dependencias
COPY . .

# Instala browsers y dependencias del sistema
RUN npx playwright install --with-deps chromium # firefox webkit

CMD ["yarn", "test:u"]