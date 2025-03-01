# User Management Application

A full-stack User Management System built with:

- **Backend**: Spring Boot (Java 21), PostgreSQL, Gradle  
- **Frontend**: React (Vite, Material UI)  
- **Containerization**: Docker with multi-stage build  

---

## 🚀 Features

- ✅ Create, update, delete users  
- ✅ View all users & fetch individual user details  
- ✅ Responsive UI with Material UI  
- ✅ Single deployment via Spring Boot serving React frontend  
- ✅ Optimized Docker multi-stage build  

---

## 📌 Project Structure

```text
user-management/
│── backend/ # Spring Boot backend (Java 21, PostgreSQL)
│── web/ # React frontend (Vite, Material UI)
│── Dockerfile # Multi-stage Docker build
│── README.md # Documentation
│── Makefile # simplify command with make
```

## 📌 Technologies Used

### Backend

- Java 21, Spring Boot
- PostgreSQL, Hibernate (JPA)
- Gradle (Build tool)
- Docker (Containerization)

### Frontend

- React (Vite)
- Material UI (Styling)
- Axios (API calls)
- React Router (Navigation)

## 📌 API Endpoints

### 🔹 User Management

| Method  | Endpoint            | Description            |
|---------|---------------------|------------------------|
| **GET**    | `/api/users`        | Get all users         |
| **GET**    | `/api/users/{id}`    | Get user by ID        |
| **POST**   | `/api/users`        | Create a new user     |
| **PUT**    | `/api/users/{id}`    | Update user by ID     |
| **DELETE** | `/api/users/{id}`    | Delete user by ID     |

## Deployment

```bash
- cd web
- npm run build

- cd backend
- ./gradlew build

- cp backend/build/libs/*SNAPSHOT.jar backend/build/libs/app.jar
- java -jar backend/build/libs/app.jar
```

## 📌 Future Enhancements

- 🔹 Authentication (JWT-based login)
- 🔹 User role-based access control
- 🔹 Pagination for users
