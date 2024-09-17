# Todos App with Express.js & React

**Todos App** is a task management application that allows users to create, edit, and delete tasks. Users can also filter tasks based on their status (completed, incomplete). The application includes user registration and login functionalities, with authentication handled via JWT (JSON Web Token).

![Express.js](https://img.shields.io/badge/Express.js-4.x-green)
![React](https://img.shields.io/badge/React-18.x-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-4.x-3178C6)
![MIT License](https://img.shields.io/badge/License-MIT-green)

## 📑 Table of Contents

- [✨ Features](#-features)
- [🛠 Technologies Used](#-technologies-used)
- [🔧️ Prerequisites](#️-prerequisites)
- [⚙️ Installation](#️-installation)
- [🚀 Usage](#-usage)
- [🔐 Environment Variables](#-environment-variables)
- [🗃️ Database Setup](#️-database-setup)
- [📸 Screenshots](#-screenshots)
- [🌐 Live Demo](#-live-demo)
- [📄 License](#-license)

## ✨ Features

- **Todo Management**: Create, edit, and delete tasks.
- **Filtering**: Filter tasks by their status (completed or incomplete).
- **Authentication**: Register and log in to manage your todos using JWT authentication.
- **API & Authentication**: The API and authentication are both handled by Express.js.
- **Responsive Interface**: Application optimized for all screen sizes.
- **Secure API**: Uses JWT to protect routes.

## 🛠 Technologies Used

This project uses the following technologies:

### 🧩 Framework

- **[Express.js](https://expressjs.com/)**: Backend framework to create the REST API and handle authentication via JWT.
- **[React](https://reactjs.org/)**: Frontend framework for building a reactive user interface.

### 🔗 Backend

- **[TypeScript](https://www.typescriptlang.org/)**: Static typing for JavaScript.
- **[Mongoose](https://mongoosejs.com/)**: Database modeling and management with MongoDB.
- **[Passport.js](http://www.passportjs.org/)**: Middleware for JWT-based authentication.
- **[Express-Validator](https://express-validator.github.io/)**: Server-side data validation.

### 🎨 Frontend

- **[TailwindCSS](https://tailwindcss.com/)**: Utility-first CSS framework for styling.
- **[React Hook Form](https://react-hook-form.com/)**: Form management and validation on the frontend.
- **[Zod](https://zod.dev/)**: Schema validation on the client-side.
- **[Shadcn](https://shadcn.dev/)**: Custom UI components.
- **[React Router Dom](https://reactrouter.com/)**: Routing for navigation within the application.

## 🔧️ Prerequisites

- Node.js >= 14.x
- npm or yarn
- MongoDB Atlas or a local MongoDB server

## ⚙️ Installation

To install the application locally:

1. Clone the repository:

   ```bash
   git clone https://github.com/jeremnds/todo.git
   cd todo
   ```

2. Install dependencies for both backend and frontend:

   ```bash
   cd backend && npm install
   cd ../frontend && npm install
   ```

3. Set up the environment variables using the `.env.example` files as reference:

   ```bash
   cp backend/.env.example backend/.env
   cp frontend/.env.example frontend/.env
   ```

4. Start the backend server:

   ```bash
   cd backend
   npm run dev
   ```

5. Start the frontend server:

   ```bash
   cd frontend
   npm run dev
   ```

The app will be accessible at `http://localhost:5173` for the frontend and `http://localhost:5000` for the API.

## 🚀 Usage

### Example command to build the project for production:

```bash
npm run build
```

### Start the server in production:

```bash
npm run start
```

## 🔐 Environment Variables

The project uses the following environment variables to configure the database and secret keys. These should be set in the `.env` file:

### Backend

```plaintext
MONGODB_URI=<your-mongodb-uri>
SECRET_KEY=<your-secret-key>
FRONT_URL=http://localhost:5173
NODE_ENV=development
```

### Frontend

```plaintext
VITE_BACKEND_URL=http://localhost:5000
```

## 🗃️ Database Setup

The application uses **MongoDB** to store user and todo data. Mongoose models are used to define the data schema.

### Setup Steps:

1. Create a MongoDB database using MongoDB Atlas or a local server.
2. Ensure that the MongoDB connection URI is set correctly in the backend `.env` file.
3. Migrations are handled automatically upon the first data insertion, so no manual action is required.

## 📸 Screenshots

### 1. Login Page

![Login Page](https://i.imgur.com/M9XsGf7.png)

### 2. Register Page

![Register Page](https://i.imgur.com/SSJhOa9.png)

### 3. Todos Page

![Todos Page](https://i.imgur.com/QRDRic9.png)

## 🌐 Live Demo

Check out the live version of the application:  
[Live Demo](https://todo-flame-one.vercel.app/)

**Test Account**:  
If you want to test the application without creating an account, you can use the following credentials:  
**Username**: `jeremy`  
**Password**: `12345`

## 📄 License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for more details.
