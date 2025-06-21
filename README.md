# Task Manager – Full Stack CRUD App



This is a full-stack task management application built with:

- **Frontend**: React (Vite)
- **Backend**: Spring Boot (Java)
- **Database**: PostgreSQL

## Project Structure

task-manager/
├── frontend/ → React + Vite
└── backend/ → Spring Boot API

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/Amine-UrMenToR/task-manager-fullstack.git
cd task-manager
```

### 2. Run the Frontend

```bash
cd frontend
npm install
npm run dev
```

Runs at: http://localhost:5173

### 3. Run the Backend

```bash
cd backend
./mvnw spring-boot:run
```

Backend runs at: http://localhost:8080

### 4. Configure PostgreSQL

Update backend/src/main/resources/application.properties with your own DB credentials:

spring.datasource.url=jdbc:postgresql://localhost:5432/task_db
spring.datasource.username=your_username
spring.datasource.password=your_password
spring.jpa.hibernate.ddl-auto=update

Make sure your PostgreSQL server is running.