# Social Media App 🚀

A full-featured, production-level social media web application built with **MERN stack**.  
It includes realtime chat, video calls, notifications, infinite scrolling, and more — essentially a startup-level social platform.

---

## 🌟 Live Demo

- https://app-wine-nine.vercel.app/
  

---

## 🛠 Tech Stack

**Frontend**: React, Tailwind CSS, React Router, Socket.io-client  
**Backend**: Node.js, Express, MongoDB, Socket.io  
**Authentication**: JWT, bcrypt  
**Deployment**: Vercel (Frontend), Render (Backend)  
**Database**: MongoDB Atlas  

---

## 🔥 Features

### Authentication & User Management
- Signup / Login / Logout  
- Reset password via email  
- JWT based authentication with refresh tokens  
- User profile with bio, profile photo, and cover photo  

### Social Features
- Create, edit, delete posts  
- Add images and videos to posts  
- Like / unlike posts with user list display  
- Add hashtags to posts for searchability  
- Save / bookmark posts for later  
- Infinite scrolling feed for a smooth experience  
- Nested comments with edit/delete and like functionality  
- Post privacy options (Public / Friends / Only Me)  
- Trending posts feed based on likes/comments  

### Friends & Social Connections
- Send/accept friend requests  
- Remove friends  
- Friends list and followers display  

### Realtime Chat & Video
- Private chat with friends  
- Typing indicator  
- Read receipts  
- Online/offline status  
- Video call functionality using WebRTC & Socket.io  

### Notifications
- Real-time notifications for likes, comments, friend requests, messages, and video calls  
- Mark notifications as read/unread  
- Grouped notifications for multiple actions  

### Search & Discovery
- Search users, posts, hashtags  
- Filter results by category  

### UI & UX Enhancements
- Responsive design (mobile + desktop)  
- Dark mode support  
- Skeleton loaders for posts, comments, and chat  
- Optimistic updates for likes/comments  
- Empty and error states for a polished experience  

### Security & Best Practices
- Password hashing with bcrypt  
- Input sanitization to prevent XSS  
- Rate limiting for API requests  
- Protected routes with role-based access  

### Optional / Advanced Features
- Analytics dashboard for admin (total users, posts, activity)  
- Content moderation system (report posts/users, admin actions)  
- Recommendation algorithm for feed ranking  
- Trending hashtags and posts  

---

<img width="1919" height="951" alt="image" src="https://github.com/user-attachments/assets/a8fa69f4-a2b3-4024-a12b-faccdc289f83" />
<img width="1902" height="994" alt="image" src="https://github.com/user-attachments/assets/59cb54c5-677e-444d-a0f4-264e7ebfa1e1" />
<img width="1599" height="937" alt="image" src="https://github.com/user-attachments/assets/2b63b1b9-f26a-46ab-9d78-f854a9ab17d1" />
<img width="1899" height="948" alt="image" src="https://github.com/user-attachments/assets/6e3cf136-dd50-42d5-83b1-8b973e45b96f" />


💻 Installation

Clone the repo:

git clone https://github.com/aabhushanCD/App.git

Install dependencies:

cd frontend
npm install
cd ../backend
npm install

Create .env files for frontend and backend with:

Backend

CLIENT_URL_1="http://localhost:5173"
PORT=8000
NODE_ENV="development"
MONGO_URI=""
JWT_SECRET=""
API_KEY="" //cloudinary
API_SECRET_KEY="" //cloudinary
CLOUD_NAME="dbc4r053t"


Frontend

REACT_APP_API_URL=your_backend_url

Run the project locally:

cd backend
npm run dev
cd ../frontend
npm start
🚀 Deployment

Frontend deployed on Vercel.

Backend deployed on Render

Database hosted on MongoDB Atlas



📈 Future Improvements

Stories feature like Instagram/Facebook

AI-powered post caption suggestions

More advanced feed ranking algorithm

Admin analytics dashboard with real-time stats

Improved video call experience



📌 Contributing

This is a personal project. Contributions are welcome — please create an issue or pull request.



