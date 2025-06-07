FROM gradle:8.7-jdk21 AS build

WORKDIR /property-management

COPY build.gradle.kts settings.gradle.kts gradlew gradlew.bat ./
COPY gradle gradle

RUN gradle dependencies --no-daemon

COPY src src
RUN ./gradlew build --no-daemon -x test

FROM eclipse-temurin:21-jre-jammy
WORKDIR /property-management
COPY --from=build /property-management/build/libs/*.jar app.jar

EXPOSE 8080
ENTRYPOINT [ "java", "-jar", "app.jar" ]