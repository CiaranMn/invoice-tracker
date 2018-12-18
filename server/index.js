const express = require('express')
const cors = require('cors')
const port = process.env.PORT || 3000
const app = express()

require('./db/mongoose')
const { ObjectID } = require('mongodb')
const {Invoice} = require('./db/invoice')

const corsOptions = { 
  // origin: 'http://FRONT-END-URL',
  origin: '*', // switch this out for frontend deployment URL when known
  method: 'GET, POST, PUT'
}

app.use(cors(corsOptions))
app.use(express.json())

// Catch syntax errors and respond with JSON rather than the default HTML page.
// Should never occur from our frontend app but will make it easier to build
// other apps making use of this API.
app.use((error, request, response, next) => {
  if (error instanceof SyntaxError) {
    return response.status(400).send({ 
      data: "Data formatted incorrectly: " + error 
    })
  } else {
    next()
  }
})

app.get('/invoices', (request, response) => {
  Invoice.find().then(invoices => {
    response.status(200).send({invoices}) 
    // send invoices under a key in case we want to extend data sent later
  }).catch(error => response.status(400).send({error}))
})

app.post('/invoices', (request, response) => {
  let invoice = new Invoice(request.body)
  invoice.save()
    .then(invoice => response.status(200).send({invoice}))
    .catch(error => response.status(400).send({error: error.message}))
})

// PUT is used although we don't currently check that all fields are present. // if only a couple of fields are present, e.g. new paidStatus and paidDate,
// the update will be applied (and other fields left as they are in the db).
app.put('/invoices/:id', (request, response) => {
  const id = request.params.id
  if (!ObjectID.isValid(id)) {  // avoid pointless db calls if id not even valid
    return response.status(404).send({error: "Invoice ID not recognised."})
  }
  const body = request.body
  Invoice.findByIdAndUpdate(id, {$set: body}, {
    new: true,  // we want to return the updated object to the frontend
    runValidators: true,  // force validation, e.g. to check paid date present
  }).then(invoice => {
      if (!invoice) {
        return response.status(404).send({error: "Invoice ID not recognised."})
      }
      response.status(200).send({invoice})
    })
    .catch(error => response.status(400).send({error}))
})


app.listen(port, () => console.log(`Server listening on port ${port}.`))
