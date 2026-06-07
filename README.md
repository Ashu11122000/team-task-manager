# Team Task Manager API

A backend REST API for managing projects and tasks, inspired by tools like Jira and Trello.

This project is being built as a portfolio project and backend assignment using Next.js, TypeScript, MongoDB, Mongoose, JWT Authentication, Swagger Documentation, and Testing with Jest & Supertest.

---

## Project Overview

The Team Task Manager API allows users to:

* Register and authenticate using JWT
* Manage projects
* Manage tasks within projects
* Assign tasks to users
* Track task status
* Implement role-based authorization
* Access API documentation through Swagger

---

## Features

### Authentication

* User Registration
* User Login
* Get Current User Profile
* JWT-Based Authentication

### Project Management

* Create Project
* Get All Projects
* Get Project By ID
* Update Project
* Delete Project

### Task Management

* Create Task
* Get All Tasks
* Get Task By ID
* Update Task
* Assign Task
* Update Task Status
* Delete Task

### Authorization

#### Admin

* Manage all projects
* Manage all tasks
* Manage all users

#### User

* View assigned tasks
* Manage own tasks

---

## Tech Stack

| Category          | Technology      |
| ----------------- | --------------- |
| Framework         | Next.js         |
| Language          | TypeScript      |
| Database          | MongoDB         |
| ODM               | Mongoose        |
| Authentication    | JWT             |
| Validation        | Zod             |
| Password Hashing  | bcryptjs        |
| Testing           | Jest            |
| E2E Testing       | Supertest       |
| API Documentation | Swagger/OpenAPI |
| Version Control   | Git & GitHub    |

---

## Assignment Requirements Covered

### Core Modules and Controllers

* Auth Module
* Project Module
* Task Module

### Database Integration

* MongoDB
* Mongoose ODM

### RESTful APIs

* Full CRUD operations

### Authentication & Authorization

* JWT Authentication
* Role-Based Access Control (RBAC)

### Testing

* Unit Testing
* End-to-End Testing

### API Documentation

* Swagger/OpenAPI

### Validation

* Zod Schema Validation

### Middleware

* Authentication Middleware
* Authorization Middleware
* Logging Middleware
* Error Handling Middleware

---

## Planned API Endpoints

### Authentication

#### Register

POST /api/auth/register

#### Login

POST /api/auth/login

#### Profile

GET /api/auth/profile

---

### Projects

#### Create Project

POST /api/projects

#### Get Projects

GET /api/projects

#### Get Project By Id

GET /api/projects/:id

#### Update Project

PATCH /api/projects/:id

#### Delete Project

DELETE /api/projects/:id

---

### Tasks

#### Create Task

POST /api/tasks

#### Get Tasks

GET /api/tasks

#### Get Task By Id

GET /api/tasks/:id

#### Update Task

PATCH /api/tasks/:id

#### Delete Task

DELETE /api/tasks/:id

---

## Database Design

### User

```json
{
  "_id": "ObjectId",
  "name": "Ashish Sharma",
  "email": "ashish@example.com",
  "password": "hashed-password",
  "role": "ADMIN",
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

### Project

```json
{
  "_id": "ObjectId",
  "name": "Team Task Manager",
  "description": "Project Description",
  "owner": "UserId",
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

### Task

```json
{
  "_id": "ObjectId",
  "title": "Implement JWT Authentication",
  "description": "Create login and register APIs",
  "status": "TODO",
  "projectId": "ProjectId",
  "assignedTo": "UserId",
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

---

## Project Structure

```text
src
│
├── pages
│   │
│   ├── api
│   │   │
│   │   ├── auth
│   │   │   ├── register.ts
│   │   │   ├── login.ts
│   │   │   └── profile.ts
│   │   │
│   │   ├── projects
│   │   │   ├── index.ts
│   │   │   └── [id].ts
│   │   │
│   │   └── tasks
│   │       ├── index.ts
│   │       └── [id].ts
│   │
│   └── docs.tsx
│
├── config
│   ├── database.ts
│   ├── env.ts
│   └── swagger.ts
│
├── constants
│   ├── roles.ts
│   └── task-status.ts
│
├── controllers
│   ├── auth.controller.ts
│   ├── project.controller.ts
│   └── task.controller.ts
│
├── services
│   ├── auth.service.ts
│   ├── project.service.ts
│   └── task.service.ts
│
├── repositories
│   ├── user.repository.ts
│   ├── project.repository.ts
│   └── task.repository.ts
│
├── models
│   ├── User.ts
│   ├── Project.ts
│   └── Task.ts
│
├── validators
│   ├── auth.validator.ts
│   ├── project.validator.ts
│   └── task.validator.ts
│
├── middleware
│   ├── auth.middleware.ts
│   ├── role.middleware.ts
│   ├── logger.middleware.ts
│   └── error.middleware.ts
│
├── lib
│   ├── jwt.ts
│   ├── bcrypt.ts
│   ├── api-response.ts
│   └── async-handler.ts
│
├── types
│   ├── auth.types.ts
│   ├── project.types.ts
│   └── task.types.ts
│
├── tests
│   │
│   ├── unit
│   │   ├── auth.service.test.ts
│   │   ├── project.service.test.ts
│   │   └── task.service.test.ts
│   │
│   └── e2e
│       ├── auth-flow.test.ts
│       └── project-flow.test.ts
│
└── swagger
    └── swagger.ts
```

---

## Environment Variables

Create a `.env.local` file in the root directory.

```env
MONGODB_URI=

JWT_SECRET=

JWT_EXPIRES_IN=1d

NODE_ENV=development
```

---

## Installation

Clone the repository:

```bash
git clone https://github.com/Ashu11122000/team-task-manager.git
```

Navigate into the project:

```bash
cd team-task-manager
```

Install dependencies:

```bash
npm install
```

Run development server:

```bash
npm run dev
```

---

## Development Roadmap

### Phase 1

* Project Setup
* Folder Structure
* Environment Configuration
* MongoDB Connection

### Phase 2

* Database Models
* Validation Schemas

### Phase 3

* Repositories
* Services

### Phase 4

* Controllers
* API Routes

### Phase 5

* JWT Authentication
* Authorization Middleware

### Phase 6

* Logging & Error Handling

### Phase 7

* Swagger Documentation

### Phase 8

* Unit Tests

### Phase 9

* E2E Tests

---

## GitHub:
https://github.com/Ashu11122000
