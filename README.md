# TalentLoom Hackathon - Server

This is the backend server for the **TalentLoom** project --- built with **Node.js**, **Express**, and **MongoDB**.\
It handles authentication, APIs, and business logic for the application.

---

## Tech Stack

- **Node.js 20 (Alpine)**

- **Express 5** --- Fast and minimalist web framework

- **Mongoose** --- ODM for MongoDB

- **JWT (jsonwebtoken)** --- Secure authentication

- **bcrypt** --- Password hashing

- **dotenv** --- Environment configuration

- **CORS** --- Cross-origin support

---

## Getting Started

### 1\. Clone the repository

`git clone https://github.com/your-username/talentloom-server.git`

`cd talentloom-backend`

### 2\. Install dependencies

`npm install`

### 3\. Create a `.env` file

Create a `.env` file in the root directory with your environment variables.

Example:

`PORT=8000
MONGO_URI=mongodb+srv://<your-connection-string>
JWT_SECRET=your-secret-key`

---

## Run the Server (Locally)

`npm run dev`

Server will start at:

`http://localhost:8000`

---

## 🐳 Run with Docker

### 1\. Build the Docker image

`docker build -t talentloom-backend .`

### 2\. Run the container

`docker run -p 8000:8000 talentloom-backend`

Now your backend is running inside Docker at:

`http://localhost:8000`

## Notes

- The backend runs on **port 8000** by default.

- The project uses **Nodemon** in development mode for auto-restarts.

- Use `npm run dev` locally or the Docker setup for production-like environments.

---

## 👨‍💻 Author

**Prince Chaurasia**\
Backend Developer - Node.js | Express | MongoDB\
[LinkedIn](https://linkedin.com/in/your-link) - [GitHub](https://github.com/your-username)
