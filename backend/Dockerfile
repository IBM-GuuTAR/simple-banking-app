# ===== Build stage =====
FROM eclipse-temurin:21-jdk-alpine AS builder

WORKDIR /app

# Copy dependency files first (cache layer)
COPY mvnw pom.xml ./
COPY .mvn .mvn
RUN ./mvnw -B -q -e -DskipTests dependency:go-offline

# Copy source
COPY src ./src

# Build
RUN ./mvnw -B -q -DskipTests package

# ===== Runtime stage (ultra secure & small) =====
FROM gcr.io/distroless/java21-debian12

WORKDIR /app

COPY --from=builder /app/target/*.jar app.jar

EXPOSE 8080

CMD ["app.jar"]
