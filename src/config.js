require('babel-polyfill');

const environment = {
  development: {
    isProduction: false
  },
  production: {
    isProduction: true
  }
}[process.env.NODE_ENV || 'development'];

module.exports = Object.assign({
  host: process.env.HOST || 'localhost',
  port: process.env.PORT,
  apiHost: process.env.APIHOST || 'localhost',
  apiPort: process.env.APIPORT,
  app: {
    title: 'Jon Gold',
    description: 'Designer & Engineer',
    head: {
      titleTemplate: 'Jon Gold: %s',
      meta: [
        {name: 'description', content: 'Designer & Engineer'},
        {charset: 'utf-8'},
        {property: 'og:site_name', content: 'Jon Gold'},
        {property: 'og:image', content: 'http://alpha.jon.gold/avatar_og.jpg'},
        {property: 'og:locale', content: 'en_GB'},
        {property: 'og:title', content: 'goldOS'},
        {property: 'og:description', content: 'Jon Gold is an inter-disciplinary designer & engineer. This is his weird website.' },
        {property: 'og:card', content: 'summary'},
        {property: 'og:site', content: '@jongold'},
        {property: 'og:creator', content: '@jongold'},
        {property: 'og:image:width', content: '200'},
        {property: 'og:image:height', content: '200'}
      ]
    }
  },

}, environment);
