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
        APP_NAME       = 'leap-mission-service'
        CONTAINER_NAME = 'leap-mission-service'

        // Jenkins already uses host port 8080, so expose the application
        // on a different host port.
        HOST_PORT      = '8081'
        CONTAINER_PORT = '8080'

        DEPLOYED_URL   = 'http://localhost:8081'
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

        stage('Build Docker Image') {
            steps {
                sh '''
                    set -eu

                    IMAGE_TAG=$(git rev-parse --short HEAD)
                    IMAGE_NAME="$APP_NAME:$IMAGE_TAG"

                    echo "Building $IMAGE_NAME"
                    docker build -t "$IMAGE_NAME" .

                    echo "$IMAGE_TAG" > image-tag.txt
                '''
            }
        }

        stage('Deploy') {
            steps {
                sh '''
                    set -eu

                    IMAGE_TAG=$(cat image-tag.txt)
                    IMAGE_NAME="$APP_NAME:$IMAGE_TAG"

                    echo "Deploying $IMAGE_NAME"

                    # Remove the previous application container if it exists.
                    if docker ps -a --format '{{.Names}}' | grep -qx "$CONTAINER_NAME"; then
                        docker rm -f "$CONTAINER_NAME"
                    fi

                    docker run -d \\
                        --name "$CONTAINER_NAME" \\
                        --restart unless-stopped \\
                        -p "$HOST_PORT:$CONTAINER_PORT" \\
                        "$IMAGE_NAME"

                    echo "Application container started:"
                    docker ps --filter "name=$CONTAINER_NAME"
                '''
            }
        }

        stage('Verify Deployment') {
            steps {
                sh '''
                    set -eu

                    echo "Waiting for application at $DEPLOYED_URL"

                    ATTEMPT=1
                    MAX_ATTEMPTS=30

                    until curl --fail --silent --show-error "$DEPLOYED_URL" >/dev/null 2>&1; do
                        if [ "$ATTEMPT" -ge "$MAX_ATTEMPTS" ]; then
                            echo "Application did not become available."
                            echo "Container logs:"
                            docker logs "$CONTAINER_NAME" || true
                            exit 1
                        fi

                        echo "Attempt $ATTEMPT/$MAX_ATTEMPTS - application not ready yet"
                        ATTEMPT=$((ATTEMPT + 1))
                        sleep 2
                    done

                    echo "Application is available at $DEPLOYED_URL"
                '''
            }
        }

        // Reuses the existing Playwright acceptance tests against the
        // application deployed on this Linux server.
        stage('Acceptance Tests') {
            steps {
                sh '''
                    set -eu

                    cd mission-ui
                    npm ci
                    npx playwright install chromium
                    BASE_URL="$DEPLOYED_URL" npx playwright test
                '''
            }
        }
    }

    post {
        failure {
            sh '''
                echo "Pipeline failed. Current application container status:"
                docker ps -a --filter "name=$CONTAINER_NAME" || true

                echo "Application container logs:"
                docker logs --tail 100 "$CONTAINER_NAME" || true
            '''
        }
    }
}
