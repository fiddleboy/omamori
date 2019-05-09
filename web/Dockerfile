FROM node:8.15.1-alpine as builder
RUN mkdir -p /app/omamori-web
WORKDIR /app/omamori-web
COPY ./package.* ./
RUN npm install
COPY ./ ./
CMD ["npm", "start"]
EXPOSE 3000
#RUN npm run build
#FROM nginx
#COPY --from=builder /app/omamori-web/build /usr/share/nginx/html
#EXPOSE 80