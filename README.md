# RestApiDemo - Todo REST API Application

A comprehensive REST API demo application built with Spring Boot 3.3.2 for managing todo items. This project demonstrates best practices for building RESTful web services with Spring Boot, JPA, and H2 database.

## Features

- **CRUD Operations**: Complete Create, Read, Update, and Delete operations for Todo items
- **RESTful API**: Well-structured REST endpoints following REST best practices
- **In-Memory Database**: H2 database for quick setup and testing
- **Spring Boot Actuator**: Health checks and monitoring endpoints
- **Todo Status Management**: Track todos as COMPLETED or NOT_COMPLETED
- **Automatic Timestamps**: Automatic tracking of creation and modification times

## Technologies Used

- **Java 17**
- **Spring Boot 3.3.2**
  - Spring Web
  - Spring Data JPA
  - Spring Boot Actuator
- **H2 Database** (in-memory)
- **Lombok** (for reducing boilerplate code)
- **Maven** (build tool)

## Prerequisites

- Java 17 or higher
- Maven 3.6 or higher

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/r-khedkar/RestApiDemo.git
cd RestApiDemo
```

### 2. Build the Project

```bash
mvn clean install
```

### 3. Run the Application

```bash
mvn spring-boot:run
```

The application will start on `http://localhost:8080`

### 4. Access H2 Console (Optional)

The H2 console is enabled for database inspection:
- URL: `http://localhost:8080/h2-console`
- JDBC URL: `jdbc:h2:mem:todo`
- Username: `sa`
- Password: `password`

## API Endpoints

### Base URL
```
http://localhost:8080/api/v1/todo
```

### Available Endpoints

| Method | Endpoint | Description | Request Body |
|--------|----------|-------------|--------------|
| GET | `/api/v1/todo` | Get all todos | - |
| GET | `/api/v1/todo/{id}` | Get a specific todo by ID | - |
| POST | `/api/v1/todo` | Create a new todo | Todo JSON |
| PUT | `/api/v1/todo/{id}` | Update an existing todo | Todo JSON |
| DELETE | `/api/v1/todo/{id}` | Delete a todo | - |

### Sample API Requests

#### Get All Todos
```bash
curl -X GET http://localhost:8080/api/v1/todo
```

#### Get Todo by ID
```bash
curl -X GET http://localhost:8080/api/v1/todo/1
```

#### Create a New Todo
```bash
curl -X POST http://localhost:8080/api/v1/todo \
  -H "Content-Type: application/json" \
  -d '{
    "title": "New Task",
    "description": "Task description",
    "todoStatus": "NOT_COMPLETED"
  }'
```

#### Update a Todo
```bash
curl -X PUT http://localhost:8080/api/v1/todo/1 \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Updated Task",
    "description": "Updated description",
    "todoStatus": "COMPLETED"
  }'
```

#### Delete a Todo
```bash
curl -X DELETE http://localhost:8080/api/v1/todo/1
```

## Todo Model

```json
{
  "id": 1,
  "title": "Task Title",
  "description": "Task Description",
  "todoStatus": "COMPLETED",
  "dateCreated": "2025-10-30T12:00:00.000+00:00",
  "lastModified": "2025-10-30T12:00:00.000+00:00"
}
```

### Todo Status Values
- `COMPLETED`
- `NOT_COMPLETED`

## Project Structure

```
src/
├── main/
│   ├── java/com/example/demo/
│   │   ├── bootstrap/          # Data initialization
│   │   ├── controllers/        # REST controllers
│   │   ├── model/             # Entity models
│   │   ├── repositories/      # Data repositories
│   │   ├── services/          # Business logic
│   │   └── RestApiDemoApplication.java
│   └── resources/
│       └── application.properties
└── test/
    └── java/com/example/demo/
        └── DemoApplicationTests.java
```

## Running Tests

```bash
mvn test
```

## Monitoring

Spring Boot Actuator endpoints are available at:
- Health: `http://localhost:8080/actuator/health`
- Info: `http://localhost:8080/actuator`

## Sample Data

The application loads 3 sample todos on startup:
1. Title 1 - COMPLETED
2. Title 2 - COMPLETED
3. Title 3 - COMPLETED

## Configuration

Application configuration can be modified in `src/main/resources/application.properties`:

```properties
spring.application.name=DemoApplication
spring.datasource.url=jdbc:h2:mem:todo
spring.datasource.driverClassName=org.h2.Driver
spring.datasource.username=sa
spring.datasource.password=password
spring.h2.console.enabled=true
spring.jpa.open-in-view=false
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).

## Author

Created by r-khedkar

## Support

For issues, questions, or contributions, please open an issue on the GitHub repository.
