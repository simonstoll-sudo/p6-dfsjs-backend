# Workshop Organizer API

A RESTful API for managing workshops and educational notions built with Node.js, Express, and MongoDB.

## Overview

This application provides a backend API for organizing workshops and managing educational concepts (notions). It features a clean MVC architecture with MongoDB persistence.

**Key Features:**
- Workshop management (CRUD operations)
- Notion management (CRUD operations)
- Many-to-many relationship between workshops and notions
- Input validation with Joi
- RESTful API design
- Health check endpoint
- Comprehensive test coverage

## Tech Stack

- **Runtime:** Node.js 22 LTS
- **Framework:** Express 5.x
- **Database:** MongoDB 7 with Mongoose ORM
- **Validation:** Joi
- **Testing:** Jest + Supertest
- **Architecture:** MVC (Model-View-Controller)

## Prerequisites

Before you begin, ensure you have installed:

- **Node.js** 22.x or higher ([Download](https://nodejs.org/))
- **npm** 10.x or higher (included with Node.js)
- **MongoDB** 7.x or higher ([Download](https://www.mongodb.com/try/download/community))
  - OR **Docker** and **Docker Compose** ([Download](https://www.docker.com/products/docker-desktop/))

## Getting Started

### Installation

1. Clone this repository:
```bash
git clone <repository-url>
cd p6-dfsjs-backend
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
```bash
cp .env.example .env
```

Edit `.env` with your configuration:
```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/workshopsdb
CORS_ORIGIN=http://localhost:5173
NODE_ENV=development
```

### Running the Application

#### Option 1: With Docker (Recommended)

The easiest way to run the application with MongoDB:

```bash
# Start all services (API + MongoDB)
docker compose up -d

# View logs
docker compose logs -f api

# Stop services
docker compose down
```

The API will be available at `http://localhost:3000`

#### Option 2: Local Development

Ensure MongoDB is running locally, then:

```bash
# Development mode with auto-reload
npm run dev

# Production mode
npm start
```

The API will be available at `http://localhost:3000`

### Verify Installation

Check the health endpoint:
```bash
curl http://localhost:3000/health
```

Expected response:
```json
{
  "status": "ok",
  "timestamp": "2026-01-21T10:30:00.000Z"
}
```

## Project Structure

```
p6-dfsjs-backend/
├── src/
│   ├── app.js                      # Express application entry point
│   ├── config/
│   │   ├── env.js                  # Environment configuration
│   │   └── database.js             # MongoDB connection setup
│   ├── models/
│   │   ├── Workshop.js             # Workshop Mongoose model
│   │   └── Notion.js               # Notion Mongoose model
│   ├── routes/
│   │   ├── workshops.js            # Workshop routes (GET, POST, PUT, DELETE)
│   │   └── notions.js              # Notion routes (GET, POST, PUT, DELETE)
│   ├── controllers/
│   │   ├── workshopsController.js  # Workshop business logic
│   │   └── notionsController.js    # Notion business logic
│   ├── services/
│   │   ├── workshopsService.js     # Workshop data access layer
│   │   └── notionsService.js       # Notion data access layer
│   ├── validators/
│   │   ├── workshopValidator.js    # Workshop Joi validation schemas
│   │   └── notionValidator.js      # Notion Joi validation schemas
│   └── middleware/
│       └── errorHandler.js         # Global error handling middleware
├── tests/
│   ├── workshops.test.js           # Workshop API integration tests
│   └── notions.test.js             # Notion API integration tests
├── package.json                    # Project dependencies and scripts
├── Dockerfile                      # Docker image configuration
├── docker-compose.yml              # Multi-container orchestration
├── .env.example                    # Environment variables template
├── .gitignore                      # Git ignore rules
└── README.md                       # This file
```

## API Endpoints

### Health Check

- `GET /health` - Check API status

### Workshops

- `GET /api/workshops` - Get all workshops
- `GET /api/workshops/:id` - Get workshop by ID
- `POST /api/workshops` - Create new workshop
- `PUT /api/workshops/:id` - Update workshop
- `DELETE /api/workshops/:id` - Delete workshop

**Workshop Schema:**
```json
{
  "title": "Introduction to Node.js",
  "description": "Learn the fundamentals of Node.js",
  "date": "2026-02-15T10:00:00.000Z",
  "notions": ["notion_id_1", "notion_id_2"]
}
```

### Notions

- `GET /api/notions` - Get all notions
- `GET /api/notions/:id` - Get notion by ID
- `POST /api/notions` - Create new notion
- `PUT /api/notions/:id` - Update notion
- `DELETE /api/notions/:id` - Delete notion

**Notion Schema:**
```json
{
  "name": "Asynchronous Programming",
  "description": "Understanding async/await and Promises"
}
```

## Testing

Run the test suite:

```bash
# Run all tests
npm test

# Run tests with coverage report
npm test -- --coverage

# Run tests in watch mode (for development)
npm test -- --watch
```

The test suite includes integration tests for all API endpoints, covering:
- CRUD operations for workshops and notions
- Input validation
- Error handling
- Edge cases

**Coverage target:** >70% for statements, branches, and functions

## Docker

### Build Docker Image

```bash
docker build -t p6-dfsjs-backend .
```

### Run with Docker Compose

The `docker-compose.yml` file orchestrates two services:
1. **MongoDB** - Database with health checks and volume persistence
2. **API** - Express application that depends on MongoDB

```bash
# Start services
docker compose up -d

# View logs
docker compose logs -f

# Stop services
docker compose down

# Remove volumes (reset database)
docker compose down -v
```

**Key Docker features:**
- Health checks ensure MongoDB is ready before starting the API
- Volume persistence for database data
- Environment variables for configuration
- Automatic service dependency management

## Architecture

This application follows the **MVC (Model-View-Controller)** pattern with a service layer:

```
Client Request
    ↓
Routes (HTTP endpoints)
    ↓
Controllers (Request validation & orchestration)
    ↓
Services (Business logic)
    ↓
Models (Data access with Mongoose)
    ↓
MongoDB
```

**Key patterns:**
- **Repository Pattern**: Services abstract database operations
- **DTO Pattern**: Clean data transfer objects returned from services
- **Middleware Chain**: Global error handler catches all errors
- **Validation Layer**: Joi schemas validate input before processing

## Development

### Available Scripts

- `npm start` - Start production server
- `npm run dev` - Start development server with auto-reload
- `npm test` - Run test suite
- `npm test -- --watch` - Run tests in watch mode
- `npm test -- --coverage` - Run tests with coverage report

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | `3000` |
| `MONGO_URI` | MongoDB connection string | `mongodb://localhost:27017/workshopsdb` |
| `CORS_ORIGIN` | Allowed CORS origin | `http://localhost:5173` |
| `NODE_ENV` | Environment mode | `development` |

### Adding New Features

To add a new resource (e.g., "users"):

1. **Create model** in `src/models/User.js` with Mongoose schema
2. **Create validator** in `src/validators/userValidator.js` with Joi schemas
3. **Create service** in `src/services/usersService.js` with CRUD operations
4. **Create controller** in `src/controllers/usersController.js` with request handlers
5. **Create routes** in `src/routes/users.js` with Express router
6. **Register routes** in `src/app.js`: `app.use('/api/users', usersRouter)`
7. **Add tests** in `tests/users.test.js`

## Troubleshooting

### MongoDB Connection Issues

**Problem:** `MongoServerError: connection refused`

**Solution:** Ensure MongoDB is running:
```bash
# If using Docker
docker compose up -d mongodb

# If using local MongoDB
brew services start mongodb-community  # macOS
sudo systemctl start mongod            # Linux
```

### Port Already in Use

**Problem:** `Error: listen EADDRINUSE: address already in use :::3000`

**Solution:** Change the port in `.env` or kill the process using port 3000:
```bash
# Find process
lsof -i :3000

# Kill process
kill -9 <PID>
```

### Tests Failing

**Problem:** Tests timeout or fail to connect to database

**Solution:** Ensure MongoDB is running and accessible at the `MONGO_URI` specified in your environment.

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit your changes: `git commit -m 'feat: add new feature'`
4. Push to the branch: `git push origin feature/new-feature`
5. Open a Pull Request

## License

MIT

---

**Need help?** Check the API documentation above or explore the code in the `src/` directory.
