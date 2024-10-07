# Usa uma imagem oficial do Node.js
FROM node:20

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copia o package.json e o package-lock.json (se existir) para o diretório de trabalho
COPY package*.json ./

# Instala as dependências do projeto
RUN npm install

# Copia o código do projeto para o diretório de trabalho
COPY . .

# Gera o Prisma Client com os binários corretos
RUN npx prisma generate

# Compila o código TypeScript
RUN npm run build

# Expõe a porta que o NestJS irá rodar (ajuste se for outra porta)
EXPOSE 3333

# Comando para iniciar o servidor NestJS
CMD ["npm", "run", "start:prod"]