# Angular Jenkins Hello World

A minimal Angular 21 application designed to assist with hello world reporting

## Expected deployment

- Jenkins: host port `5201`
- Angular application: host port `5200`
- Angular/nginx container: port `8080`

The Jenkins pipeline maps:

    5201:5200

## Local CLI Build and Test
npm install
ng build
ng test
ng serve
ng e2e


## Local Docker test

    docker build -t hello-world-rpt-test .
    docker run --rm -p 5200:8080 hello-world-rpt-test

Open:

    http://localhost:5200


