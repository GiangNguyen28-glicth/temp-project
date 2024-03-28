pipeline {
     environment { 
        registry = "giangnguyen3246/temp-project"
        registryCredential = 'docker-hub-2' 
        dockerImage = ''
    }

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
            steps {
                script { 
                    dockerImage = docker.build registry + ":v1"
                } 
            }
        }

        stage('Push Docker Images') {
            steps {
                script { 
                    docker.withRegistry( '', registryCredential ) { 
                        dockerImage.push() 
                    }
                } 
            }
        }
        // Add more stages as needed
    }
    
    // Add post-build actions, etc.
}