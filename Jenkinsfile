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

                    node --version
                    npm --version 
                    ng version

                    docker --version
                    docker-compose --version
                    
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
                
               script {
                    env.IMAGE_TAG = sh(
                        script: 'git rev-parse --short HEAD',
                        returnStdout: true
                    ).trim()

                    echo "Building hello-world:${env.IMAGE_TAG}"
               }
            }
        }

        stage("Docker compose") {
            sh '''
             docker-compose up -d postgres
            '''
        }
    }
}
