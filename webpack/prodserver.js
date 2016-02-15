const express = require('express');
const path = require('path');
// const webpack = require('webpack');
const app = express();

// const isDevelopment = (process.env.NODE_ENV !== 'production');
const staticPath = path.join(__dirname, '..', 'build');

app.use(express.static(staticPath))
  .get('/', (req, res) => {
    res.sendFile('index.html', {
      root: staticPath,
    });
  }).listen(process.env.PORT || 8080, (err) => {
    if (err) { console.log(err); }
    console.log('Listening at localhost:8080');
  });
