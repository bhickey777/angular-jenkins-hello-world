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
        DB_HOST = 'localhost'
        DB_PORT = '5432'
        DB_NAME = 'helloworld_wealth'
        DB_USER = 'postgres'
        DB_PASSWORD = 'admin'

        //TWELVE Data API key
        TWELVE_DATA_API_KEY = credentials('twelve-data-api-key')
        
        // Docker image tag
        IMAGE_TAG = "${BUILD_NUMBER}"

        DEPLOYED_HW_URL='http://localhost:4200'
        DEPLOYED_HWR_URL='http://localhost:5200'
        DEPLOYED_HWRS_URL='http://localhost:7200'
        DEPLOYED_HWA_URL='http://localhost:3000'
        DEPLOYED_HWS_URL='http://localhost:8090'
    }

    tools {
        nodejs 'NodeJS'
    }
    
    stages {
        stage('Checkout') {
            steps {
                checkout scm

                sh '''
                    echo "Current directory:"
                    pwd

                    echo "Workspace contents:"
                    ls -la

                    echo "==========DB CONNECTION =========="
                    echo "$DB_NAME"
                    echo "$DB_USER"
                    
                '''
            }
        }

        stage('Config Pipeline') {
            steps {
                 sh '''
		    node --version
                    npm --version
                    ng version

                    docker --version
                    docker-compose --version
		    '''
				
               script {
                    env.IMAGE_TAG = sh(
                        script: 'git rev-parse --short HEAD',
                        returnStdout: true
                    ).trim()

                    echo "Building hello-world:${env.IMAGE_TAG}"
               }
            }
        }

	stage('Start Database and Initialize') {
            steps {
                sh '''

                    docker-compose up -d postgres

                    echo "Waiting for PostgreSQL..."
                    until docker-compose exec -T postgres \
                        pg_isready -U "$DB_USER" -d "$DB_NAME"
                    do
                        sleep 2
                    done
                    docker-compose exec -T postgres \
                        psql -U "$DB_USER" -d "$DB_NAME" \
                        -c "DROP SCHEMA public CASCADE; CREATE SCHEMA public;"

                    docker-compose exec -T postgres \
                        psql -U "$DB_USER" -d "$DB_NAME" \
                        < ./test-data/enterprise-schema.sql
                '''
            }
        }

	stage('Validate tables and data') {
            steps {
                sh '''
                    docker-compose exec -T postgres \
                      psql -U "$DB_USER" -d "$DB_NAME" \
                      -c "\\dt"

                    docker-compose exec -T postgres \
                      psql -U "$DB_USER" -d "$DB_NAME" \
                      -c "SELECT COUNT(*) FROM clients;"
                '''
            }
        }

	stage('Build Docker Images') {
            steps {
                sh '''
                    docker-compose build hello-world
                    docker-compose build hello-world-rpt
                    docker-compose build hello-world-rpt-svc
                    docker-compose build hello-world-auth
                    docker-compose build hello-world-svc
                    docker-compose build hello-world-holdings
                    docker-compose build market-service
                    
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
                   docker-compose up -d --no-build hello-world

                   echo "Deploying hello-world-rpt:$IMAGE_TAG"
                   docker-compose up -d --no-build hello-world-rpt

                   echo "Deploying hello-world-rpt-svc:$IMAGE_TAG"
                   docker-compose up -d --no-build hello-world-rpt-svc

                   echo "Deploying hello-world-auth:$IMAGE_TAG"
                   docker-compose up -d --no-build hello-world-auth

                   echo "Deploying hello-world-svc:$IMAGE_TAG"
                   docker-compose up -d --no-build hello-world-svc

                   echo "Deploying hello-world-holdings:$IMAGE_TAG"
                   docker-compose up -d --no-build hello-world-holdings

                   echo "Deploying market-service:$IMAGE_TAG"
                   docker-compose up -d --no-build market-service

                   echo "Application container started:"

                   docker-compose ps 

                   echo "Show any containers that may have started but exited"
                   docker-compose ps -a
                   
                '''
            }
        }
    }
}
