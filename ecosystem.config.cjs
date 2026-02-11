module.exports = {
  apps: [
    {
      name: 'cam-rc-nuxt4',
      port: '3000',
      exec_mode: 'cluster', // Spreads load across CPU cores
      instances: 'max',      // Uses all available CPUs
      script: './.output/server/index.mjs',
    }
  ]
}
