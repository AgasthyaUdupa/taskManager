pipeline {
    agent any

    environment {
        // Set environment variables
        BACKEND_URL = 'https://taskmanager-5kmh.onrender.com'
        FRONTEND_URL = 'https://taskmanager-frontend-uas9.onrender.com'
        RENDER_API_KEY = credentials('render-api-key') // Store your Render API key securely
        BACKEND_SERVICE_ID = 'srv-cvv56vhr0fns73a44270'  // Get this from Render Dashboard
        FRONTEND_SERVICE_ID = 'srv-cvv67c3e5dus73eacgkg' // Get this from Render Dashboard
    }

    stages {
        stage('Clone Repo') {
            steps {
                // Checkout the latest changes from your GitHub repo
                git url: 'https://github.com/AgasthyaUdupa/taskManager.git', branch: 'main'
            }
        }

        stage('Build Backend') {
            steps {
                dir('backend') {
                    script {
                        // Build Docker image for backend
                        sh 'docker build -t backend .'
                    }
                }
            }
        }

        stage('Build Frontend') {
            steps {
                dir('frontend') {
                    script {
                        // Build Docker image for frontend, passing the backend URL as an environment variable
                        sh 'docker build --build-arg VITE_BACKEND_URL=$BACKEND_URL -t frontend .'
                    }
                }
            }
        }

        stage('Test') {
            steps {
                // Run backend and frontend tests (example, adjust to your actual test command)
                script {
                    // Add your backend test steps here
                    echo 'Running tests...'
                }
            }
        }

        stage('Deploy Backend') {
            steps {
                script {
                    // Deploy backend to Render via Render API
                    sh """
                    curl -X POST https://api.render.com/v1/services/${env.BACKEND_SERVICE_ID}/deploy \
                    -H "Authorization: Bearer ${env.RENDER_API_KEY}" \
                    -H "Content-Type: application/json" \
                    -d '{}'
                    """
                }
            }
        }

        stage('Deploy Frontend') {
            steps {
                script {
                    // Deploy frontend to Render via Render API
                    sh """
                    curl -X POST https://api.render.com/v1/services/${env.FRONTEND_SERVICE_ID}/deploy \
                    -H "Authorization: Bearer ${env.RENDER_API_KEY}" \
                    -H "Content-Type: application/json" \
                    -d '{}'
                    """
                }
            }
        }
    }

    post {
        success {
            echo 'Deployment was successful!'
        }
        failure {
            echo 'Deployment failed!'
        }
    }
}
