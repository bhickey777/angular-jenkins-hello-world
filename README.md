# Hello World Financial

Hello World Financial is a multi-language financial-services training
application built with Angular, Java/Spring Boot, Python/Flask,
PostgreSQL, Docker, Jenkins, SonarQube, and automated testing.

Each team works from a single repository. Jenkins builds and tests each
technology stack and then performs one repository-level SonarQube
analysis so Java, Python, and TypeScript/Angular are evaluated together.

## Technology Stack

  Area                      Technology
  ------------------------- ----------------------------
  Client UI                 Angular 21
  Reporting UI              Angular 21
  Java services             Java / Spring Boot / Maven
  Python services           Python / Flask
  Database                  PostgreSQL
  Containers                Docker / Docker Compose
  CI/CD                     Jenkins
  Static analysis           SonarQube
  Java tests / coverage     JUnit / JaCoCo
  Python tests / coverage   pytest / coverage XML
  Angular coverage          LCOV
  End-to-end tests          Playwright

## Applications and Services

### Client App

The main Angular application provides customer-facing functionality such
as login/signup, help, market quotes, client information, holdings,
trades, and investment workflows.

Docker Compose exposes the Client App at:

``` text
http://localhost:4200
```

### Reporting App

The separate Angular Reporting App supports employee/reporting workflows
including employee information, customer lookup, report selection, and
report viewing.

``` text
http://localhost:5200
```

### Backend Services

The architecture includes Python/Flask services for authentication,
holdings/trades, order/sell workflows, market data, and reporting,
together with Java/Spring Boot services.

Known service ports include:

``` text
Market service       8000
Java service         8090
Holdings service     host 8100 → container 6200
```

The market service uses `TWELVE_DATA_API_KEY` for external market-data
access.

The Reporting Service can generate PNG report output and serve it
through REST endpoints such as:

``` text
POST /api/reports/assetClassTotals
GET  /api/reports/assetClassTotals
```

## Database

PostgreSQL stores data including clients/customers, advisors,
instruments, trades, holdings, model portfolios, reference data, and
user accounts.

Docker configuration uses environment variables such as:

``` text
DB_NAME
DB_USER
DB_PASSWORD
DB_PORT
```

Services running inside Docker should connect using the Compose
hostname, for example:

``` text
postgres:5432
```

## Docker Compose

Known application mappings include:

``` text
hello-world       → 4200:8080
hello-world-rpt   → 5200:8080
market-service    → 8000:8000
Java service      → 8090:8090
holdings service  → 8100:6200
```

Common commands:

``` bash
docker compose up -d
docker compose ps
docker compose ps -a
docker compose down
```

## Testing

### Java

``` bash
mvn clean verify
```

JUnit executes the tests. With JaCoCo configured, coverage is typically
generated at:

``` text
target/site/jacoco/jacoco.xml
```

### Python

``` bash
python -m pytest
```

Generate SonarQube-compatible coverage with:

``` bash
python -m pytest --cov=. --cov-report=xml:coverage.xml
```

### Angular

``` bash
npm ci
npm test -- --watch=false --code-coverage
```

Angular coverage can produce:

``` text
coverage/lcov.info
```

### Playwright

``` bash
npx playwright test
```

Playwright E2E tests are a separate Jenkins validation step. SonarQube
does not replace Playwright execution.

## Jenkins Pipeline

Recommended flow:

``` text
Git Checkout
     ↓
Java Build / JUnit / JaCoCo
     ↓
Python Tests / Coverage
     ↓
Angular Build / Tests / LCOV
     ↓
Playwright E2E
     ↓
SonarQube Analysis
     ↓
Quality Gate
     ↓
Docker Build / Deploy
```

Each technology is built and tested using its native tooling. SonarQube
analysis runs after the required coverage reports have been generated.

## SonarQube

Use **one repository-level SonarQube analysis** for the multi-language
repository.

Do not run independent Java, Python, and Angular SonarQube analyses
against the same SonarQube project. Instead, build/test each stack and
then run `sonar-scanner` once from the repository root.

SonarQube applies the appropriate configured Quality Profile:

``` text
*.java → Java Quality Profile
*.py   → Python Quality Profile
*.ts   → TypeScript Quality Profile
```

### sonar-project.properties

Place `sonar-project.properties` at the repository root beside the
`Jenkinsfile`.

``` properties
sonar.projectKey=YOUR_TEAM_PROJECT_KEY
sonar.projectName=Hello World Financial

sonar.sources=.

sonar.exclusions=**/node_modules/**,**/target/**,**/dist/**,**/.venv/**,**/venv/**,**/__pycache__/**

# Update these paths to match the repository.
sonar.coverage.jacoco.xmlReportPaths=path-to-java-service/target/site/jacoco/jacoco.xml
sonar.python.coverage.reportPaths=path-to-python-service/coverage.xml
sonar.javascript.lcov.reportPaths=path-to-angular-app/coverage/lcov.info
```

### Jenkins SonarQube Configuration

Install/configure the **SonarQube Scanner for Jenkins** plugin and
configure the server under:

``` text
Manage Jenkins
→ System
→ SonarQube servers
```

Store the SonarQube project-analysis token as Jenkins **Secret text**:

``` text
ID: sonarqube-token
```

Never commit the token to Git, the Jenkinsfile,
`sonar-project.properties`, or source code.

### Analysis Stage

``` groovy
stage('SonarQube Analysis') {
    steps {
        withSonarQubeEnv('SonarQube') {
            sh 'sonar-scanner'
        }
    }
}
```

Run this stage from the repository root. `sonar-scanner` automatically
reads the root `sonar-project.properties`.

### Quality Gate

``` groovy
stage('Quality Gate') {
    steps {
        timeout(time: 5, unit: 'MINUTES') {
            waitForQualityGate abortPipeline: true
        }
    }
}
```

A SonarQube webhook back to Jenkins is required for the standard
`waitForQualityGate` integration.

``` text
PASS → pipeline continues
FAIL → pipeline stops
```

## Example Pipeline Structure

``` groovy
stage('Java Build & Test') {
    steps {
        dir('java-service') {
            sh 'mvn clean verify'
        }
    }
}

stage('Python Tests') {
    steps {
        dir('python-service') {
            sh 'python -m pytest --cov=. --cov-report=xml:coverage.xml'
        }
    }
}

stage('Angular Build & Test') {
    steps {
        dir('angular-app') {
            sh 'npm ci'
            sh 'npm test -- --watch=false --code-coverage'
        }
    }
}

stage('SonarQube Analysis') {
    steps {
        withSonarQubeEnv('SonarQube') {
            sh 'sonar-scanner'
        }
    }
}

stage('Quality Gate') {
    steps {
        timeout(time: 5, unit: 'MINUTES') {
            waitForQualityGate abortPipeline: true
        }
    }
}
```

Replace the example directory names with the actual repository
directories.

## Environment Variables and Secrets

Do not commit secrets. Provide them through Jenkins Credentials,
environment variables, or Docker configuration.

Examples:

``` text
TWELVE_DATA_API_KEY
DB_NAME
DB_USER
DB_PASSWORD
DB_PORT
SonarQube analysis token
```

## Health Checks

Examples:

``` bash
curl --fail http://localhost:8000/health
curl --fail http://localhost:8090/health
```

Adjust endpoints to match the currently enabled services.

## Troubleshooting

### SonarScanner cannot find the project

Verify the scanner is running at repository root:

``` bash
pwd
ls -l sonar-project.properties
```

### `sonar-scanner: command not found`

Install/configure SonarScanner on the Jenkins build agent or through
Jenkins tool configuration.

### SonarQube shows no coverage

Verify reports exist before scanning:

``` bash
find . -name jacoco.xml
find . -name coverage.xml
find . -name lcov.info
```

Then verify their paths in `sonar-project.properties`.

### Docker service is not running

``` bash
docker compose ps -a
docker compose logs <service-name>
```

### Health check returns HTTP 401

A `401` means Jenkins reached the service but the endpoint requires
authentication. Configure the intended health endpoint appropriately or
provide the required authentication.

## CI/CD Validation Goals

The pipeline should demonstrate that:

-   Applications build successfully.
-   Java unit tests pass.
-   Python tests pass.
-   Angular tests pass.
-   Playwright E2E tests pass.
-   Coverage reports are generated.
-   SonarQube analyzes the complete repository.
-   Java, Python, and TypeScript Quality Profiles are applied.
-   The SonarQube Quality Gate passes.
-   Docker images build successfully.
-   Deployed services pass their health checks.

## Security

-   Never commit passwords, API keys, or SonarQube tokens.
-   Store CI/CD secrets in Jenkins Credentials.
-   Use environment variables for runtime configuration.
-   Keep SonarQube analysis tokens scoped to the appropriate project.
-   Do not print secrets in Jenkins logs.

## Purpose

Hello World Financial provides a realistic multi-language environment
for practicing Angular, Java/Spring Boot, Python/Flask, REST APIs,
PostgreSQL, testing, Docker, Jenkins CI/CD, and SonarQube Quality Gates.
