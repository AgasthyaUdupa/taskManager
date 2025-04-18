pipeline {
    agent any

    environment {
        GIT_REPO = 'https://github.com/AgasthyaUdupa/taskManager.git'
        BRANCH = 'main'

        DOCKER_IMAGE_BACKEND = 'agasthya/taskmanager-backend'
        DOCKER_IMAGE_FRONTEND = 'agasthya/taskmanager-frontend'

        RENDER_API_KEY = credentials('render-api-key') // Secret Text
    }

    options {
        buildDiscarder(logRotator(numToKeepStr: '5'))
        skipDefaultCheckout()
    }

    stages {
        stage('Clean Workspace') {
            steps {
                script {
                    echo "🧼 Cleaning workspace..."
                    cleanWs()
                }
            }
        }

        stage('Clone Repo') {
            steps {
                echo "📥 Cloning repository..."
                git credentialsId: 'github-username-password', url: "${GIT_REPO}", branch: "${BRANCH}"
            }
        }

        stage('Build Docker Images') {
            steps {
                script {
                    echo "🐳 Building backend image..."
                    sh 'docker build -t ${DOCKER_IMAGE_BACKEND} ./backend'

                    echo "🐳 Building frontend image..."
                    sh 'docker build -t ${DOCKER_IMAGE_FRONTEND} ./frontend'
                }
            }
        }

        stage('Push Docker Images') {
            steps {
                script {
                    echo "🚀 Pushing backend image to Docker Hub..."
                    withDockerRegistry([credentialsId: 'docker-credentials', url: 'https://index.docker.io/v1/']) {
                        sh 'docker push ${DOCKER_IMAGE_BACKEND}'
                        sh 'docker push ${DOCKER_IMAGE_FRONTEND}'
                    }
                }
            }
        }

        stage('Deploy to Render') {
            steps {
                script {
                    echo "🚢 Triggering backend deployment..."
                    sh """
                        curl -X POST https://api.render.com/deploy/srv-cnt3ml7k0iac73hj0fr0?key=${RENDER_API_KEY}
                    """

                    echo "🚢 Triggering frontend deployment..."
                    sh """
                        curl -X POST https://api.render.com/deploy/srv-cnt3mnhs0iac73hj07pg?key=${RENDER_API_KEY}
                    """
                }
            }
        }

        stage('Clean Docker') {
            steps {
                script {
                    echo "🧹 Cleaning Docker system..."
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
