FROM node:14

ENV CI=true

WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .

CMD ["npm", "start"]