// the db/mongoose file opens our db connection
require('./db/mongoose')

// we will also start the server listening separately in index.js
// so we can skip opening a db connection and port when testing
const app = require('./server')
const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Server listening on port ${port}.`))