pipeline {
    agent any
    
    environment {
        // Define environment variables if needed (e.g., backend API URL, etc.)
        GIT_REPO = 'https://github.com/AgasthyaUdupa/taskManager.git'
        BRANCH = 'main'
        DOCKER_IMAGE = 'jenkins-docker'
        DOCKER_REGISTRY = 'your-docker-registry'
        DOCKER_IMAGE_NAME = 'taskmanager-app'
    }

    tools {
        // Install the required Git and Docker tools if necessary (if not in the image already)
        git 'Default'
        dockerTool 'Docker' // This will reference your Jenkins Docker installation
    }

    stages {
        stage('Clone Repo') {
            steps {
                script {
                    // Clone the repository using the configured credentials and repository URL
                    checkout scm
                }
            }
        }

        stage('Build Docker Images') {
            steps {
                script {
                    // Build Docker images (you can customize this according to your Docker setup)
                    echo "Building Docker images..."
                    sh 'docker build -t ${DOCKER_IMAGE_NAME}:latest .'
                }
            }
        }

        stage('Push Docker Image') {
            steps {
                script {
                    // Push the Docker image to the registry (if necessary)
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
                    // Deploy your application, e.g., using Render or any platform you're deploying to
                    echo "Deploying the application..."
                    // Deployment steps here (use Render API or any other deployment mechanism)
                }
            }
        }

        stage('Clean Up') {
            steps {
                script {
                    // Optionally clean up unused images or containers if needed
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
