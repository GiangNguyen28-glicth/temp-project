pipeline {
    agent { dockerfile true }
    
    stages {
        stage('Clone Repository') {
            steps {
                script {
                    git 'https://github.com/GiangNguyen28-glicth/temp-project'
                }
            }
        }

        stage('Build Docker Images') {
            steps {
                withDockerRegistry(credentialsId: 'docker-hub-2', url: 'https://index.docker.io/v1/') {
                    def dockerfilePath = './Dockerfile'
                    sh 'docker build -t giangnt/temp-project:v1 Dockerfile'
                    sh 'docker push -t giangnt/temp-project:v1 Dockerfile'
                }
            }
        }
        // Add more stages as needed
    }
    
    // Add post-build actions, etc.
}