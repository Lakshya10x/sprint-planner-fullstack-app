# Sprint Planner

**Sprint Planner** is a full-stack web application for agile sprint planning and task management. The backend, built with Spring Boot, provides secure REST APIs using HTTP Basic Authentication and stateless session management. The frontend (React) offers an intuitive interface for creating, tracking, and managing sprints and tasks. CORS is configured for seamless frontend-backend integration.

## Features
- **User Management**: Register and authenticate users via secure endpoints.
- **Sprint Planning**: Create, update, and track sprints and tasks.
- **Secure APIs**: Protected with HTTP Basic Auth and stateless sessions.
- **CORS Support**: Configured for frontend access (e.g., `http://localhost:3000` in dev).
- **Scalable Structure**: Organized for separate frontend and backend development.

## Project Structure
```
sprint-planner/
├── backend/                # Spring Boot backend
│   ├── src/                # Java source code
│   ├── pom.xml            # Maven dependencies
│   └── application.properties # Configuration (e.g., CORS origins)
├── frontend/               # React frontend
│   ├── src/                # React components and logic
│   ├── package.json        # Node dependencies
│   └── public/             # Static assets
├── .gitignore              # Ignored files (e.g., node_modules, .env)
└── README.md               # This file
```

## Prerequisites
- **Backend**:
  - Java 17+
  - Maven 3.6+
  - Spring Boot 3.x
- **Frontend**:
  - Node.js 16+ or 18+
  - npm 8+
- **Git**: For cloning and pushing changes.
- **GitHub Account**: For repository access.

## Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/YOUR_USERNAME/sprint-planner.git
cd sprint-planner
```

### 2. Backend Setup
1. Navigate to the backend folder:
   ```bash
   cd backend
   ```
2. Configure `application.properties` (e.g., database URL, CORS origins):
   ```properties
   allowed.origins=http://localhost:3000
   spring.datasource.url=jdbc:h2:mem:testdb
   spring.datasource.username=sa
   spring.datasource.password=
   ```
3. Build and run:
   ```bash
   mvn clean install
   mvn spring-boot:run
   ```
   Backend runs on `http://localhost:8080`.

### 3. Frontend Setup
1. Navigate to the frontend folder:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm start
   ```
   Frontend runs on `http://localhost:3000`.

### 4. Access the App
- Open `http://localhost:3000` in your browser.
- Register a user via `/users/register` or test login at `/sprints/basicAuth`.

## Security
- **Authentication**: HTTP Basic Auth for secure API access.
- **CORS**: Configured to allow `http://localhost:3000` in development. Update `allowed.origins` in `application.properties` for production (e.g., `https://yourapp.com`).
- **Stateless**: Uses `SessionCreationPolicy.STATELESS` for API scalability.
- **CSRF**: Disabled for stateless API; enable for session-based auth if needed.

## Production Notes
- Update CORS origins to your production domain (e.g., `https://yourapp.com`).
- Use HTTPS for secure communication.
- Store sensitive data (e.g., API keys) in `.env` files, ignored by `.gitignore`.
- Consider an API gateway for centralized CORS in microservices setups.

## Contributing
1. Fork the repo and create a feature branch:
   ```bash
   git checkout -b feature/your-feature
   ```
2. Commit changes:
   ```bash
   git commit -m "Add your feature"
   ```
3. Push to your fork:
   ```bash
   git push origin feature/your-feature
   ```
4. Open a pull request on GitHub.

## License
MIT License. See [LICENSE](LICENSE) for details.

## Contact
For issues or suggestions, open a GitHub issue or contact [YOUR_EMAIL].