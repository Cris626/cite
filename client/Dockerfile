FROM node:12.18.2

ENV CI=true

WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .

CMD ["npm", "start"]