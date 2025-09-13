# Online Grocery Ordering System - Setup Guide

## Prerequisites
- Java 17 or higher
- Node.js 18 or higher
- MySQL 8.0
- Maven

## Backend Setup

1. **Database Setup**
   - Create a MySQL database named `grocery_app_db`
   - Update database credentials in `backend/src/main/resources/application.properties`

2. **Run Backend**
   ```bash
   cd backend
   mvn spring-boot:run
   ```
   - Backend will run on `http://localhost:8080`

## Frontend Setup

1. **Install Dependencies**
   ```bash
   cd frontend
   npm install
   ```

2. **Run Frontend**
   ```bash
   npm run dev
   ```
   - Frontend will run on `http://localhost:5173`

## Testing the Connection

1. Start the backend server first
2. Start the frontend development server
3. Navigate to `http://localhost:5173`
4. Try registering a new user or logging in with demo credentials

## Demo Accounts
- **Customer**: customer@grocery.com / password
- **Vendor**: vendor@grocery.com / password  
- **Admin**: admin@grocery.com / password

## API Endpoints
- **POST** `/auth/register` - User registration
- **POST** `/auth/login` - User login
- All other endpoints require JWT authentication

## Features Implemented
- ✅ User Registration with role selection
- ✅ User Login with JWT authentication
- ✅ Role-based routing (Customer, Vendor, Admin)
- ✅ CORS configuration for frontend-backend communication
- ✅ Protected routes with authentication
- ✅ Responsive UI with Tailwind CSS