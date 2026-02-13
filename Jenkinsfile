pipeline {
    agent any
    tools {
        nodejs "NodeJS_24"
    }
    stages {
        stage('🧹 Clean & Pull') {
            steps {
                // Force a clean state by removing the old build folder
                sh 'rm -rf .output .nuxt'
                checkout scm
            }
        }
        stage('📦 Install & Config') {
            steps {
                echo 'Preparing environment...'
                // Copy the persistent secret file into the current workspace
                sh 'cp /var/lib/jenkins/secrets/cam-rc.env .env'
        
                echo 'Installing dependencies with Yarn...'
                sh 'yarn install --immutable'
            }
        }
        stage('🏗️ Build') {
            steps {
                echo 'Building Nuxt 4...'
                sh 'yarn build'
                // Verification: Log the date of the new build folder to Jenkins console
                sh 'ls -ld .output'
            }
        }
        stage('✅ Deploy') {
            steps {
                echo 'Restarting PM2...'
                // Using triple single-quotes (''') for multi-line shell commands
                sh '''
                    # 1. Stop Jenkins from killing this process after the job ends
                    export JENKINS_NODE_COOKIE=dontKillMe
                    
                    # 2. Tell PM2 exactly where the config is
                    export PM2_HOME=/var/lib/jenkins/.pm2
                    
                    # 3. Restart the application
                    pm2 delete cam-rc-nuxt || true
                    pm2 start ecosystem.config.cjs --env production
                    pm2 save
                '''
            }
        }
    }
}
