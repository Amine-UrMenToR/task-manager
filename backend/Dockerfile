# Use a multi-stage build so the final image is slim
FROM maven:3.9.4-eclipse-temurin-21-alpine AS build
WORKDIR /app

# cache and build
COPY pom.xml .
COPY src ./src
RUN mvn clean package -DskipTests

# runtime image
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app

# copy the jar from builder
COPY --from=build /app/target/*.jar app.jar

# set JDBC URL so Spring points at our "db" service
ENV SPRING_DATASOURCE_URL=jdbc:postgresql://db:5432/task_db
ENV SPRING_DATASOURCE_USERNAME=postgres
ENV SPRING_DATASOURCE_PASSWORD=Amine123
ENV SPRING_JPA_HIBERNATE_DDL_AUTO=update

ENTRYPOINT ["java","-jar","app.jar"]
