// dependencies
const express = require('express')
const path = require('path')
const app = express()

// tells express to serve the whole folder so that the javascript will be read in the browser
app.use(express.static(path.join(__dirname, 'public')))

// route that renders the index.html on localhost:3000/
app.get('/', (req, res) => {
      res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

// fire up the server
app.listen(3000, () => {
      console.log('server running on port 3000')
})