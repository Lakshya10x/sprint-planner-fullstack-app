# Sprint Planner

**Sprint Planner** is a full-stack web application designed for agile sprint planning and task management. The backend is built with Spring Boot, providing secure REST APIs with HTTP Basic Authentication, stateless session management, and MySQL database integration. The frontend, developed with React, offers an intuitive user interface for creating, tracking, and managing sprints and tasks. CORS is configured to enable seamless communication between the frontend and backend.

## Features

- **User Management**: Public registration and secure authentication via HTTP Basic Auth.
- **Sprint and Task Management**: Create, update, delete, and track sprints, tasks, and progress.
- **Secure APIs**: Protected endpoints with authentication required for most routes; stateless sessions for scalability.
- **Database Integration**: Uses MySQL for persistent data storage of users, sprints, and tasks.
- **CORS Support**: Configured for cross-origin requests, allowing frontend access from specified origins (e.g., `http://localhost:3000` in development).
- **Production-Ready Config**: Dynamic CORS origins, specific methods/headers, and alignment with security settings for enterprise use.

## Project Structure

The project follows a monorepo structure for simplicity, with separate folders for backend and frontend. This allows shared version control while keeping concerns separated.

```
sprint-planner/
├── backend/                     # Spring Boot backend source
│   ├── src/                     # Java source code
│   │   ├── main/
│   │   │   ├── java/com/sprintplanner/sprint_planner_backend # Application packages
│   │   │   └── resources/       # Configuration files
│   │   │       └── application.properties # App config (e.g., DB, CORS)
│   │   └── test/                # Unit/integration tests
│   ├── pom.xml                  # Maven build file with dependencies
│   └── target/                  # Build output (ignored in Git)
├── frontend/                    # React frontend source
│   ├── src/                     # React components, pages, and logic
│   │   ├── SprintPlanner/       # Reusable UI components
│   │   ├── Api/                 # App APIs
│   │   └── App.js               # Main app entry point
│   ├── public/                  # Static assets (e.g., index.html, images)
│   ├── package.json             # Node dependencies and scripts
│   ├── node_modules/            # Installed packages (ignored in Git)
│   └── build/                   # Production build output (ignored in Git)
├── .gitignore                   # Files/folders to ignore (e.g., node_modules, target)
├── README.md                    # This documentation file
└── LICENSE                      # License file (e.g., MIT)
```

- **Backend**: Handles API logic, security (e.g., `SecurityFilterChain` with OPTIONS permitted, Basic Auth), and database interactions via Spring Data JPA.
- **Frontend**: Manages UI/UX with React components; makes API calls to backend endpoints (e.g., `/users/register`, `/sprints`).
- **Shared**: Root-level files like `.gitignore` apply to both.

## Prerequisites

- **Backend**:
  - Java 17+ (JDK)
  - Maven 3.6+
  - Spring Boot 3.x
  - MySQL 8+ (for database)
- **Frontend**:
  - Node.js 16+ or 18+
  - npm 8+
- **Tools**:
  - Git for version control
  - IDEs: IntelliJ IDEA or VS Code recommended

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/sprint-planner.git
cd sprint-planner
```

### 2. Database Setup (MySQL)

1. Install MySQL and create a database:
   ```sql
   CREATE DATABASE sprint_planner;
   ```
2. Update `backend/src/main/resources/application.properties` with your MySQL credentials:

   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/sprintdb
   spring.datasource.username=sprintuser
   spring.datasource.password=root
   spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

   spring.jpa.generate-ddl=true
   spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQL8Dialect
   spring.jpa.hibernate.ddl-auto=update
   ```

### 3. Backend Setup

1. Navigate to backend:
   ```bash
   cd backend
   ```
2. Build and run:
   ```bash
   mvn clean install
   mvn spring-boot:run
   ```
   - Runs on `http://localhost:8080`.
   - Test endpoints: `/users/register` (POST for registration), `/sprints` (requires auth).

### 4. Frontend Setup

1. Navigate to frontend:
   ```bash
   cd ../frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start development server:
   ```bash
   npm start
   ```
   - Runs on `http://localhost:3000`.
   - Update API base URL in frontend code (e.g., in `src/api.js`) to point to backend: `http://localhost:8080`.

### 5. Access the App

- Open `http://localhost:3000` in your browser.
- Register a user and log in to manage sprints.

## Security and Configuration

- **Authentication**: HTTP Basic Auth; public endpoints for registration and login checks.
- **CORS**: Configured in `WebMvcConfigurer` for allowed origins (update in `application.properties` for production, e.g., `allowed.origins=https://yourapp.com`).
- **Stateless Sessions**: Uses `SessionCreationPolicy.STATELESS` for API scalability.
- **CSRF**: Disabled for stateless APIs; consider enabling for enhanced security in session-based scenarios.
- **Production Tips**: Use HTTPS, specific CORS methods/headers, and environment-specific profiles (e.g., `application-prod.properties`).

## Contributing

Contributions are welcome! Follow these steps:

1. Fork the repository.
2. Create a feature branch: `git checkout -b feature/your-feature`.
3. Commit changes: `git commit -m "Add your feature"`.
4. Push to your fork: `git push origin feature/your-feature`.
5. Open a pull request.

## License

MIT License. See [LICENSE](LICENSE) for details.

## Git Things

This project uses Git for version control. Key concepts and commands:

- **Repository**: Hosted on GitHub; monorepo structure for frontend and backend.
- **Cloning**: `git clone <repo-url>` to get a local copy.
- **Branching**: Work on branches to avoid direct changes to `main`. Create: `git checkout -b <branch-name>`. Switch: `git checkout <branch-name>`.
- **Committing**: Stage files: `git add .` (or specific files). Commit: `git commit -m "Descriptive message"`.
- **Pushing**: `git push origin <branch-name>` to upload changes.
- **Pulling**: `git pull origin main` to sync with remote.
- **Merging**: Merge branches via pull requests on GitHub for code review.
- **Ignoring Files**: `.gitignore` prevents committing unnecessary files (e.g., `node_modules`, `target`).
- **Best Practices**: Use descriptive commits, avoid pushing sensitive data (e.g., passwords in `.properties`), and resolve conflicts during merges.
- **Nested Repos Issue**: If subfolders like `frontend` have their own `.git`, remove them (`rm -rf frontend/.git`) to avoid submodule problems.

For advanced Git usage, refer to GitHub Docs.
