# Chatty - Real-time MERN Chat Application (Backend)

A modern real-time chat application built with MERN stack (MongoDB, Express.js, React, Node.js) and enhanced with NestJS framework. This repository contains the backend codebase.

## 🌟 Features

- **Real-time Messaging**: Instant message delivery using Socket.IO
- **User Authentication**: Secure JWT-based authentication with cookie sessions
- **Image Sharing**: Support for image uploads in chat using Cloudinary
- **User Profiles**: Customizable user profiles with avatars
- **Responsive Design**: Works seamlessly across all devices
- **Role-based Access**: Support for user roles (user, admin)

## 🛠 Tech Stack

- **Framework**: [NestJS](https://nestjs.com/)
- **Database**: [MongoDB](https://www.mongodb.com/) with [Mongoose](https://mongoosejs.com/)
- **Real-time Communication**: [Socket.IO](https://socket.io/)
- **Authentication**: [Passport.js](http://www.passportjs.org/) with JWT
- **File Storage**: [Cloudinary](https://cloudinary.com/)
- **API Documentation**: Built-in Swagger/OpenAPI
- **Deployment**: [Vercel](https://vercel.com)

## 🚀 Quick Start

### Prerequisites

- Node.js >= 20.0.0
- npm >= 10.0.0
- MongoDB instance
- Cloudinary account

### Environment Variables

Create a `.env` file in the root directory:

```env
PORT=3000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
JWT_EXPIRE=7d
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

### Installation

1. Clone the repository:

```bash
git clone https://github.com/itzSerag/realtime_MERN_chatty-backend.git
cd realtime_MERN_chatty-backend
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run start:dev
```

The server will start on http://localhost:3000

## �� API Documentation

### Authentication Endpoints

- `POST /api/v1/auth/signup`: Register a new user
- `POST /api/v1/auth/login`: Login user
- `POST /api/v1/auth/logout`: Logout user

### User Endpoints

- `GET /api/v1/users`: Get all users
- `GET /api/v1/users/:id`: Get user by ID
- `PATCH /api/v1/users/:id`: Update user
- `DELETE /api/v1/users/:id`: Delete user
- `PATCH /api/v1/users/profile/updateImg`: Update profile image

### Message Endpoints

- `GET /api/v1/messages/history/:userId`: Get chat history with a user
- `POST /api/v1/messages`: Send a new message

## 🔌 WebSocket Events

- `connection`: Client connects to WebSocket server
- `newMessage`: New message event
- `disconnect`: Client disconnects from WebSocket server

## 🔗 Related Repositories

- Frontend Repository: [realtime_MERN_chatty-frontend](https://github.com/itzSerag/realtime_MERN_chatty-frontend)
- Live Demo: [Chatty App](https://realtime-mern-chatty-frontend.vercel.app)

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

- [@itzSerag](https://github.com/itzSerag)

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/itzSerag/realtime_MERN_chatty-backend/issues).

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
