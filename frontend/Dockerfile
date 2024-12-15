# Use an Nginx image to serve the static files
FROM nginx:alpine

# Copy the custom nginx.conf
COPY nginx.conf /etc/nginx/nginx.conf

# Copy the build files into the Nginx HTML directory
COPY dist /usr/share/nginx/html

# Expose port 3000
EXPOSE 5173

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
