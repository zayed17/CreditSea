# CreditSea

CreditSea is a full-stack application for managing and analyzing credit reports. It consists of a **frontend (React + Vite)** and a **backend (Node.js + Express + MongoDB)**.

## 🚀 Getting Started

### Prerequisites
Ensure you have the following installed:
- **Node.js** (LTS version recommended)
- **npm** or **yarn**
- **MongoDB** (Locally installed or a cloud database like MongoDB Atlas)

---

## 📂 Project Structure
```
CreditSea
│── client/  # Frontend (React + Vite)
│── server/  # Backend (Node.js + Express + MongoDB)
└── README.md
```

---

## 🛠 Setup Instructions

### 1️⃣ Backend Setup (`server/`)

#### 📌 Install dependencies
```sh
cd server
npm install
```

#### 🔑 Configure environment variables
Create a `.env` file inside `server/` and add:
```env
PORT=1717
MONGO_URL=mongodb://localhost:27017/creditsea
CORS_ORIGIN=http://localhost:5173
```

#### 🏃 Run the backend
```sh
npm start
```
The server will run on **http://localhost:1717**.

---

### 2️⃣ Frontend Setup (`client/`)

#### 📌 Install dependencies
```sh
cd client
npm install
```

#### 🔑 Configure environment variables
Create a `.env` file inside `client/` and add:
```env
VITE_API_BASE_URL=http://localhost:1717
```

#### 🏃 Run the frontend
```sh
npm run dev
```
The frontend will run on **http://localhost:5173**.

---

## 🎯 Features
✅ XML file upload & validation  
✅ Credit report processing & analysis  
✅ API endpoints for fetching reports  
✅ Responsive UI with charts & tables  

---

## 🤝 Contributing
Feel free to fork the repository and submit pull requests! 🚀

