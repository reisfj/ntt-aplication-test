# Use uma imagem Node.js como base
FROM node:16

# Defina o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copie os arquivos necessários para o contêiner
COPY package.json .
COPY package-lock.json .

# Instale as dependências
RUN npm install

# Copie todo o código-fonte para o contêiner
COPY . .

# Exponha a porta do servidor da sua aplicação NestJs
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["npm", "run", "start:dev"]
