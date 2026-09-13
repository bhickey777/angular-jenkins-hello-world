# Angular Jenkins Hello World

A minimal Angular 20 application designed to test the Linux/Docker Jenkins pipeline.

## Expected deployment

- Jenkins: host port `4201`
- Angular application: host port `4200`
- Angular/nginx container: port `4200`

The Jenkins pipeline maps:

    8081:8080

## Local CLI Build and Test
npm install
ng build
ng test
ng serve
ng e2e


## Local Docker test

   docker build -t hello-world-rpt-test .
   docker run --rm -p 4200:8080 hello-world-rpt-test

Open:

    http://localhost:4200

## Jenkins

login to your linux virtual and install nodeJS (note: this needs to be installed in jenkins as well)
sudo dnf install -y nodejs22

install playwright test 
npm install @playwright/test

Place the converted `Jenkinsfile` at the repository root. The project includes
`mission-ui` because the sample Jenkins pipeline has a Playwright Acceptance Tests
stage that changes into that directory.

The Playwright test checks that the deployed page contains:

    Hello from Angular!
    Jenkins deployment test successful.

If you run into permission issues with creating the directory for the playwright cache:

Fix ownership of just the Playwright cache: (if needed)

most cases you are running as ec2-user

sudo chown -R "$(whoami)":staff /var/lib/jenkins/.cache/ms-playwright/chromium1234

Then verify:
ls -ld /var/lib/jenkins/.cache/ms-playwright/chromium1234
ls -ld /var/lib/jenkins/.cache/ms-playwright/chromium1234/__dirlock

You should see your username as the owner rather than root.
Then remove the stale lock if it still exists:
rm -rf /var/lib/jenkins/.cache/ms-playwright/chromium1234/__dirlock

Retry your pipeline 
