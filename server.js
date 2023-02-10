// dependencies
const express = require('express')
const { engine } = require('express-handlebars')
const path = require('path')

const app = express()

// set up handlebars as the view engine for our express middleware
app.engine('handlebars', engine())
app.set('view engine', 'handlebars')
app.set('views', './views')

// tells express to serve the whole folder so that the javascript will be read in the browser
app.use(express.static(path.join(__dirname, 'public')))

// route that renders the index.html on localhost:3000/
app.get('/', (req, res) => {
      res.render('homepage')
})

// fire up the server
app.listen(3000, () => {
      console.log('server running on port 3000')
})