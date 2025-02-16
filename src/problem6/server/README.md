# 📘 README: Express RESTful API

## How to Run the Application

1. **Install dependencies:**
   ```bash
   npm install
   ```
2. **Create file .env and configure database settings in `.env` file:**
   ```env
   DB_HOST=localhost
   DB_USER=root
   DB_PASS=
   DB_NAME=code-challenge
   DB_PORT=3306
   PORT=8080
   ```
3. **Initialize the database Ttble with sequelize-cli:**
   ```bash
   npx sequelize-cli db:migrate
   ```
4. **Start the application:**
   ```bash
   npm start
   ```
5. **Test the API:**
   Create Resource: POST /resources

List Resources : GET /resources

Get Resource Details: GET /resources/:id

Update Resource: PUT /resources/:id

Delete Resource: DELETE /resources/:id
