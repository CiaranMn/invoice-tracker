// the db/mongoose file opens our db connection
require('./db/mongoose')

// uncomment the next line to seed on load - will wipe existing collection!
// require ('./db/seeds')

// we will also start the server listening separately in index.js
// so we can skip opening a db connection and port when testing
const app = require('./server')
const port = process.env.PORT || 3003
app.listen(port, () => console.log(`Server listening on port ${port}.`))