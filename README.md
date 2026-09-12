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

If you run into permission issues with creating the directory for the playwright cache:

Fix ownership of just the Playwright cache:

most cases you are running as ec2-user

sudo chown -R "$(whoami)":staff ~/<path to cache>/Caches/ms-playwright

Then verify:
ls -ld ~/<path to chache>/Caches/ms-playwright
ls -ld ~<path to cache>/Caches/ms-playwright/__dirlock

You should see your username as the owner rather than root.
Then remove the stale lock if it still exists:
rm -rf ~/<path to cache>/Caches/ms-playwright/__dirlock

Retry your pipeline 
