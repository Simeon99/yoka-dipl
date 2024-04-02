# React and Spring Boot Application

This repository contains a sample full-stack application, for online furniture ordering, built with React for the front-end and Spring Boot for the back-end. It demonstrates how to integrate these technologies to create a robust web application.

## Prerequisites

Before running this application, ensure you have the following prerequisites installed:

- Node.js and npm - [Download & Install Node.js](https://nodejs.org)
- Java Development Kit (JDK) - [Download & Install JDK](https://www.oracle.com/java/technologies/javase-jdk11-downloads.html)
- Maven - [Download & Install Maven](https://maven.apache.org/download.cgi)

## Getting Started

Follow these steps to run the application locally:

1. Clone this repository to your local machine:

   ```bash
   git clone https://github.com/your-username/react-spring-app.git
   ```

2. Navigate to the project directory:

   ```bash
   cd yoka-dipl
   ```

### Running the Spring Boot Back-end

1. Navigate to the `back/yoka-furniture` directory:

   ```bash
   cd back/yoka-furniture
   ```

2. Build the Spring Boot application:

   ```bash
   mvn clean install
   ```

3. Run the application:

   ```bash
   java -jar target/backend-0.0.1-SNAPSHOT.jar
   ```

   The back-end will start running on `http://localhost:8080`.

### Running the React Front-end

1. Open a new terminal window/tab.

2. Navigate to the `front/yoka-front` directory:

   ```bash
   cd ../front/yoka-front
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the React development server:

   ```bash
   npm start
   ```

   The front-end will be accessible at `http://localhost:3000`.
