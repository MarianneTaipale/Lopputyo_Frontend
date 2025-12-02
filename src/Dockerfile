FROM eclipse-temurin:17-jdk-focal AS builder

WORKDIR /opt/app

COPY .mvn/ .mvn
COPY mvnw pom.xml ./
RUN chmod +x ./mvnw

RUN ./mvnw dependency:go-offline

COPY ./src ./src

RUN ./mvnw clean install -DskipTests

RUN cp target/*.jar /opt/app/app.jar

FROM eclipse-temurin:17-jre-alpine

WORKDIR /opt/app

COPY --from=builder /opt/app/app.jar /opt/app/app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "/opt/app/app.jar"]