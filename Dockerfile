FROM mcr.microsoft.com/playwright:v1.50.0-jammy

WORKDIR /app

# Copia solo los archivos necesarios primero para cachear dependencias
COPY package.json ./
RUN yarn

# Copia el resto después de instalar dependencias
COPY . .

# Instala browsers y dependencias del sistema
# RUN npx playwright install --with-deps chromium firefox webkit

CMD ["yarn", "test:u"]