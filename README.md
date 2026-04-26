# 💼 Salary Management System

A minimal yet production-quality Salary Management Tool built for managing and analyzing salary data for an organization with 10,000 employees.

---

## 🚀 Tech Stack

### Backend
- Ruby on Rails 8 (API mode)
- PostgreSQL
- RSpec (Testing)

### Frontend
- React (CRA)
- Tailwind CSS
- React Query (Data Fetching)
- Axios

---

## 🧠 Product Overview

This system is designed for an **HR Manager** to:

- Manage employee data (CRUD)
- Analyze salary distributions
- Filter and search employees efficiently
- Handle large datasets (10,000 employees)

---

## ✨ Features

### 👨‍💼 Employee Management
- Create, update, delete employees
- View paginated employee list
- Edit employee via unified form
- Highlight selected employee

### 🔍 Search & Filters
- Search employees by **name**
- Filter by:
  - Country
  - Job Title
- Debounced search for better UX

### 📊 Salary Insights
- Min / Max / Avg salary by country
- Avg salary by job title
- Clean UI dashboard for insights

### ⚡ Performance Optimizations
- Pagination (10 per page)
- Debounced API calls
- Indexed DB columns
- Efficient queries

### 🎨 UI/UX Enhancements
- Tailwind-based modern UI
- Toast notifications for actions
- Loading states
- Smooth interactions

---

## 🧱 Architecture

- RESTful Rails API
- Service layer (`SalaryInsightsService`)
- React frontend consuming APIs
- Separation of concerns maintained

---

## 🌱 Database Seeding

Generates 10,000 employees efficiently.

### Files Used:
- `first_names.txt`
- `last_names.txt`

### Run:

```bash
rails db:create
rails db:migrate
rails db:seed
```

## 🧪 Testing

Run all tests:
```
rspec
```

**Coverage**:
- Model specs
- Request specs
- Service tests


## ⚙️ Setup Instructions
**🔧 Backend Setup**
```

cd backend

bundle install

# Set environment variables
export DB_USERNAME=your_username
export DB_PASSWORD=your_password
export DB_HOST=localhost

rails db:create
rails db:migrate
rails db:seed

rails s
```
Runs on:
```http://localhost:3000```


**🎨 Frontend Setup**
```
cd frontend

npm install
```

Create ```.env``` file:
```
PORT=3001
```

Run:
```
npm start
```

Runs on:
```http://localhost:3001```

## 🔗 API Endpoints

**Employees**

- GET /api/v1/employees
- POST /api/v1/employees
- PUT /api/v1/employees/:id
- DELETE /api/v1/employees/:id

**Filters**
```
/employees?name=virendra
/employees?country=India
/employees?job_title=Engineer
```

**Insights**
```
/api/v1/insights/country
/api/v1/insights/job_title
```

## 🤖 AI Usage

AI tools (ChatGPT) were used to:

- Accelerate development
- Generate initial scaffolding
- Improve UI/UX decisions
- Optimize queries and performance
- Assist in writing test cases

All outputs were reviewed, refined, and validated manually.

## 📌 Development Approach
- Followed **TDD principles**
- Built incrementally with meaningful commits
- Focused on:
  - Clean code
  - Maintainability
  -  Performance
  - User experience
- 
## 📈 Scalability Considerations
- Supports 10,000+ employees
- Efficient pagination
- Indexed queries
- Optimized seed script


## 📝 Notes
- Backend and frontend run on separate ports
- CORS enabled for communication
- Designed with extensibility in mind


## 👨‍💻 Author
Virendra Jadhav