# Salary Management System

This project is a minimal yet functional salary management tool built for an organization with 10,000 employees.

## 🚀 Tech Stack

- Backend: Ruby on Rails (API mode)
- Frontend: React
- Database: PostgreSQL
- Testing: RSpec

---

## 🧠 Architecture

- RESTful API built using Rails
- Business logic handled via Service Layer (`SalaryInsightsService`)
- React frontend consuming APIs

---

## 📦 Features

### Employee Management
- Create, update, delete employees
- View employee list
- Filter by country and job title

### Salary Insights
- Min, max, average salary by country
- Average salary by job title
- Department-wise salary insights

---

## ⚡ Performance Considerations

- Used `insert_all` for seeding 10,000 employees
- Indexed important fields (email, country, job_title)
- Avoided N+1 queries

---

## 🌱 Seeding Data

- Employee names are generated using:
  - `first_names.txt`
  - `last_names.txt`
- Emails are generated uniquely using SecureRandom

Run:
```bash
rails db:seed
```

## 🧪 Testing

Run all tests:

```
rspec
```
- Model tests
- Service tests
- Request specs

## 🤖 AI Usage

AI tools (ChatGPT) were used to:

- Generate initial test cases
- Explore architectural decisions
- Improve seed performance
- Scaffold API structure

All generated code was reviewed, refined, and validated manually.

## ▶️ Run Project
**Backend**
```
rails s
```

**Frontend**
```
npm start
```


## Notes
- Followed TDD approach
- Used service layer for clean architecture
- Focused on performance and scalability