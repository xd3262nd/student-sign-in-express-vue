// Server codes
let express =  require('express')

//connect api.js to this server.js
let bodyParser = require('body-parser')
let path = require('path')

let api_routes = require('./routes/api.js')


let app = express()


app.use(express.static(path.join(__dirname, 'student-sign-in-client', 'dist')))


//tell the app to use body-parser
//convert data sent as part of API request into JSON to be used in the app
//convert responses from the server to be used by the client
app.use(bodyParser.json())


// use '/api' to tell aprt from the API routes and other requests to our server
app.use('/api', api_routes)

// Error handlers - for route not found
app.use(function(req, res, next){
    res.status(404).send('Not found')
})

// Error handler for server errors 
app.use(function (err, req, res, next) {
    console.error(err.stack)
    res.status(500).send('Server error')
})


// Start server running 
var server = app.listen(process.env.PORT || 3000, function() {
    console.log('Express server running on port', server.address().port)
})