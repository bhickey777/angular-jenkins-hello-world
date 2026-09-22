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
    }
}
