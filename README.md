# jsonSlide - A PowerPoint to JSON Converter

![image](https://github.com/KBSwift/jsonSlide/assets/15136449/4067e34a-3c6b-4214-a9c1-b6d10be5fb45)

## Overview

This project is a simple demonstration of data extraction from ppt files with the goal of expanding to provide a full ETL experience. Preconfigured with Micronaut to be built with Gradle Wrapper for ease.

## Technology Stack

**Backend**
- **Java**: Java 17
- **Gradle**: Configured with Gradle Wrapper and predefined instructions for automatic build with Intellij or similar IDE
- **Micronaut**: v4.4.3. - Modern, JVM-based, full-stack microservices framework designed for building modular, easily testable microservice applications
- **Apache POI**: v5.2.5 - Java library for handling Microsoft Office documents
- **Jackson**: v2.17.1 - High-performance JSON processor for Java

**Frontend**
- **React**: v18.2.0 - A JavaScript library for building user interfaces.
- **Vite**: v3.5.0 - Build tool chosen with SWC for Fast Refresh option
- **TypeScript**: v5.2.2 - Strongly typed JavaScript. Cause why not!
- **Material-UI (MUI)**: v5.15.18 - Popular React UI framework that provides styled components.
- **styled-components**: v5.1.34 - A library that utilizes tagged template literals to style your components.
- **react-json-view component**: v2.0.0-alpha.24 - A React component for displaying and editing javascript arrays and JSON objects.

## Setup and Installation
This project was created in a Windows environment. These instructions were made with Intellij, VS Code, Gradle wrapper, npm, default ports: React w/Vite 5173 // Micronaut 8080. Adjust as needed.

1. **Clone this repo**:
   ```bash
   git clone https://github.com/KBSwift/jsonSlide.git
2. **Navigate to project directory**:
   ```bash
   cd jsonSlide
3. **Import "backend" in Intellij or similar and allow Gradle to build the project. Alternatively, you can build it as follows:**
   ```bash
   ./gradlew build
3. **Import "frontend" in VS Code or similar and install all necessary dependencies:**
   ```bash
   npm install
4. **Bootstrap the backend by running the Application.java file in Intellij. Make sure it runs successfully on port 8080 You can also use the following command:**
   ```bash
   ./gradlew run
4. **Run the frontend by using the following command in the root of the directory, making sure it starts with port 5173:**
   ```bash
   npm run dev
5. **The webapp will now be running at http://localhost:5173/. Upload your PowerPoint file and enjoy your JSON!**
