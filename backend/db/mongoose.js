const mongoose = require('mongoose')

mongoose.Promise = global.Promise

const db_uri = process.env.MONGODB_URI   // use environment variable if set
  || 'mongodb://localhost:27017/invoice_challenge'

mongoose.connect(db_uri, { useNewUrlParser: true })
    .then(() => console.log('Connected to database.'))
    .catch(() => {
      console.log(`Cannot connect to database at ${db_uri}. Exiting.`)
      process.exit()
    })   // helpful if we can't find the db server to advise and close
         // rather than server hanging indefinitely.

