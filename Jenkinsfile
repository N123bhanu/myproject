pipeline {
    agent any

    environment {
        IMAGE_NAME = 'starbucks-backend'  // Local Docker image name
        GITHUB_TOKEN = credentials('github-token')  // GitHub token credentials
        DOCKER_PORT = '9090'  // Port exposed in Dockerfile
    }

    stages {
        stage('Clone Repo') {
            steps {
                // Clone the GitHub repository from the 'master' branch using GitHub token for authentication
                git credentialsId: 'github-token', url: 'https://github.com/N123bhanu/myproject.git', branch: 'master'
            }
        }

        stage('Build Image') {
            steps {
                script {
                    // Build the Docker image using the Dockerfile
                    docker.build("${IMAGE_NAME}")
                }
            }
        }

        stage('Deploy to Docker') {
            steps {
                script {
                    // Stop and remove any existing container with the same name
                    sh 'docker ps -q --filter "name=starbucks-backend" | xargs -r docker stop | xargs -r docker rm'

                    // Run the Docker container, mapping port 9090 on the host
                    sh 'docker run -d -p 9090:9090 --name starbucks-backend ${IMAGE_NAME}'

                    // Optionally, you can check if the app is running properly:
                    // sh 'curl http://localhost:9090'
                }
            }
        }
    }

    post {
        always {
            // Clean up unused images and containers
            sh 'docker system prune -f'
        }
    }
}
