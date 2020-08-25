const functions = require('firebase-functions');
const nunjucks = require('nunjucks');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

const njk = nunjucks.configure('./templates', { autoescape: true })
const globalVariables = require('./data/globalVariables.json');
njk.addGlobal('global', globalVariables.global);

exports.generateHTML = functions.https.onRequest((req, res) => {
  const { templateName, data } = req.body;
  const htmlContent = njk.render(`${templateName}.html`, data);
  res.send(htmlContent)
})
