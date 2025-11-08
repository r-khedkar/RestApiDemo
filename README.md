# RestApiDemo
Rest API Demo Application - A Spring Boot REST API for managing Todo items

## Table of Contents
- [Overview](#overview)
- [Prerequisites](#prerequisites)
- [How to Use in Eclipse IDE](#how-to-use-in-eclipse-ide)
  - [Create New Maven Project from Scratch](#create-new-maven-project-from-scratch)
  - [Import Existing Project](#import-existing-project)
  - [Configure and Run](#configure-and-run)
  - [Testing the API](#testing-the-api)
- [Troubleshooting](#troubleshooting)

## Overview
This is a REST API Demo application built with Spring Boot 3.3.2. It provides CRUD operations for managing Todo items using Spring Data JPA with an H2 in-memory database.

## Prerequisites
Before using this project in Eclipse, ensure you have the following installed:

1. **Java Development Kit (JDK) 17** or higher
   - Download from [Oracle](https://www.oracle.com/java/technologies/downloads/) or [OpenJDK](https://adoptium.net/)
   - Set `JAVA_HOME` environment variable

2. **Apache Maven 3.6+**
   - Download from [Maven website](https://maven.apache.org/download.cgi)
   - Add Maven to your system PATH

3. **Eclipse IDE for Enterprise Java and Web Developers**
   - Download from [Eclipse website](https://www.eclipse.org/downloads/)
   - Recommended version: 2023-06 or later
   - Ensure Maven (m2e) plugin is installed (comes pre-installed in Eclipse IDE for Enterprise Java)

## How to Use in Eclipse IDE

### Create New Maven Project from Scratch

If you want to create a brand new Java Maven project in Eclipse (not import this existing project), follow these simple steps:

#### Step 1: Open Eclipse and Start Creating a New Project

1. **Launch Eclipse IDE**
   - Open Eclipse on your computer
   - Wait for it to fully load (you'll see the main Eclipse window)

2. **Start the New Project Wizard**
   - Look at the top menu bar
   - Click on `File` (top-left corner)
   - Move your mouse down to `New`
   - A side menu will appear
   - Click on `Project...` (it has a folder icon)

#### Step 2: Choose Maven Project Type

3. **Select Maven Project**
   - A window titled "New Project" will pop up
   - You'll see a list of project types
   - Look for a folder icon labeled `Maven`
   - Click the small arrow/triangle next to `Maven` to expand it
   - You'll see `Maven Project` appear underneath
   - Click on `Maven Project` to select it
   - Click the `Next` button at the bottom

#### Step 3: Configure Project Location

4. **Choose Where to Save Your Project**
   - You'll see a screen asking about project location
   - There's a checkbox that says "Create a simple project (skip archetype selection)"
   - **Leave this UNCHECKED** for now (we'll use an archetype)
   - There's another checkbox "Use default Workspace location"
   - **Keep this CHECKED** (this saves your project in Eclipse's default folder)
   - Click `Next` button

#### Step 4: Select a Project Template (Archetype)

5. **Choose a Maven Archetype (Template)**
   - You'll see a long list of templates (called "archetypes")
   - Don't worry! You just need to find the right one
   - In the search box at the top, type: `maven-archetype-quickstart`
   - The list will filter to show only matching items
   - Look for the one that says:
     - **Artifact Id:** `maven-archetype-quickstart`
     - **Group Id:** `org.apache.maven.archetypes`
   - Click on it to select it
   - Click `Next` button

#### Step 5: Fill in Your Project Details

6. **Enter Your Project Information** (like filling out a form)
   
   You'll see several text boxes. Here's what to put in each:

   - **Group Id:** 
     - Think of this as your company or organization name
     - Use reverse domain style, like: `com.mycompany` or `com.example`
     - Example: `com.example`
     - This helps organize projects uniquely

   - **Artifact Id:**
     - This is your project name
     - Use lowercase with hyphens, like: `my-first-project`
     - Example: `todo-app` or `rest-api-demo`
     - This becomes your project folder name

   - **Version:**
     - Leave as `0.0.1-SNAPSHOT` (default is fine)
     - This is your project version number
     - SNAPSHOT means it's still in development

   - **Package:**
     - This is automatically filled based on Group Id and Artifact Id
     - It looks like: `com.example.myproject`
     - This is where your Java code will live
     - You can leave it as-is or modify it if needed

7. **Review and Create**
   - Double-check all the information you entered
   - When everything looks good, click `Finish`

#### Step 6: Wait for Project Creation

8. **Eclipse Will Set Up Your Project**
   - Eclipse will create your project structure
   - It will download Maven dependencies (this takes a moment)
   - You'll see a progress bar at the bottom-right
   - Wait until it says "Build completed" or finishes loading
   - This might take 1-2 minutes the first time

#### Step 7: Explore Your New Project

9. **Check Your New Project Structure**
   
   In the left panel (Package Explorer), you'll see your new project with this structure:
   
   ```
   your-project-name
   ├── src
   │   ├── main
   │   │   └── java
   │   │       └── com.example.myproject
   │   │           └── App.java (sample Java file)
   │   └── test
   │       └── java
   │           └── com.example.myproject
   │               └── AppTest.java (sample test file)
   ├── JRE System Library
   ├── Maven Dependencies
   ├── src
   ├── target (compiled files go here)
   └── pom.xml (Maven configuration file)
   ```

   **What each folder means:**
   - `src/main/java` - Write your Java code here
   - `src/test/java` - Write your test code here
   - `pom.xml` - Maven configuration (like a recipe for your project)
   - `Maven Dependencies` - All the libraries your project uses

#### Step 8: Run Your First Program

10. **Run the Sample App**
    - Expand your project in Package Explorer
    - Navigate to: `src/main/java` → `com.example.myproject` (or your package name)
    - Double-click on `App.java` to open it
    - You'll see some Java code that says "Hello World!"
    - Right-click anywhere in the `App.java` file
    - Select `Run As` → `Java Application`
    - Look at the bottom panel called "Console"
    - You should see: `Hello World!` printed there
    - Congratulations! Your project works! 🎉

#### Next Steps: Adding Spring Boot (Optional)

If you want to convert this into a Spring Boot project like this RestApiDemo:

11. **Add Spring Boot to pom.xml**
    - Open the `pom.xml` file (double-click it)
    - You'll need to add Spring Boot dependencies
    - This is more advanced - consider using Spring Initializr instead
    - Go to: https://start.spring.io/
    - Fill in the same Group Id and Artifact Id
    - Select dependencies you need
    - Click Generate to download a ready-made Spring Boot project

#### Quick Recap (Simple Version)

For beginners, here's the shortest version:

1. `File` → `New` → `Project` → `Maven` → `Maven Project` → `Next`
2. Leave defaults, click `Next`
3. Search for `maven-archetype-quickstart`, select it, click `Next`
4. Fill in:
   - Group Id: `com.example`
   - Artifact Id: `my-project`
5. Click `Finish`
6. Wait for Maven to download stuff
7. Find `App.java` in `src/main/java`
8. Right-click → `Run As` → `Java Application`
9. See "Hello World!" in Console
10. Start coding! ✨

### Import Existing Project

#### Method 1: Import Existing Maven Project (Recommended)

1. **Clone the repository**
   ```bash
   git clone https://github.com/r-khedkar/RestApiDemo.git
   ```

2. **Open Eclipse IDE**

3. **Import the project:**
   - Go to `File` → `Import...`
   - Expand `Maven` folder
   - Select `Existing Maven Projects`
   - Click `Next`

4. **Select the project:**
   - Click `Browse` and navigate to the cloned `RestApiDemo` directory
   - Eclipse will automatically detect the `pom.xml` file
   - Ensure the project is checked in the Projects list
   - Click `Finish`

5. **Wait for Maven dependencies:**
   - Eclipse will automatically download all required dependencies
   - This may take a few minutes depending on your internet connection
   - Check the progress in the bottom-right corner of Eclipse

#### Method 2: Import from Git

1. **Open Eclipse IDE**

2. **Import from Git:**
   - Go to `File` → `Import...`
   - Expand `Git` folder
   - Select `Projects from Git`
   - Click `Next`

3. **Clone the repository:**
   - Select `Clone URI`
   - Click `Next`
   - Enter URI: `https://github.com/r-khedkar/RestApiDemo.git`
   - Click `Next`
   - Select the branch (usually `main` or `master`)
   - Click `Next`
   - Choose a local directory to store the project
   - Click `Next`

4. **Import as Maven project:**
   - Select `Import as general project` or `Import using the New Project wizard`
   - Click `Finish`
   - If imported as general project, right-click on the project → `Configure` → `Convert to Maven Project`

### Configure and Run

#### Option 1: Run as Spring Boot Application

1. **Locate the main application class:**
   - In the `Package Explorer`, navigate to:
     ```
     src/main/java → com.example.demo → RestApiDemoApplication.java
     ```

2. **Run the application:**
   - Right-click on `RestApiDemoApplication.java`
   - Select `Run As` → `Spring Boot App`
   - Alternatively, select `Run As` → `Java Application`

3. **Verify the application is running:**
   - Check the `Console` view in Eclipse
   - You should see Spring Boot startup logs
   - Look for a message like:
     ```
     Started RestApiDemoApplication in X.XXX seconds
     ```
   - The application runs on `http://localhost:8080` by default

#### Option 2: Run as Maven Build

1. **Right-click on the project** in Package Explorer

2. **Run Maven:**
   - Select `Run As` → `Maven build...`
   - In the `Goals` field, enter: `spring-boot:run`
   - Click `Run`

### Testing the API

Once the application is running, you can test the API endpoints:

#### Available Endpoints:

1. **GET all todos:**
   ```
   GET http://localhost:8080/api/v1/todo
   ```

2. **GET a specific todo by ID:**
   ```
   GET http://localhost:8080/api/v1/todo/{todoId}
   ```

3. **PUT - Update a todo:**
   ```
   PUT http://localhost:8080/api/v1/todo/{todoId}
   Content-Type: application/json
   
   {
     "title": "Updated Todo",
     "description": "Updated description",
     "todoStatus": "COMPLETED"
   }
   ```

4. **DELETE a todo:**
   ```
   DELETE http://localhost:8080/api/v1/todo/{todoId}
   ```

#### Testing Methods:

**Option 1: Using Browser**
- Open your web browser and navigate to:
  ```
  http://localhost:8080/api/v1/todo
  ```
- This will show all todos in JSON format

**Option 2: Using cURL (Command Line)**
```bash
# Get all todos
curl http://localhost:8080/api/v1/todo

# Get specific todo
curl http://localhost:8080/api/v1/todo/1

# Update todo
curl -X PUT http://localhost:8080/api/v1/todo/1 \
  -H "Content-Type: application/json" \
  -d '{"title":"Updated","description":"Test","todoStatus":"IN_PROGRESS"}'

# Delete todo
curl -X DELETE http://localhost:8080/api/v1/todo/1
```

**Option 3: Using Postman or Insomnia**
- Download and install [Postman](https://www.postman.com/downloads/) or [Insomnia](https://insomnia.rest/download)
- Create requests for the above endpoints
- Test all CRUD operations

**Option 4: Using Eclipse HTTP Client**
- Eclipse has a built-in HTTP client for testing REST APIs
- You can install additional plugins like "REST Client" from Eclipse Marketplace

#### Accessing H2 Console:

The application uses H2 in-memory database. You can access the H2 console:

1. Open browser and navigate to:
   ```
   http://localhost:8080/h2-console
   ```

2. Use these connection details:
   - JDBC URL: `jdbc:h2:mem:testdb`
   - User Name: `sa`
   - Password: (leave empty)

3. Click `Connect` to access the database

## Troubleshooting

### Common Issues and Solutions:

#### 1. Project doesn't build - Maven errors

**Problem:** Maven dependencies not downloading or build fails

**Solution:**
- Right-click on project → `Maven` → `Update Project`
- Check the box `Force Update of Snapshots/Releases`
- Click `OK`
- If still having issues, try:
  ```bash
  mvn clean install
  ```

#### 2. Java version mismatch

**Problem:** Compiler compliance level errors

**Solution:**
- Right-click on project → `Properties`
- Go to `Java Compiler`
- Ensure `Compiler compliance level` is set to `17` or higher
- Go to `Java Build Path` → `Libraries`
- Ensure JRE System Library is JDK 17 or higher

#### 3. Lombok not working

**Problem:** Getter/Setter methods not recognized

**Solution:**
- Download lombok.jar from [projectlombok.org](https://projectlombok.org/download)
- Run the jar file: `java -jar lombok.jar`
- Select your Eclipse installation directory
- Click `Install/Update`
- Restart Eclipse

#### 4. Port 8080 already in use

**Problem:** Application fails to start with "Port 8080 already in use" error

**Solution:**
- Stop any other application using port 8080
- Or change the port in `src/main/resources/application.properties`:
  ```properties
  server.port=8081
  ```

#### 5. Cannot find main class

**Problem:** Error running the application

**Solution:**
- Clean the project: `Project` → `Clean...`
- Rebuild: `Project` → `Build Project`
- Try running again

#### 6. Eclipse runs slowly

**Solution:**
- Increase Eclipse memory in `eclipse.ini`:
  ```
  -Xms512m
  -Xmx2048m
  ```

### Getting Help

If you encounter issues not covered here:
1. Check Eclipse Error Log: `Window` → `Show View` → `Error Log`
2. Check the Console output for detailed error messages
3. Verify all prerequisites are correctly installed
4. Try reimporting the project following the steps above

## Additional Resources

- [Spring Boot Documentation](https://docs.spring.io/spring-boot/docs/current/reference/html/)
- [Eclipse IDE Documentation](https://help.eclipse.org/)
- [Maven Documentation](https://maven.apache.org/guides/)
- [H2 Database Documentation](https://www.h2database.com/html/main.html)
