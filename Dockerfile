FROM mcr.microsoft.com/playwright:v1.50.0-jammy

WORKDIR /app

COPY package.json ./
RUN yarn

COPY . .
