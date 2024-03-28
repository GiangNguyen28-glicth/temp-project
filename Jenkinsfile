pipeline {
    agent any
    
    stages {
        stage('Clone Repository') {
            steps {
                script {
                    git 'https://github.com/GiangNguyen28-glicth/temp-project'
                }
            }
        }

        stage('Build Docker Images') {
            container('docker') {
                withDockerRegistry(credentialsId: 'docker-hub-2', url: 'https://index.docker.io/v1/') {
                    // sh 'docker build -t giangnt/temp-project:v1 .'
                    // sh 'docker push -t giangnt/temp-project:v1 .'
                    def dockerImage = docker.build("giangnt/temp-project",".")
                    dockerImage.push()
                    echo "Pushed Docker Image giangnt/temp-project Successfully"
                }
            }
        }
        // Add more stages as needed
    }
    
    // Add post-build actions, etc.
}