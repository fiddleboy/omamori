FROM node:8.15.1-alpine
RUN mkdir -p /app/omamori-server
WORKDIR /app/omamori-server
COPY ./package.* ./
RUN npm install
COPY ./ ./
CMD ["npm", "start"]
EXPOSE 3443