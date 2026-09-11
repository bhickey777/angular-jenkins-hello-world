# Angular Jenkins Hello World

A minimal Angular 20 application designed to test the Linux/Docker Jenkins pipeline.

## Expected deployment

- Jenkins: host port `8080`
- Angular application: host port `8081`
- Angular/nginx container: port `8080`

The Jenkins pipeline maps:

    8081:8080

## Local Docker test

    docker build -t angular-jenkins-test .
    docker run --rm -p 8081:8080 angular-jenkins-test

Open:

    http://localhost:8081

## Jenkins

Place the converted `Jenkinsfile` at the repository root. The project includes
`mission-ui` because the sample Jenkins pipeline has a Playwright Acceptance Tests
stage that changes into that directory.

The Playwright test checks that the deployed page contains:

    Hello from Angular!
    Jenkins deployment test successful.
