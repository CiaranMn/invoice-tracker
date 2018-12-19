const request = require('supertest')
const sinon = require('sinon')
const expect = require('chai').expect

const app = require('../server')
const {Invoice} = require('../db/invoice')

const invoices = [
  {
    "paidStatus": false,
    "_id": "5c18f346e5c52028125c150e",
    "company": "ABC Cars",
    "service": "Maintenance",
    "value": 500,
    "due": "2018-12-30T00:00:00.000Z"
  },
  {
    "paidStatus": false,
    "_id": "5c18f372e5c52028125c1510",
    "company": "XYZ Construction",
    "service": "Building",
    "value": 3000,
    "due": "2019-03-30T00:00:00.000Z"
  }
]

describe('Invoice server', () => {

  let sandbox
  beforeEach(() => sandbox = sinon.createSandbox())
  afterEach(() => sandbox.restore())

  it('It should respond to GET "/invoices" with an array of invoices, under "invoices:"', () => {
    sandbox.stub(Invoice, 'find').resolves(invoices)

    return request(app)
      .get("/invoices")
      .then(response => {
        expect(response.statusCode).to.equal(200)
        expect(response.body).to.eql({invoices})
     })
  })

  it('It should respond to POST "/invoice" with an invoice object, under "invoice:"', () => {
    let invoice = invoices[0]
    sandbox.stub(Invoice.prototype, 'save').resolves(invoice)

    return request(app)
      .post("/invoices")
      .send(invoice)
      .then(response => {
        expect(response.statusCode).to.equal(200)
        expect(response.body).to.eql({ invoice })
      })
  })

  it('It should respond to valid PUT requests with an updated object, under "invoice:"', () => {
    let invoice = invoices[0]
    let updatedInvoice = {}
    sandbox.stub(Invoice, 'findByIdAndUpdate')
      .callsFake((...args) => {
        let updatedFields = args[1]['$set'] // the first argument is the id
        updatedInvoice = Object.assign({...invoice}, updatedFields)
        return Promise.resolve(updatedInvoice)
      })

    return request(app)
      .put("/invoices/5c18f346e5c52028125c150e")
      .send({ paidStatus: true, paidDate: "2018-12-09" }) 
      // this will come through under the $set key as the second argument
      .then(response => {
        expect(response.statusCode).to.equal(200)
        expect(response.body).to.eql({ invoice: updatedInvoice })
      })
  })

  it('It should reject PUT requests with an invalid ID in the params', () => {
    return request(app)
      .put("/invoices/123")
      .then(response => {
        expect(response.statusCode).to.equal(404)
      })
  })

})


