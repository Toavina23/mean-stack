FROM node:18.19-alpine3.19
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install 
COPY . .
RUN npm run build
WORKDIR /app/client
RUN npm install 
RUN npm run build
WORKDIR /app
EXPOSE 8000
CMD ["npm", "start"]

