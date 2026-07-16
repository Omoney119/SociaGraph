# SociaGraph Setup Guide

## Prerequisites

- Node.js v14+ and npm
- MongoDB running locally or remote connection string
- Git

## Backend Setup

1. Navigate to backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create `.env` file:
   ```bash
   cp .env.example .env
   ```

4. Update `.env` with your MongoDB URI and JWT secret:
   ```
   MONGODB_URI=mongodb://localhost:27017/sociagraph
   JWT_SECRET=your-secret-key
   PORT=5000
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

## Frontend Setup

1. Navigate to frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

The app will open at `http://localhost:3000`

## API Endpoints (To Be Implemented)

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user

### Posts
- `GET /api/posts` - Get all posts
- `POST /api/posts` - Create a new post
- `GET /api/posts/:id` - Get single post
- `PUT /api/posts/:id` - Update post
- `DELETE /api/posts/:id` - Delete post
- `POST /api/posts/:id/like` - Like a post
- `POST /api/posts/:id/comment` - Add comment

### Users
- `GET /api/users/:id` - Get user profile
- `PUT /api/users/:id` - Update user profile
- `POST /api/users/:id/follow` - Follow user
- `POST /api/users/:id/unfollow` - Unfollow user

## Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running
- Check your MONGODB_URI in .env

### CORS Error
- Backend CORS is configured to accept all origins by default
- Update CORS configuration in production

### Port Already in Use
- Change PORT in .env file
- Or kill the process using the port
