pipeline {
    agent any

    environment {
        GIT_REPO = 'https://github.com/AgasthyaUdupa/taskManager.git'
        BRANCH = 'main'
        DOCKER_IMAGE_NAME = 'taskmanager-app'
    }

    stages {
        stage('Clone Repo') {
            steps {
                git credentialsId: 'github-token', url: "${GIT_REPO}", branch: "${BRANCH}"
            }
        }

        stage('Build Docker Images') {
            steps {
                script {
                    echo "Building Docker images..."
                    sh 'docker build -t ${DOCKER_IMAGE_NAME}:latest .'
                }
            }
        }

        stage('Push Docker Image') {
            steps {
                script {
                    echo "Pushing Docker image..."
                    withDockerRegistry([credentialsId: 'docker-credentials', url: 'https://registry.hub.docker.com']) {
                        sh 'docker push ${DOCKER_IMAGE_NAME}:latest'
                    }
                }
            }
        }

        stage('Deploy Application') {
            steps {
                script {
                    echo "Deploying the application..."
                    // Example if using Render API
                    sh '''
                    curl -X POST https://api.render.com/deploy \
                        -H "Authorization: Bearer ${RENDER_API_KEY}" \
                        -H "Content-Type: application/json" \
                        -d '{"serviceId": "your-service-id"}'
                    '''
                }
            }
        }

        stage('Clean Up') {
            steps {
                script {
                    echo "Cleaning up..."
                    sh 'docker system prune -f'
                }
            }
        }
    }

    post {
        success {
            echo 'Build and deployment successful!'
        }
        failure {
            echo 'Build or deployment failed.'
        }
    }
}
