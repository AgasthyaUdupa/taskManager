pipeline {
    agent any

    environment {
        GIT_REPO = 'https://github.com/AgasthyaUdupa/taskManager.git'
        BRANCH = 'main'
        DOCKER_IMAGE_NAME = 'taskmanager-app'
        RENDER_API_KEY = credentials('render-api-key') // Securely fetch Render key
    }

    options {
        buildDiscarder(logRotator(numToKeepStr: '5'))
        skipDefaultCheckout()
    }

    stages {
        stage('Clean Workspace') {
            steps {
                cleanWs()
            }
        }

        stage('Clone Repo') {
            steps {
                git credentialsId: 'github-username-password', url: "${GIT_REPO}", branch: "${BRANCH}"
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    echo "🔧 Building Docker image..."
                    sh 'docker build -t ${DOCKER_IMAGE_NAME}:latest .'
                }
            }
        }

        stage('Push Docker Image') {
            steps {
                script {
                    echo "🚀 Pushing Docker image to Docker Hub..."
                    withDockerRegistry([credentialsId: 'docker-credentials', url: 'https://index.docker.io/v1/']) {
                        sh 'docker push ${DOCKER_IMAGE_NAME}:latest'
                    }
                }
            }
        }

        stage('Deploy to Render') {
            steps {
                script {
                    echo "🚢 Deploying app to Render..."
                    sh '''
                        curl -X POST https://api.render.com/deploy \
                        -H "Authorization: Bearer ${RENDER_API_KEY}" \
                        -H "Content-Type: application/json" \
                        -d '{"serviceId": "your-service-id"}'
                    '''
                }
            }
        }

        stage('Clean Docker') {
            steps {
                script {
                    echo "🧹 Cleaning up Docker resources..."
                    sh 'docker system prune -f'
                }
            }
        }
    }

    post {
        success {
            echo '✅ Build and deployment successful!'
        }
        failure {
            echo '❌ Build or deployment failed.'
        }
    }
}
