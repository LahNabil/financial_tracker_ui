# Stage 1: Build Angular app

FROM node:20.9.0-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install --legacy-peer-deps
COPY . .
RUN npm run build --configuration=production

# Stage 2: Serve app with Nginx

FROM nginx:alpine
COPY --from=build /app/dist/budget-ui/browser /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80

