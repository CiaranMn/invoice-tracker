const expect = require('chai').expect

const {Invoice} = require('../db/invoice')

describe('Invoice model', () => {
  let invoice = new Invoice({ company: "ABC Cars", due: "2018-12-12", value: 500, service: "Maintenance" })
  let emptyInvoice = new Invoice()

  it('should save an invoice created with valid data', (done) => {
    invoice.validate((err) => {
      expect(err).to.not.exist
      done()
    })
  })

  it('should be invalid if the company is not supplied', (done) => {
    emptyInvoice.validate((err) => {
      expect(err.errors.company).to.exist
      done()
    })
  })

  it('should be invalid if the value is not supplied', (done) => {
    emptyInvoice.validate((err) => {
      expect(err.errors.value).to.exist
      done()
    })
  })

  it('should be invalid if the due date is not supplied', (done) => {
    emptyInvoice.validate((err) => {
      expect(err.errors.due).to.exist
      done()
    })
  })

  it('should be invalid if the service is not supplied', (done) => {
    emptyInvoice.validate((err) => {
      expect(err.errors.service).to.exist
      done()
    })
  })

  it ('should be invalid if paid is set to true without providing a date', (done) => {
    invoice.paidStatus = true
    invoice.validate((err) => {
      expect(err.errors.paidDate).to.exist
      done()
    })
  })

})