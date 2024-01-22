FROM task-auth-backend-main-app

WORKDIR /app
COPY . .
RUN npm install

EXPOSE 8080
CMD ["npm", "start"]
