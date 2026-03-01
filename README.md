# 💰 Personal Expense & Income Tracker – Frontend

Frontend for the Personal Expense & Income Tracker assignment.

Built with:
- React (Vite)
- Tailwind CSS
- Axios
- JWT Authentication (session-based)

## 🚀 Features
- User Registration
- User Login
- JWT Authentication (sessionStorage)
- Protected Dashboard
- Add Income / Expense
- Update Transaction
- Delete Transaction
- Real-time Balance Calculation
- Responsive UI (Mobile Friendly)
- Automatic logout on token expiry (401 handling)


## 📂 Folder Structure
src/
│
├── api/
│ └── axios.js
│
├── context/
│ └── AuthContext.jsx
│
├── pages/
│ ├── Login.jsx
│ ├── Register.jsx
│ └── Dashboard.jsx
│
├── components/
│ ├── Navbar.jsx
│ ├── ExpenseForm.jsx
│ └── ExpenseList.jsx
│
├── routes/
│ └── ProtectedRoute.jsx
│
├── App.jsx
└── main.jsx

## ⚙️ Setup Instructions

### 1️⃣ Clone repository

```bash
git clone <frontend-repo-url>
cd frontend

2️⃣ Install dependencies
npm install

3️⃣ Start development server
npm run dev

App runs at:
http://localhost:5173

🔗 Backend Configuration
Backend base URL is configured in:
src/api/axios.js

Default:
baseURL: "http://127.0.0.1:8000"
Update if backend runs elsewhere.

🔐 Authentication Flow
User logs in
Backend returns JWT token
Token stored in sessionStorage
Axios interceptor attaches:
Authorization: Bearer <token>
On 401 error → auto logout → redirect to login

🎨 UI
Tailwind CSS
Clean and minimal
Mobile responsive
Inline edit support
Confirmation before delete
Alerts for success/error
