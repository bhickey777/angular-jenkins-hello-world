// Jenkins declarative pipeline for deploying mission-service directly
// to the Linux server on which Jenkins is running.
//
// Assumptions:
//   - Jenkins is running on this Linux host on port 8080.
//   - Docker is installed and the Jenkins user can run Docker commands.
//   - The application container listens on port 8080 internally.
//   - The application is exposed on host port 8081 to avoid conflicting
//     with Jenkins on host port 8080.
//   - mission-ui exists in the repository if the Acceptance Tests stage
//     is required.

pipeline {
    agent any

    environment {
        DEPLOY_ENV = 'test'
        SPRING_PROFILES_ACTIVE = 'test'

        // Example service configuration
        DB_HOST = 'postgres'
        DB_PORT = '5432'
        DB_NAME = 'paysprint'

        // Docker image tag
        IMAGE_TAG = "${BUILD_NUMBER}"

        DEPLOYED_HW_URL='http://localhost:4200'
        DEPLOYED_HWR_URL='http://localhost:5200'
    }

    tools {
        nodejs 'NodeJS'
    }
    
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Config Pipeline') {
            steps {
                
               script {
                    env.IMAGE_TAG = sh(
                        script: 'git rev-parse --short HEAD',
                        returnStdout: true
                    ).trim()

                    echo "Building hello-world:${env.IMAGE_TAG}"
               }
            }
        }
        
        stage('Build Docker Images') {
            steps {
                sh '''
                    docker compose build hello-world
                    docker compose build hello-world-rpt
                    echo "$IMAGE_TAG" > image-tag.txt
                '''
            }
        }

        stage('Deploy') {
            steps {
                sh '''
                   set -eu

                   IMAGE_TAG=$(cat image-tag.txt)
                   export IMAGE_TAG

                   echo "Deploying hello-world:$IMAGE_TAG"
                   docker compose up -d --no-build hello-world

                   echo "Deploying hello-world-rpt:$IMAGE_TAG"
                   docker compose up -d --no-build hello-world-rpt

                   echo "Application container started:"

                   docker compose ps 
                '''
            }
        }

        stage('Verify Deployment') {
            steps {
                sh '''
                   set -eu

                   IMAGE_TAG=$(cat image-tag.txt)
                   export IMAGE_TAG

                   echo "Waiting for applications to start..."
                   sleep 10

                   echo "Checking container status..."
                   docker compose ps

                   echo "Checking Hello World..."
                   curl --fail http://localhost:4200/

                   echo "Checking Hello World Reporting..."
                   curl --fail http://localhost:5200/


                   echo "All applications are responding."
                 '''
            }
        }

        // Reuses the existing Playwright acceptance tests against the
        // application deployed on this Linux server.
        stage('Acceptance Tests') {
            steps {
                sh '''
                    set -eu

                    echo "========== TESTING HELLO WORLD =========="
                    cd hello-world
                    npm ci
                    
                    npx playwright install chromium
                    BASE_URL="$DEPLOYED_HW_URL" npx playwright test

                    echo "========== TESTING HELLO WORLD REPORTING =========="
                    cd hello-world-rpt
                    npm ci
                    
                    npx playwright install chromium
                    BASE_URL="$DEPLOYED_HWR_URL" npx playwright test
                '''
            }
        }
    }

    post {
        failure {
               sh '''
                  echo "Pipeline failed."

                  IMAGE_TAG=$(cat image-tag.txt 2>/dev/null || true)
                  export IMAGE_TAG

                  echo "========== CONTAINER STATUS =========="
                  docker compose ps -a || true

                  echo "========== HELLO WORLD LOGS =========="
                  docker compose logs --tail=100 hello-world || true

                  echo "========== HELLO WORLD REPORTING LOGS =========="
                  docker compose logs --tail=100 hello-world-rpt || true

                  echo "========== TEARDOWN =========="
                  docker compose down || true
               '''
        }
    }
}
