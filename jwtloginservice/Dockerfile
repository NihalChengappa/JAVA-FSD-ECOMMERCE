FROM openjdk:21
WORKDIR /login-service
CMD ["./gradlew", "clean"]
CMD ["./gradlew", "bootJar"]
COPY ./build/libs/*.jar /app.jar
EXPOSE 8090
CMD ["ls","./"]
ENTRYPOINT ["java","-jar", "/app.jar"]