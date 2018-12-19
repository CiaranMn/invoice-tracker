import React from 'react'
import PropTypes from 'prop-types'
import DatePicker from "react-datepicker"

import "react-datepicker/dist/react-datepicker.css"

class NewInvoiceForm extends React.Component {

  state = {
    company: '',
    service: '',
    value: 0,
    due: new Date(),
    dateSelected: false,  // whether user has selected a due date
    calendarOpen: false   // whether datepicker is open
  }

  handleInputChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleDateChange = due => {
    this.setState({ 
      due,
      dateSelected: true
    })
    this.toggleCalendar()
  }

  toggleCalendar = event => {
    event && event.preventDefault()
    this.setState({ calendarOpen: !this.state.calendarOpen })
  }

  createInvoice = () => {
    const {company, service, value, due} = this.state
    this.props.createInvoice({
      company,
      service,
      value,
      due
    })
    this.setState({ // clear the form
      company: '',
      service: '',
      value: 0,
      due: new Date(),
      dateSelected: false
    })
  }

  render() {

    const {company, service, value, due, dateSelected, calendarOpen} = this.state

    return (
      <tr>
        <td>
          <input 
            type="text"
            name="company"
            value={company} 
            onChange={this.handleInputChange}
          />
        </td>
        <td>
          <input
            type="text"
            name="service"
            value={service}
            onChange={this.handleInputChange}
          />
        </td>
        <td>
          <input
            type="number"
            name="value"
            value={value}
            onChange={this.handleInputChange}
          />
        </td>
        <td>
          <button onClick={this.toggleCalendar}>
            {dateSelected ? new Date(due).toLocaleDateString() : 'Due Date'}
          </button>
          {calendarOpen &&
            <DatePicker
              selected={due}
              onChange={this.handleDateChange}
              todayButton={"Today"}
              withPortal
              inline
              allowSameDay
              fixedHeight
            />
          }
        </td>
        <td>
          <button onClick={this.createInvoice} className='create-button'>
            Create
          </button>
        </td>
      </tr>
    )
  }
}

export default NewInvoiceForm

NewInvoiceForm.propTypes = {
  createInvoice: PropTypes.func.isRequired
}