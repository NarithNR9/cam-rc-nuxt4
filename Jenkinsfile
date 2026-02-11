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
        stage('📦 Install') {
            steps {
                echo 'Installing with Yarn...'
                // Ensure Yarn is using the lockfile strictly
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
                // Use delete/start for a "hard" refresh if startOrRestart feels stuck
                sh "pm2 delete cam-rc-nuxt || true"
                sh "pm2 start ecosystem.config.cjs --env production"
                sh "pm2 save"
            }
        }
    }
}