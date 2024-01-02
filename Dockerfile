FROM task-auth-backend-main_app

WORKDIR /frontend
COPY . .
RUN npm install

EXPOSE 8080
CMD ["npm", "start"]
