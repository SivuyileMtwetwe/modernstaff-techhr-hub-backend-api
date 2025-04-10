# ModernStaff TechHR Hub - Backend API

A comprehensive HR management system backend API built with Node.js, Express, and MySQL.

## Features

- 👤 Authentication & Authorization
- 👥 Employee Management
- 📊 Attendance Tracking
- 📅 Leave Management
- 💰 Payroll Processing
- 🔐 Role-based Access Control (Admin/Employee)

## Tech Stack

- Node.js & Express
- MySQL for primary database
- MongoDB for user authentication
- JWT for session management
- bcrypt for password hashing

## Project Structure

```
├── config/
│   └── db.js              # Database configuration
├── middleware/
│   └── authMiddleware.js  # Authentication middleware
├── models/
│   └── user.js           # MongoDB user model
├── routes/
│   ├── attendance.js     # Attendance endpoints
│   ├── auth.js          # Authentication endpoints
│   ├── employees.js     # Employee management endpoints
│   ├── leave.js         # Leave management endpoints
│   └── payroll.js       # Payroll endpoints
├── scripts/
│   ├── generatePassword.js # Password generation utility
│   ├── generateUsers.js    # Bulk user creation script
│   └── syncEmployees.js    # Database sync script
├── sql/
│   └── project_db.sql     # Database schema and initial data
├── utils/
│   └── payslip.js         # Payslip generation utility
├── .env.example           # Environment variables template
├── .gitignore
├── package.json
├── server.js             # Application entry point
└── vercel.json          # Vercel deployment configuration
```

## Prerequisites

- Node.js (v14 or higher)
- MySQL Server
- MongoDB Server
- npm or yarn

## Environment Variables

Create a `.env` file with the following variables:

```
PORT=5000
JWT_SECRET=your_jwt_secret
DB_HOST=localhost
DB_USER=your_mysql_user
DB_PASSWORD=your_mysql_password
DB_NAME=your_database_name
MONGO_URI=your_mongodb_connection_string
```

## Database Setup

1. Create MySQL database:
```sql
CREATE DATABASE your_database_name;
```

2. Import schema:
```bash
mysql -u your_user -p your_database_name < sql/project_db.sql
```

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd modernstaff-techhr-hub-backend-api
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

## API Endpoints

### Authentication
- `POST /api/auth/login` - User login

### Employees
- `GET /api/employees` - Get all employees (Admin only)
- `GET /api/employees/:id` - Get single employee
- `POST /api/employees` - Add new employee (Admin only)
- `PUT /api/employees/:id` - Update employee (Admin only)
- `DELETE /api/employees/:id` - Delete employee (Admin only)

### Attendance
- `POST /api/attendance` - Record attendance
- `GET /api/attendance/:employee_id` - Get attendance records

### Leave
- `POST /api/leave` - Submit leave request
- `GET /api/leave/:employee_id` - Get leave records

### Payroll
- `POST /api/payroll` - Generate payroll (Admin only)

## Utility Scripts

### Generate Users
```bash
node scripts/generateUsers.js
```

### Sync Employees
```bash
node scripts/syncEmployees.js
```

### Generate Password Hash
```bash
node scripts/generatePassword.js
```

## Deployment

The project is configured for deployment on Vercel using the `vercel.json` configuration file.

## Security Features

- Password hashing using bcrypt
- JWT-based authentication
- Role-based access control
- Secure database connections
- Input validation and sanitization

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License.