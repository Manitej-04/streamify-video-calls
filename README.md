# Streamify 🎥💬
A real-time video conferencing and chat web application built using React and Stream SDKs.

## 🚀 Features
- 🔴 Real-time video calling between users
- 💬 Instant messaging with private chat support
- 🔐 Secure user authentication and routing
- 🎨 Light/Dark theme toggle with Zustand state management
- 🌐 LAN-based cross-device access using `vite --host`

## 🛠️ Tech Stack
- **Backend**: Express and NodeJs
- **Frontend**: React, Vite, Tailwind CSS
- **Database**: MongoDB
- **State Management**: Zustand
- **Streaming/Chat SDK**: [Stream Video](https://getstream.io/video/) and [Stream Chat](https://getstream.io/chat/)
- **Routing**: React Router v6

## 📷 Screenshots
### 🏠 Home Page
<img src="https://github.com/Manitej-04/streamify-video-calls/blob/main/pics/HomePage.png?raw=true" alt="Home Page" width="600"/>

### 💬 Chat Page
<img src="https://github.com/Manitej-04/streamify-video-calls/blob/main/pics/Chatpage.png?raw=true" alt="Chat Page" width="600"/>

## 🚀 Deployment

This project is deployed on [Render]([https://render.com/](https://streamify-video-calls-h4ml.onrender.com/)), a free hosting service for full-stack apps.

### 🔧 Steps for Deployment on Render:

1. Push your project to GitHub.
2. Go to [Render Dashboard](https://dashboard.render.com/) and click **New > Web Service**.
3. Connect your GitHub repo and select the branch.
4. Set your build and start commands:
5. Add environment variables (from your `.env` file):
6. Click **Deploy** and wait for the build to complete.
7. Once deployed, you'll get a unique Render URL (e.g., `https://streamify-video-calls.onrender.com`).

### 🔗 Live Demo  
👉 [https://streamify-video-calls.onrender.com]([https://streamify-video-calls.onrender.com](https://streamify-video-calls-h4ml.onrender.com/login))


## 🧪 Getting Started

### Prerequisites
- Node.js and npm
- A [Stream API key & secret](https://getstream.io/dashboard/)

### Installation
```bash
git clone https://github.com/Manitej-04/streamify.git
cd streamify
npm install
