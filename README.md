# jsonSlide - A PowerPoint to Json Converter

## Technology Stack

**Backend**
- **Java**: Using Java 17
- **Gradle**: Configured with Gradle Wrapper and predefined instructions for automatic build with Intellij or similar IDE
- **Micronaut**: Using version 4.4.3. - Modern, JVM-based, full-stack microservices framework designed for building modular, easily testable microservice applications
- **Apache POI**: Using version 5.2.5 - Java library for handling Microsoft Office documents
- **Jackson**: Using version 2.17.1 - High-performance JSON processor for Java

## Overview

This project is a simple demonstration of data extraction from ppt files with the goal of expanding to provide a full ETL experience. 

## Setup and Installation

1. **Clone this repo**:
   ```bash
   git clone https://github.com/KBSwift/jsonSlide.git
2. **Navigate to project directory**:
   ```bash
   cd jsonSlide
3. **Open in Intellij or similar and allow Gradle to build the project. Alternatively, manually build it using a Gradle wrapper with the following:**:
   ```bash
   ./gradlew build
4. **Run the application in your IDE. You can also use the following Gradle Wrapper command**
   ```bash
   ./gradlew run
5. **Append the file path to your ppt to the address of your localhost session prefixed with "ppt?filePath="**
  ```bash
  http://localhost:8080/ppt?filePath=C:/Users/testUser/Desktop/testPowerPoint.pptx
