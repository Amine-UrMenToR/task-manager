# Task Manager – Full-Stack CRUD App

A simple task management application built with:

- **Frontend**: React (Vite)  
- **Backend**: Spring Boot (Java)  
- **Database**: PostgreSQL  
- **Migrations**: Flyway  
- **Containerization**: Docker & Docker Compose  

---

## Features

- User registration & authentication  
- Create, read, update, delete tasks  
- JWT-based security  
- Automatic schema migrations via Flyway  

---


## Project Structure

task-manager/
├── docker-compose.yml        # Dev-time compose
├── frontend/                 # React + Vite SPA
    Dockerfile                # Frontend image
├── backend/                  # Spring Boot REST API
    Dockerfile                # Backend image
    src/
    src/main/resources/
        application.properties
        db/migration/         # Flyway migrations
└── README.md

---

## 🔧 Prerequisites

- [Node.js ≥ 18](https://nodejs.org/)  
- [Java 21 JDK](https://jdk.java.net/21/)  
- [Maven 3.9+](https://maven.apache.org/)  
- [PostgreSQL](https://www.postgresql.org/) (or Docker)  
- [Docker & Docker Compose](https://docs.docker.com/compose/)


##  Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/Amine-UrMenToR/task-manager.git
cd task-manager
```

### 2. Start PostgreSQL

```bash
psql -U your_username -c "CREATE DATABASE task_db;"
```

### 3. Backend

Edit backend/src/main/resources/application.properties:

```bash
spring.datasource.url=jdbc:postgresql://localhost:5432/task_db
spring.datasource.username=your_username
spring.datasource.password=your_password
spring.jpa.hibernate.ddl-auto=update
```

then 

```bash
cd backend
mvn clean spring-boot:run
```

Backend runs at: http://localhost:8080

### 4. Frontend

```bash
cd ../frontend
npm install
npm run dev
```

SPA → http://localhost:5173


## Running with Docker Compose

Everything bundled—no local installs needed (just Docker) :

### 1. Clone & cd

```bash
git clone https://github.com/Amine-UrMenToR/task-manager.git
cd task-manager
```

### 2. Start all services

```bash
docker-compose up --build
```

Postgres ← localhost:5432

Backend ← localhost:8080

Frontend ← localhost:4173

### 3. Shutdown

```bash
docker-compose down
```


## Database Migrations

All schema changes live in backend/src/main/resources/db/migration as Flyway scripts:

- V1__init_schema.sql – initial tables
- Future migrations → V2__…, V3__…, etc.

Flyway runs automatically on startup.

## License

© Amine-UrMenToR