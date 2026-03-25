# Backend Setup & Troubleshooting

## Prerequisites
- Node.js >= 18
- MySQL Server running
- Database created

## Setup Steps

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Create Database
```bash
mysql -u root -p
CREATE DATABASE hospital_management_system;
EXIT;
```

### 3. Import Database Schema
```bash
mysql -u root -p hospital_management_system < schema/table.sql
```

### 4. Configure .env
Make sure `.env` file has correct values:
```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=hospital_management_system
PORT=3001
SECRET_KEY=your_secret_key
TOKEN_EXPIRY=30d
FRONTEND_URL=http://localhost:5173
ADMIN_URL=http://localhost:5174
```

### 5. Start Backend
```bash
npm run dev
```

## Common Issues & Fixes

### Issue: "Database connection failed"
**Solution:**
1. Check if MySQL is running
2. Verify DB credentials in .env
3. Ensure database exists: `mysql -u root -p -e "SHOW DATABASES;"`
4. Check if port 3001 is available

### Issue: "Cannot find module"
**Solution:**
```bash
rm -rf node_modules package-lock.json
npm install
```

### Issue: "EADDRINUSE: address already in use :::3001"
**Solution:**
- Kill process on port 3001 or change PORT in .env

### Issue: "Table doesn't exist"
**Solution:**
```bash
mysql -u root -p hospital_management_system < schema/table.sql
```

## Verify Backend is Working
- Open browser: http://localhost:3001/api/doctors
- Should return JSON with doctors data or empty array
