pipeline {
    agent any
    tools {
        nodejs "NodeJS_24"
    }
    stages {
        stage('🚀 Pull Code') {
            steps {
                checkout scm
            }
        }
        stage('📦 Install Dependencies') {
            steps {
                echo 'Installing dependencies with Yarn...'
                // If using Yarn 1 (Classic): yarn install --frozen-lockfile
                // If using Yarn 2+ (Berry): yarn install --immutable
                sh 'yarn install --immutable' 
            }
        }
        stage('🏗️ Build') {
            steps {
                echo 'Building Nuxt 4 project...'
                sh 'yarn build'
            }
        }
        stage('✅ Deploy') {
            steps {
                echo 'Restarting PM2...'
                sh "pm2 startOrRestart ecosystem.config.cjs --env production"
                sh "pm2 save"
            }
        }
    }
}