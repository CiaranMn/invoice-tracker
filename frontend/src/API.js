import 'whatwg-fetch'
import 'promise-polyfill/src/polyfill'

const baseUrl = "http://localhost:3000/invoices"
const headers = { 'Content-Type': 'application/json' }

export const getInvoices = () => {
  return fetch(baseUrl)
    .then(resp => resp.json())
    .then(resp => resp.invoices)
    .catch(err => Promise.reject(`Unable to fetch invoices from server -
    is the server running on ${baseUrl}?`))
}

export const createInvoice = invoice => {
  return fetch(baseUrl, {
    method: 'POST',
    headers,
    body: JSON.stringify(invoice)
  }).then(resp => resp.json())
    .then(resp => {
      if (resp.error) {
        return Promise.reject(resp.error)
      } else {
        return resp.invoice
      }
    })
    .catch(err => Promise.reject(err))
}

export const updateInvoice = invoice => {
  return fetch(baseUrl + `/${invoice._id}`, {
    method: 'PUT',
    headers,
    body: JSON.stringify(invoice)
  }).then(resp => resp.json())
    .then(resp => {
      if (resp.error) {
        return Promise.reject(resp.error)
      } else {
        return resp.invoice
      }
    })
    .catch(err => Promise.reject(err))
}