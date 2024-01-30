FROM node:18.19-alpine3.19
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install --production
COPY . .
EXPOSE 8000
CMD ["npm", "start"]

