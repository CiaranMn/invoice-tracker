const mongoose = require('mongoose')

mongoose.Promise = global.Promise

mongoose.connect(
  process.env.MONGODB_URI   // use environment variable if set
    || 'mongodb://localhost:27017/invoice_challenge', 
  { 
    useNewUrlParser: true // no problem to use this for our app
    // and it gets rid of warning message about using the old one
  }).then(() => console.log('Connected to database.'))
    .catch(() => {
    // helpful if we can't find the db server to advise and close
    // rather than server hanging indefinitely
      console.log('Cannot connect to database. Exiting.')
      process.exit()
    })

