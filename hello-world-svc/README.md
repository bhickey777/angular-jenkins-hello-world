SonarQube Analysis for Java 

run the provided setenv.sh to set up the sonarqube token

mvn clean verify sonar:sonar \
  -Dsonar.projectKey=hello-world-svc \
  -Dsonar.host.url=http://localhost:9000 \
  -Dsonar.token=$SONAR_TOKEN