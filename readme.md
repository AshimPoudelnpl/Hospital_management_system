# 🏥 Hospital Management System

A full-stack hospital management system with a public-facing frontend, an admin dashboard, and a REST API backend.

---

## 📁 Project Structure

```
Holspital management system/
├── frontend/       # Public-facing React app
├── Admin/          # Admin dashboard React app
└── backend/        # Node.js + Express REST API
```

---

## 🛠 Tech Stack

### Frontend & Admin
- React 19
- React Router DOM v7
- Redux Toolkit
- Tailwind CSS v4
- React Toastify
- Vite

### Backend
- Node.js + Express v5
- MySQL2
- JWT Authentication
- Bcryptjs
- Multer (file uploads)
- Dotenv

---

## 🚀 Getting Started

### Prerequisites
- Node.js >= 18
- MySQL

### 1. Clone the repository
```bash
git clone <repo-url>
cd "Holspital management system"
```

### 2. Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` folder:
```env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=hospital_db
JWT_SECRET=your_jwt_secret
```

Import the database schema:
```bash
mysql -u root -p hospital_db < backend/schema/table.sql
```

Start the backend:
```bash
npm run dev
```

### 3. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

### 4. Admin Setup
```bash
cd Admin
npm install
npm run dev
```

---

## 📌 API Endpoints

| Resource       | Base Route           |
|----------------|----------------------|
| Auth           | `/api/auth`          |
| Doctors        | `/api/doctors`       |
| Departments    | `/api/departments`   |
| Services       | `/api/services`      |
| Appointments   | `/api/appointments`  |
| Notices        | `/api/notices`       |
| Contacts       | `/api/contacts`      |

---

## 📄 Database Tables

- `users` — Admin users
- `doctors` — Doctor profiles with department reference
- `departments` — Hospital departments
- `department_services` — Services per department
- `services` — General hospital services
- `appointments` — Patient appointments
- `contacts` — Contact form submissions
- `notices` — Hospital notices

---

## 🌐 Frontend Pages

| Path                | Page              |
|---------------------|-------------------|
| `/`                 | Home              |
| `/doctors`          | Doctors           |
| `/departments`      | Departments       |
| `/specialists`      | Specialists       |
| `/services`         | Services          |
| `/about`            | About             |
| `/contact`          | Contact           |
| `/book-appointment` | Book Appointment  |
| `/notice`           | Notices           |

---

## 🔐 Admin Dashboard Routes

| Path                  | Page            |
|-----------------------|-----------------|
| `/admin/dashboard`    | Dashboard       |
| `/admin/doctors`      | Doctors         |
| `/admin/departments`  | Departments     |
| `/admin/services`     | Services        |
| `/admin/appointments` | Appointments    |
| `/admin/notices`      | Notices         |
| `/admin/contacts`     | Contacts        |
| `/admin/profile`      | Profile         |

---

## 📂 Uploads

Uploaded images are stored in `backend/uploads/`:
- `uploads/doctors/`
- `uploads/Departments/`
- `uploads/services/`

---

## 📝 License

MIT
