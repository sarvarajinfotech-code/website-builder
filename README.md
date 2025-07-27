# Website Builder

This project consists of a frontend, backend, and MySQL database, all orchestrated with Docker Compose.

## Getting Started

Follow these steps to run the application:

### 1. Clone the Repository

```sh
git clone https://github.com/babure/website-builder.git
cd "client projects/websitebuilder"
```

### 2. Give Execute Permission to Wait Script

```sh
chmod +x backend/wait-for-mysql.sh
```

### 3. Build and Start the Application

```sh
docker-compose up --build
```

This command will build and start the MySQL, backend, and frontend services.

### 5. Access the Frontend

Open your browser and go to: [http://localhost:5173](http://localhost:5173)

---

**Note:**

- Make sure Docker and Docker Compose are installed on your system.
- The backend and frontend will share files via the `shared-public` Docker volume.
