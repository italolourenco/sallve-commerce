FROM node:12-alpine
WORKDIR /user/app
COPY . ./
RUN npm install
EXPOSE 5000
CMD ["npm", "start"]