
## Setup Instructions

* Node.js (v18 or higher)
* npm (v8 or higher)
* Docker & Docker Compose (if using the containerized setup)

### Local Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/SanjayRawat0570/curvvtech-backend
    cd curvvtech-backend
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Configure environment variables:**
    Create a `.env` file in the root directory and add the following variables.

    ```env
    PORT=3000
    DATABASE_URL="postgres://user:your_password@your_host:5432/your_db_name"
    JWT_SECRET="a_very_secure_and_long_jwt_secret_key"
    RATE_LIMIT_MINUTES=1
    RATE_LIMIT_MAX_REQUESTS=100
    ```


4.  **Run the application:**
    ```bash
    npm run dev
    ```


### Dockerized Setup

1.  Ensure Docker is running on your machine.
2.  From the project's root directory, run:
    ```bash
    docker-compose up --build
    ```


## API Documentation

The API follows a RESTful design. All endpoints are prefixed with `/api`.

### 1. User Management
| `POST` | `/api/auth/signup` 
| `POST` | `/api/auth/login` 

### 2. Device Management

All endpoints require a `Authorization: Bearer <JWT>` header.
| `POST` | `/api/devices` 
| `GET` | `/api/devices`
| `PATCH`| `/api/devices/:id`
| `DELETE`| `/api/devices/:id` 
| `POST` | `/api/devices/:id/heartbeat`

### 3. Data & Analytics

| `POST` | `/api/devices/:id/logs` 
| `GET` | `/api/devices/:id/logs` 
| `GET` | `/api/devices/:id/usage` 
## Assumptions Made


* The `last_active_at` timestamp is updated only by the `heartbeat` endpoint.