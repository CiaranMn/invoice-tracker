import React from 'react'

import './App.css'
import * as API from './API'
import InvoiceRow from './components/InvoiceRow'
import NewInvoiceForm from './components/NewInvoiceForm';

class App extends React.Component {

  state = {
    invoices: [],
    showNewForm: false
  }

  componentDidMount() {
    this.attemptInvoiceFetch()
  }

  attemptInvoiceFetch = () => {
    this.setState({
      loading: true,
      loadingMsg: 'Waiting to get invoice data from server...'
    })
    API.getInvoices()
      .then(invoices => {
        this.setState({ loading: false })
        this.sortAndSetInvoices(invoices)
      })
      .catch(err => {
        this.setState({
          loadingMsg: 'Could not contact server. Trying again in a few seconds...'
        })
        setTimeout(() => {
          this.attemptInvoiceFetch()
        }, 5000);
    })
  }

  toggleNewForm = () => {
    this.setState({
      showNewForm: !this.state.showNewForm
    })
  }

  createInvoice = (invoice) => {
    API.createInvoice(invoice)
      .then(newInvoice => {
        const invoices = [...this.state.invoices, newInvoice]
        this.sortAndSetInvoices(invoices)
      })
      .catch(err => alert(`There was a problem creating the invoice: ${err}`))
  }

  updateInvoice = (invoice) => {
    API.updateInvoice(invoice)
      .then(updatedInvoice => {
        const invoices = this.state.invoices.map(invoice => 
          invoice._id === updatedInvoice._id ? updatedInvoice : invoice)
        this.sortAndSetInvoices(invoices)
      })
      .catch(err => alert(`There was a problem updating the invoice: ${err}`))
  }

  sortAndSetInvoices = (invoicesToSort) => {
    const invoices = invoicesToSort.sort((a,b) => a.paidStatus - b.paidStatus)
    this.setState({ invoices })
  }

  render() {

    const {showNewForm, invoices, loading, loadingMsg} = this.state
    
    return (
      <div className="app">

        <header className="app-header">

          <div>
            Invoice Tracker
          </div>

          <button onClick={this.toggleNewForm} disabled={loading}>
            {showNewForm ? "Close New Form" : "New Invoice"}
          </button>
          
        </header>

        <table className="invoice-table">

          <thead>
            <tr>
              <th>Company</th>
              <th>Service</th>
              <th>Value</th>
              <th>Due Date</th>
              <th>Paid Date</th>
            </tr>
          </thead>

          <tbody>
            {loading &&
              <tr>
                <td className="loading" colSpan={5}>
                {loadingMsg}
                </td>
              </tr>
            }
            {!loading && showNewForm &&
              <NewInvoiceForm createInvoice={this.createInvoice} />
            }
            {!loading && invoices.map(invoice => 
              <InvoiceRow 
                invoice={invoice}
                key={invoice._id}
                updateInvoice={this.updateInvoice}
              />
            )}
          </tbody>

        </table>

      </div>
    )
  }
}

export default App
