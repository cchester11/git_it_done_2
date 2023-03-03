/* eslint-env node */

// dependencies
const express = require('express')
const { engine } = require('express-handlebars')
const path = require('path')
const routes = require('./routes')

const lint_check = require('./lint.js')

const app = express()
// set up handlebars as the view engine for our express middleware
app.engine('hbs', engine({
      extname: '.hbs'
}))
app.set('view engine', 'hbs')
app.set('views', './views')

// tells express to serve the whole folder so that the javascript will be read in the browser
app.use(express.static(path.join(__dirname, 'public')))
app.use('/', routes)

// fire up the server
app.listen(3000, () => {
      lint_check()
      console.log('server running on port 3000')
})