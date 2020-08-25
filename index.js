const express = require('express');
const expressNunjucks = require('express-nunjucks');
const app = express();
const globalVariables = require('./functions/data/globalVariables.json')

app.set('views', __dirname + '/functions/templates');

const njk = expressNunjucks(app, {
  watch: true,
  noCache: true,
  globals: globalVariables
});

app.get('/:page', (req, res) => {
  console.log(req.params.page)
  var data = require(`./functions/data/${req.params.page}.json`)
  res.render(req.params.page, data);
});

app.listen(3000);
console.log('App running on port 3000')