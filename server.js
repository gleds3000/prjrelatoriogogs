var express = require('express')
var faker = require('faker')
var bodyParser = require('body-parser')
var expressLayouts = require('express-ejs-layouts')
var app = express()
const port = process.env.PORT || 5000
var expressValidator = require('express-validator');

var request = require('request');



app.set('view engine', 'ejs')    // Setamos que nossa engine será o ejs
app.use(expressLayouts)          // Definimos que vamos utilizar o express-ejs-layouts na nossa aplicação
app.use(bodyParser.urlencoded({ extended: true })); // Com essa configuração, vamos conseguir parsear o corpo das requisições

app.use(express.static(__dirname + '/public'))

var GogsClient = require('gogs-client');
var api = new GogsClient('https://try.gogs.io/api/v1');



app.listen(port, () => {
    console.log(`A mágica acontece em http://localhost:${port}`)
})
 
app.get('/', (req, res) => {
  res.render('pages/home')
})


app.get('/about', (req, res) => {
  var users = [{
    name: faker.name.findName(),
    email: faker.internet.email(),
    avatar: 'http://placekitten.com/300/300'
  }, {
    name: faker.name.findName(),
    email: faker.internet.email(),
    avatar: 'http://placekitten.com/400/300'
  }, {
    name: faker.name.findName(),
    email: faker.internet.email(),
    avatar: 'http://placekitten.com/500/300'
  }]

  res.render('pages/about', { usuarios: users })
})
 
 
app.get('/contact', (req, res) => {
  res.render('pages/contact')
})

 
app.post('/contact', (req, res) => {
  res.send('Obrigado por entrar em contato conosco, ' + req.body.name + '! Responderemos em breve!')
})

app.get('/relatoriogogs', (req, res) => {
  console.log("reporte teste")
 
  api.searchRepos('gogs', 0, 5).then(function(list) {
  console.log(list.id);
});
})



