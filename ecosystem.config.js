module.exports = {
  apps: [{
    name: 'print-manager',
    script: './src/index.js',

    // Options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file/
    args: '',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production'
    }
  }],

  deploy: {
    production: {
      user: 'ubuntu',
      host: '52.13.196.106',
      ref: 'origin/master',
      repo: 'git@github.com:xybersolve/node-print-manager.git',
      path: '/home/ubuntu/node/print-manager',
      'post-deploy': 'npm install && pm2 reload ecosystem.config.js --env production'
    }
  }
}
