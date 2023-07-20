const express = require('express');
const expressNunjucks = require('express-nunjucks');
const nunjucks = require('nunjucks');
const app = express();
const globalVariables = require('./functions/data/globalVariables.json')

app.set('views', __dirname + '/functions/templates');
app.use(express.json())

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


const njkRaw = nunjucks.configure('./functions/templates', { autoescape: true })
njkRaw.addGlobal('global', globalVariables.global);
// Post request that returns the nunjucks generated html
app.post('/:page', (req, res) => {
  // var data = require(`./functions/data/${req.params.page}.json`)
  const data = req.body
  console.log(data)
  const htmlContent = njkRaw.render(`${req.params.page}.html`, data)
  res.set('Content-Type', 'text/html')
  res.send(Buffer.from(htmlContent))
})

app.listen(3000);
console.log('App running on port 3000')