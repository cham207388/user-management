pipeline {
    agent any

    environment {
        JAVA_HOME = '/opt/java/openjdk' // Java installation path
        GITHUB_CREDENTIALS_ID = 'github-credentials'  // GitHub credentials stored in Jenkins
        DOCKER_CREDENTIALS_ID = 'dockerhub-credentials' // DockerHub credentials stored in Jenkins
        DOCKER_IMAGE = 'baicham/user-management-app' // Replace with your DockerHub repo
        BACKEND_DIR = 'user-management/backend'
    }

    stages {
        stage('Clone Repository') {
            steps {
                script {
                    withCredentials([usernamePassword(credentialsId: env.GITHUB_CREDENTIALS_ID, usernameVariable: 'GIT_USER', passwordVariable: 'GIT_PASS')]) {
                        sh 'git clone https://$GIT_USER:$GIT_PASS@github.com/cham207388/user-management.git'
                    }
                }
            }
        }

        stage('Verify Java Setup') {
            steps {
                sh 'echo "JAVA_HOME is set to: $JAVA_HOME"'
                sh 'java -version'
            }
        }

        stage('Build Backend (Spring Boot)') {
            steps {
                dir(env.BACKEND_DIR) {
                    sh './gradlew clean build -x test' // Build without running tests
                }
            }
        }

        stage('Run Backend Tests') {
            steps {
                dir(env.BACKEND_DIR) {
                    sh './gradlew test'
                }
            }
        }

        stage('Build Frontend (React)') {
            steps {
                dir('user-management/web') {
                    sh 'npm install'
                    sh 'npm run build'
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    sh 'docker build -t $DOCKER_IMAGE:latest -f user-management/Dockerfile .'
                }
            }
        }

        stage('Push Docker Image to DockerHub') {
            steps {
                script {
                    withCredentials([usernamePassword(credentialsId: env.DOCKER_CREDENTIALS_ID, usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                        sh 'echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin'
                        sh 'docker push $DOCKER_IMAGE:latest'
                    }
                }
            }
        }
    }

    post {
        success {
            echo 'Pipeline executed successfully! 🎉'
        }
        failure {
            echo 'Pipeline failed! Check logs for errors.'
        }
    }
}