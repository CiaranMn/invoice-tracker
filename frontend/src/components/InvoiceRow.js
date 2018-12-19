import React from 'react'
import PropTypes from 'prop-types'
import DatePicker from "react-datepicker"

import "react-datepicker/dist/react-datepicker.css"

class InvoiceRow extends React.Component {

  state = {
    date: new Date(),     // paid date will default to today when opened
    calendarOpen: false   // whether the datepicker is open or not
  }

  // immediately requests the invoice is updated when paid date set
  handleDateChange = date => {
    this.setState({ date })
    this.toggleCalendar()
    this.props.updateInvoice({
      ...this.props.invoice,
      paidStatus: true,
      paidDate: date
    })
  }

  toggleCalendar = event => {
    event && event.preventDefault()
    this.setState({ calendarOpen: !this.state.calendarOpen })
  }

  render() {
    const { invoice } = this.props

    return (
      <tr>
        <td>{invoice.company}</td>
        <td>{invoice.service}</td>
        <td>{invoice.value}</td>
        <td>{new Date(invoice.due).toLocaleDateString('en-GB')}</td>
        <td>
        {invoice.paidStatus ?
            new Date(invoice.paidDate).toLocaleDateString('en-GB')
              : 
              <button onClick={this.toggleCalendar} className='red-button'>
                Unpaid
              </button> 
            }
          {this.state.calendarOpen &&
            <DatePicker
              selected={this.state.date}
              onChange={this.handleDateChange}
              todayButton={"Today"}
              withPortal  // make calendar a centered modal with overlay
              inline  // don't display an input box (we have a button instead)
              allowSameDay  // allow user to select the already-selected date
              fixedHeight
            />
          }
          </td>
      </tr>
    )
  }
}

export default InvoiceRow

InvoiceRow.propTypes = {
  invoice: PropTypes.object.isRequired,
  updateInvoice: PropTypes.func.isRequired
}