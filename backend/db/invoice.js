const mongoose = require('mongoose')

const InvoiceSchema = new mongoose.Schema ({
  company: {
    type: String,
    required: [true, 'Must specify the company owing under `company`']
  },
  due: {
    type: Date,
    required: [true, 'Must specify the due date under `due`']
  },
  service: {
    type: String,
    required: [true, 'Must specify the service provided under `service`']
  },
  value: {
    type: Number,
    required: [true, 'Must specify the invoice value under `value`']
  },
  paidStatus: {
    type: Boolean,
    default: false
  },
  paidDate: {
    type: Date,
    required: [
      function() { return this.paidStatus },
      // required if attempting to set paid true
      'Must specify the date paid'
    ]
  }
}, { 
  versionKey: false  // we don't expect repeated iteration of invoices
})

const Invoice = mongoose.model('Invoice', InvoiceSchema)

module.exports = { Invoice }

