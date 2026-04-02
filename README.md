# LetterCraft AI

An AI-powered full-stack web application that generates professional letters and emails in seconds using Google Gemini AI.

---

## 🚀 Live Deployment

- **LINK:** https://lettercraftai-frontend.onrender.com 

👉 Try it live and generate letters instantly!

---

## Features

- AI-generated professional letters across different categories
- JWT-based authentication (signup, login, logout)
- Save and manage letter history with delete support
- 3 tone options — formal, friendly, confident
- Clean dark-themed responsive UI

## Letter Types Supported

- Cover letter
- Internship request
- Thank you email
- Resignation letter
- Follow-up email
- Offer acceptance letter

---

## Tech Stack

**Frontend**
- React (Vite)
- Tailwind CSS
- Axios
- React Router DOM

**Backend**
- Node.js
- Express.js
- MongoDB (Mongoose)
- JSON Web Tokens (JWT)
- Bcrypt.js

**AI**
- Google Gemini API (`gemini-3-flash-preview`)

---

## Getting Started

### Prerequisites
- Node.js installed
- MongoDB running locally
- Gemini API key from [aistudio.google.com](https://aistudio.google.com)

### Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file:

```env
PORT=8080
MONGO_URI=mongodb://localhost:27017/lettercraft
JWT_SECRET=your_secret_key
GEMINI_API_KEY=your_gemini_api_key
```

Start the server:

```bash
npm run dev
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Open `http://localhost:5173`

---

## API Endpoints

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/user/register` | Register new user | No |
| POST | `/api/user/login` | Login user | No |
| POST | `/api/ai/generate` | Generate letter | Yes |
| GET | `/api/history/letter` | Get all letters | Yes |
| DELETE | `/api/history/letter/:id` | Delete a letter | Yes |

---

## Project Structure

```
LetterCraftAI/
├── backend/
│   ├── Config/
│   ├── Controllers/
│   ├── Middlewares/
│   ├── Models/
│   ├── Routes/
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── pages/
│   │   │   ├── Landing.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Signup.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Generate.jsx
│   │   │   └── History.jsx
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── index.html
└── README.md
```

---

## Environment Variables

| Variable | Description |
|----------|-------------|
| `PORT` | Backend server port |
| `MONGO_URI` | MongoDB connection string |
| `JWT_SECRET` | Secret key for JWT signing |
| `GEMINI_API_KEY` | Google Gemini API key |

---
