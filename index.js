// var PATH_TO_TEMPLATES = './templates';

// var express = require('express');
// var nunjucks = require('nunjucks');
// var app = express();

// nunjucks.configure(PATH_TO_TEMPLATES, {
//   autoescape: true,
//   express: app
// });

// app.get('/teste', function (req, res) {
//   var data = require('./data/fechamentoMensal.json')
//   return res.render('fechamentoMensal.njk', data);
// });

// app.listen(3000);
// console.log('Server running on port 3000');

var nunjucks = require('nunjucks');

const express = require('express');
const expressNunjucks = require('express-nunjucks');
const app = express();

app.set('views', __dirname + '/templates');

const njk = expressNunjucks(app, {
  watch: true,
  noCache: true
});

app.get('/:page', (req, res) => {
  console.log(req.params.page)
  var data = require(`./data/${req.params.page}.json`)
  res.render(req.params.page, data);
});

app.listen(3000);
console.log('App running on port 3000')