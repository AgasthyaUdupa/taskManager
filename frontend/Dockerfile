# Stage 1: Build the React app with Vite
FROM node:18 AS builder

# Set the working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the project files
COPY . .

# Accept backend URL from build argument
ARG VITE_BACKEND_URL
ENV VITE_BACKEND_URL=$VITE_BACKEND_URL

# Build the app (Vite will use the env var)
RUN npm run build

# Stage 2: Serve the built app using Nginx
FROM nginx:alpine

# Copy the built app from the builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose the port Nginx will serve on
EXPOSE 80

# Run Nginx
CMD ["nginx", "-g", "daemon off;"]
