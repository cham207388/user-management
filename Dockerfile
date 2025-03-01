# ==== Stage 1: Build the Frontend ====
FROM node:18-alpine AS frontend-builder

WORKDIR /app
COPY web/package.json web/package-lock.json ./
RUN npm install

COPY web/ .  
RUN npm run build

RUN ls -la /app/dist
# ==== Stage 2: Build the Backend ====
FROM gradle:8-jdk21 AS backend-builder

WORKDIR /app
COPY backend/ .
COPY --from=frontend-builder /app/dist/ backend/src/main/resources/static/

RUN gradle build -x test  # Build Spring Boot JAR (skip tests for faster build)

# CMD [ "sh" ]
# ==== Stage 3: Create Final Image ====
FROM eclipse-temurin:21-jdk-alpine AS production

WORKDIR /app
COPY --from=backend-builder /app/build/libs/*.jar app.jar

EXPOSE 8080
CMD ["java", "-jar", "app.jar"]