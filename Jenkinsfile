pipeline {
    agent any

    tools {
        // This must match the name you gave in Global Tool Configuration
        nodejs "NodeJS_24"
    }

    environment {
        // Path to your ecosystem file if it's not in the root
        ECOSYSTEM_FILE = "ecosystem.config.cjs"
    }

    stages {
        stage('🚚 Clone & Clean') {
            steps {
                // Pulls the latest code from your repo
                checkout scm
                echo "Deploying to Contabo VPS with Node 24..."
            }
        }

        stage('📦 Install Dependencies') {
            steps {
                echo 'Installing npm packages...'
                // 'npm ci' is preferred for CI/CD as it's faster and more reliable
                sh 'npm ci'
            }
        }

        stage('🏗️ Build Nuxt Project') {
            steps {
                echo 'Generating Nuxt production build...'
                // This creates the .output/ directory
                sh 'npm run build'
            }
        }

        stage('🚀 Deploy with PM2') {
            // Only trigger this stage for the main branch
            when {
                branch 'main'
            }
            steps {
                echo 'Starting/Restarting application via ecosystem file...'
                script {
                    // startOrRestart handles both the first-time start and subsequent updates
                    // It uses the configuration already defined in your ecosystem.config.cjs
                    sh "pm2 startOrRestart ${ECOSYSTEM_FILE} --env production"

                    // Save the process list so it persists after a VPS reboot
                    sh "pm2 save"
                }
            }
        }
    }

    post {
        success {
            echo '✅ Deployment successful!'
        }
        failure {
            echo '❌ Deployment failed. Please check the logs above.'
        }
    }
}