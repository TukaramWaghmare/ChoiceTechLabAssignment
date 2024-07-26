# Node.js To-Do List Application

## Overview

This project is a Node.js To-Do List application that allows users to manage their tasks. It includes features such as user authentication, task CRUD operations, and role-based access control.

## Features

- User Registration
- User Login
- JWT-based Authentication
- Task Management (Create, Read, Update, Delete)
- Role-Based Access Control (Admin and Regular User)
- Redis for Caching and Session Management

## Installation

1. **Clone the repository:**

   ```bash
   https://github.com/TukaramWaghmare/ChoiceTechLabAssignment.git
   
   cd node-todo-list

2. # Install dependencies:

    npm install

3. # Set up environment variables:

    Create a .env file in the root directory and add the following:

    MONGO_URI='mongodb://localhost:27017/choicetechlab'
    JWT_SECRET='choicetechlab'
    REDIS_URL='redis://localhost:6379'
    PORT=5000

4. # Configure MongoDB:

    If using a local MongoDB instance, replace your_mongo_uri with mongodb://localhost:27017/your_db_name.

5. # Configure Redis:

    If using a local Redis instance, you can set REDIS_HOST to localhost and REDIS_PORT to 6379.

# # Usage

1. Start the server:

    node index.js

# # API Documentation:

# User Authentication

1. Register a User
 
    URL: http://localhost:5000/api/auth/register

    CURL: curl --location 'http://localhost:5000/api/auth/register' \
--header 'Content-Type: application/json' \
--data-raw '{
  "name": "Pravin Wagh",
  "email": "pravinwagh1@gmail.com",
  "password": "pravin123",
  "role":"admin"
}
'

2. Login a User

    URL: http://localhost:5000/api/auth/login

    CURL: curl --location 'http://localhost:5000/api/auth/login' \
--header 'Content-Type: application/json' \
--data-raw '{
  "email": "pravinwagh1@gmail.com",
  "password": "pravin123"
}
'
3. Current user

    URL: http://localhost:5000/api/auth

    CURL: curl --location 'http://localhost:5000/api/auth' \
--header 'x-auth-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjZhM2VlMzM3ZGNiZjU0N2EwOGViNjYyIiwicm9sZSI6ImFkbWluIn0sImlhdCI6MTcyMjAyMTE3MCwiZXhwIjoxNzIyMzgxMTcwfQ.3xZfYdnJs2lwHC1X-RTFj880HOKMzupKgpOZbDp6sLE'

# # Task Management

4. Create a Task (Admin Only)

    URL: http://localhost:5000/api/tasks

    CURL: curl --location 'http://localhost:5000/api/tasks' \
--header 'x-auth-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjZhM2VlMzM3ZGNiZjU0N2EwOGViNjYyIiwicm9sZSI6ImFkbWluIn0sImlhdCI6MTcyMjAyMTE3MCwiZXhwIjoxNzIyMzgxMTcwfQ.3xZfYdnJs2lwHC1X-RTFj880HOKMzupKgpOZbDp6sLE' \
--header 'Content-Type: application/json' \
--data '{
  "title": "Task 4",
  "description": "make To-Do-List Project by using JAVA"
}
'
5. Get Tasks with Pagination

    URL: http://localhost:5000/api/tasks?page=1&limit=5

    CURL: curl --location 'http://localhost:5000/api/tasks?page=1&limit=5' \
--header 'x-auth-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjZhM2VlMzM3ZGNiZjU0N2EwOGViNjYyIiwicm9sZSI6ImFkbWluIn0sImlhdCI6MTcyMjAyMTE3MCwiZXhwIjoxNzIyMzgxMTcwfQ.3xZfYdnJs2lwHC1X-RTFj880HOKMzupKgpOZbDp6sLE'

6. Update a Task (Admin Only)

    URL: http://localhost:5000/api/tasks/66a3f87c58667362f22ce7bc

    CURL: curl --location --request PUT 'http://localhost:5000/api/tasks/66a3f87c58667362f22ce7bc' \
--header 'x-auth-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjZhM2VlMzM3ZGNiZjU0N2EwOGViNjYyIiwicm9sZSI6ImFkbWluIn0sImlhdCI6MTcyMjAyMTE3MCwiZXhwIjoxNzIyMzgxMTcwfQ.3xZfYdnJs2lwHC1X-RTFj880HOKMzupKgpOZbDp6sLE' \
--header 'Content-Type: application/json' \
--data '{
  "title": "Updated Task Title",
  "description": "Updated Task Description",
  "completed": true
}
'

7. Delete a Task (Admin Only)

    URL: http://localhost:5000/api/tasks/66a3f87c58667362f22ce7bc

    CRUL: curl --location --request DELETE 'http://localhost:5000/api/tasks/66a3f87c58667362f22ce7bc' \
--header 'x-auth-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjZhM2VlMzM3ZGNiZjU0N2EwOGViNjYyIiwicm9sZSI6ImFkbWluIn0sImlhdCI6MTcyMjAyMTE3MCwiZXhwIjoxNzIyMzgxMTcwfQ.3xZfYdnJs2lwHC1X-RTFj880HOKMzupKgpOZbDp6sLE'

