# 💡 CodeBuddy

### 🧠 AI-Powered Interactive Learning & Interview Preparation Platform

---

## 🎯 Overview
**CodeBuddy** is an innovative platform designed to help developers prepare for technical interviews through **AI-powered voice interactions**, **interactive learning modules**, and **real-time feedback**.  
The platform provides an engaging and structured learning experience with tools such as **voice interviews**, **topic-based lessons**, **flashcard systems**, and **whiteboard challenges** to enhance both conceptual and practical skills.

---

## 🌟 Key Highlights
- 🎙️ **AI-Powered Voice Interviews** – Practice realistic technical interviews with instant AI feedback.  
- 📚 **Structured Learning Paths** – Master topics from beginner to advanced levels.  
- 🃏 **Smart Flashcards** – Reinforce knowledge using spaced repetition.  
- 🎨 **Interactive Whiteboard** – Solve coding problems visually.  

---

## ✨ Features

### 🎙️ Voice Interview System  
- **Multiple Domains** – Practice topics like JavaScript, Data Structures, Algorithms, and System Design.  
- **Difficulty Levels** – Progress through Easy, Medium, and Hard challenges.  

### 📚 Learning Management
- **Topic Categorization** – Organized by technology stacks and key concepts.  
- **Skill Assessment** – Identify strengths and weaknesses easily.  
- **Learning Paths** – Structured journeys from beginner to expert.  

### 🃏 Flashcard System
- **Spaced Repetition** – Learn effectively with scientifically optimized intervals.  
- **Multiple Decks** – Grouped by topic and difficulty.  
- **Confidence Rating** – Self-assess your comfort level per card.  

### 🎨 Whiteboard Challenges
- **Interactive Drawing** – Visualize problem-solving approaches.  
- **Real Coding Problems** – Practice with real interview-style challenges.  
- **Hint System** – Get guided hints when stuck.  

### 👤 User Management
- **Secure Authentication** – JWT-based user registration and login.  
- **Dashboard** – Customized experience for each user.  
- **Performance History** – Track your complete interview journey.  

---

## 🛠 Tech Stack

### 🖥️ Frontend
- **Framework:** Angular 16+  
- **Language:** TypeScript  
- **UI Components:** Angular Material  
- **State Management:** RxJS  
- **Styling:** CSS3 
- **Build Tool:** Angular CLI  

### ⚙️ Backend
- **Runtime:** Node.js  
- **Framework:** Express.js  
- **Authentication:** JWT, bcrypt  
- **Real-time Communication:** Socket.io  
- **API Documentation:** Gemini API/OpenAPI  

### 🗄️ Database
- **Primary Database:** MongoDB (MongoDB compass)  

### 🔗 External Services
- **AI Integration:** Google Gemini AI  
- **Speech Processing:** Web Speech API  

### ☁️ Deployment
- **Frontend:** Netlify  
- **Backend:** Render  
- **Database:** MongoDB Atlas  
- **CI/CD:** GitHub Actions  

---

## 🚀 Quick Start

### 🔧 Prerequisites
- Node.js 18+  
- MongoDB (local or Atlas)  
- Angular CLI 16+

### 🧩 Installation Steps

#### 1️⃣ Clone the Repository
```bash
git clone https://github.com/ashhwiithac22/CodebuddyApp.git
cd CodebuddyApp
```
#### 2️⃣ Backend Setup
```bash
cd backend
npm install

# Create environment file
cp .env.example .env
# Edit .env with your configurations

# Start backend server
npm run dev
```
3️⃣ Frontend Setup
```bash
cd frontend
npm install
ng serve -o
```
4️⃣ Access the Application

Frontend: http://localhost:4200

Backend API: http://localhost:5000

### 🔐 Environment Variables

##### Backend (.env)
```
MONGODB_URI=mongodb://localhost:27017/codebuddy
JWT_SECRET=your-jwt-secret-key
GEMINI_API_KEY=your-gemini-api-key
PORT=5000
NODE_ENV=development
```
### 📚 API Endpoints

Document the most important API routes for quick reference.

## 🔐 Authentication
Method	Endpoint	Description
- POST	/api/auth/register	 - Register a new user
- POST	/api/auth/login	User - login
- GET	/api/auth/profile      - 	Get user profile

## 🎙️ Interview System
Method	Endpoint	Description
- POST	/api/interview/start	  - Start new interview
- POST	/api/interview/response	- Submit answer
- GET	/api/interview/history	  - View previous interviews

## 🃏 Flashcards
Method	Endpoint	Description

- GET	/api/flashcards/decks	    -  Get all decks
- POST	/api/flashcards/progress	 - Update progress

---
### 🌐 Live Demo
**Backend (Render):** [https://codebuddy-backend-oind.onrender.com/](https://codebuddy-backend-oind.onrender.com/)

