pipeline {
    agent any

    environment {
        BACKEND_URL = 'https://taskmanager-5kmh.onrender.com'
        FRONTEND_URL = 'https://taskmanager-frontend-uas9.onrender.com'
        
        // Render credentials (Secret Text)
        RENDER_API_KEY = credentials('render-api-key')

        // GitHub token (Secret Text with ID: github-token)
        GITHUB_TOKEN = credentials('github-token')

        // Render service IDs (from Render dashboard)
        BACKEND_SERVICE_ID = 'srv-cvv56vhr0fns73a44270'
        FRONTEND_SERVICE_ID = 'srv-cvv67c3e5dus73eacgkg'
    }

    stages {
        stage('Checkout') {
            steps {
                script {
                    // Authenticate and clone the private GitHub repository using the PAT
                    git url: 'https://${GITHUB_TOKEN}@github.com/AgasthyaUdupa/taskManager.git', branch: 'main'
                }
            }
        }

        stage('Build Backend') {
            steps {
                dir('backend') {
                    sh 'docker build -t backend .'
                }
            }
        }

        stage('Build Frontend') {
            steps {
                dir('frontend') {
                    sh """
                    docker build --build-arg VITE_BACKEND_URL=${BACKEND_URL} -t frontend .
                    """
                }
            }
        }

        stage('Test') {
            steps {
                echo '🧪 Running backend and frontend tests...'
                // Add real test scripts here
            }
        }

        stage('Deploy Backend to Render') {
            steps {
                sh """
                curl -X POST https://api.render.com/v1/services/${BACKEND_SERVICE_ID}/deploy \\
                    -H "Authorization: Bearer ${RENDER_API_KEY}" \\
                    -H "Content-Type: application/json" \\
                    -d '{}'
                """
            }
        }

        stage('Deploy Frontend to Render') {
            steps {
                sh """
                curl -X POST https://api.render.com/v1/services/${FRONTEND_SERVICE_ID}/deploy \\
                    -H "Authorization: Bearer ${RENDER_API_KEY}" \\
                    -H "Content-Type: application/json" \\
                    -d '{}'
                """
            }
        }
    }

    post {
        success {
            echo '✅ Deployment was successful!'
        }
        failure {
            echo '❌ Deployment failed.'
        }
    }
}
