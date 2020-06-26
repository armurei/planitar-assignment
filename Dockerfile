# Build the wiki api
FROM golang:latest AS api_builder
ADD . /app
WORKDIR /app/md-wiki-api
RUN CGO_ENABLED=0 GOOS=linux go build -o main

# Build the wiki client
FROM node:alpine AS client_builder
COPY --from=api_builder /app/md-wiki-client ./
RUN npm install
RUN npm run build

# Build the reverse proxy, use as final production container
FROM nginx:alpine
COPY --from=api_builder /app/md-wiki-api/main main
COPY --from=client_builder /build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d
COPY start.sh start.sh
EXPOSE 8080
CMD ./start.sh
