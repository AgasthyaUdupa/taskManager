pipeline {
    agent any

    environment {
        DOCKER_IMAGE_BACKEND = 'agasthya/taskmanager-backend'
        DOCKER_IMAGE_FRONTEND = 'agasthya/taskmanager-frontend'
        RENDER_API_KEY = credentials('render-api-key')
    }

    options {
        buildDiscarder(logRotator(numToKeepStr: '5'))
    }

    stages {
        stage('Checkout Code') {
            steps {
                echo '📥 Checking out code...'
                checkout scm
            }
        }

        stage('Build Backend Image') {
            steps {
                script {
                    echo '🐳 Building backend Docker image...'
                    sh 'docker build -t ${DOCKER_IMAGE_BACKEND}:latest ./backend'
                }
            }
        }

        stage('Build Frontend Image') {
            steps {
                script {
                    echo '🖼️ Building frontend Docker image...'
                    sh 'docker build -t ${DOCKER_IMAGE_FRONTEND}:latest ./frontend'
                }
            }
        }

        stage('Push Backend Image') {
            steps {
                script {
                    echo '📦 Pushing backend Docker image...'
                    withDockerRegistry([credentialsId: 'docker-credentials', url: 'https://index.docker.io/v1/']) {
                        sh 'docker push ${DOCKER_IMAGE_BACKEND}:latest'
                    }
                }
            }
        }

        stage('Push Frontend Image') {
            steps {
                script {
                    echo '📦 Pushing frontend Docker image...'
                    withDockerRegistry([credentialsId: 'docker-credentials', url: 'https://index.docker.io/v1/']) {
                        sh 'docker push ${DOCKER_IMAGE_FRONTEND}:latest'
                    }
                }
            }
        }

        stage('Deploy Backend to Render') {
            steps {
                script {
                    echo '🚀 Deploying backend to Render...'
                    sh '''
                        curl -X POST https://api.render.com/deploy/srv-cj3q8npn7a8c73r6c3l0?key=${RENDER_API_KEY}
                    '''
                }
            }
        }

        stage('Deploy Frontend to Render') {
            steps {
                script {
                    echo '🚀 Deploying frontend to Render...'
                    sh '''
                        curl -X POST https://api.render.com/deploy/srv-cj3q8onrnslc739m5rhg?key=${RENDER_API_KEY}
                    '''
                }
            }
        }

        stage('Clean Docker') {
            steps {
                script {
                    echo '🧹 Cleaning up Docker system...'
                    sh 'docker system prune -f'
                }
            }
        }
    }

    post {
        success {
            echo '✅ All stages completed successfully!'
        }
        failure {
            echo '❌ Build or deploy failed.'
        }
    }
}
