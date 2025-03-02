pipeline {
    agent any

    environment {
        JAVA_HOME = '/opt/java/openjdk'
        GITHUB_CREDENTIALS_ID = 'github-credential'
        DOCKER_CREDENTIALS_ID = 'dockerhub-credential'
        DOCKER_IMAGE = 'baicham/user-management-app'
        BACKEND_DIR = 'user-management/backend'
    }

    stages {
        stage('Clone Repository') {
            steps {
                script {
                    withCredentials([usernamePassword(credentialsId: env.GITHUB_CREDENTIALS_ID, usernameVariable: 'GIT_USER', passwordVariable: 'GIT_PASS')]) {
                        cleanWs()
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
                    sh './gradlew clean build -x test'
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

        // unable to install node correctly for jenkins to use
        // stage('Setup Node.js') {
        //     steps {
        //         sh 'export PATH=$PATH:/usr/local/bin && npm install'
        //     }
        // }

        // stage('Check Environment') {
        //     steps {
        //         sh 'echo $PATH'
        //         sh 'which node || echo "Node.js not found!"'
        //         sh 'which npm || echo "npm not found!"'
        //     }
        // }

        // stage('Build Frontend (React)') {
        //     steps {
        //         dir('user-management/web') {
        //             sh '/usr/local/bin/npm install'
        //             sh '/usr/local/bin/npm run build'
        //         }
        //     }
        // }
        stage('Get Commit Hash') {
            steps {
                script {
                    // Store commit hash in environment variable so it's available across stages
                    env.COMMIT_HASH = sh(script: 'git rev-parse --short HEAD', returnStdout: true).trim()
                    echo "Commit Hash: ${env.COMMIT_HASH}"
                }
            }
        }
        stage('Build Docker Image') {
            steps {
                script {
                    echo "Building Docker image with tag: ${env.COMMIT_HASH}"
                    sh "docker build -t $DOCKER_IMAGE:${env.COMMIT_HASH} -f user-management/Dockerfile ."
                }
            }
        }

        stage('Push Docker Image to DockerHub') {
            steps {
                script {
                    withCredentials([
                        usernamePassword(
                            credentialsId: env.DOCKER_CREDENTIALS_ID,
                            usernameVariable: 'DOCKER_USER',
                            passwordVariable: 'DOCKER_PASS'
                        )
                    ]) {
                        sh 'echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin'
                        echo "Pushing Docker image with tag: ${env.COMMIT_HASH}"
                        sh "docker push $DOCKER_IMAGE:${env.COMMIT_HASH}"
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
        // always {
        //     sh 'rm -rf user-management'
        //     // cleanWs()
        // }
    }
}
