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
    errors: [],
    calendarOpen: false   // whether datepicker is open
  }

  handleInputChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleDateChange = due => {
    this.setState({ due })
    this.toggleCalendar()
  }

  toggleCalendar = event => {
    event && event.preventDefault()
    this.setState({ calendarOpen: !this.state.calendarOpen })
  }

  formSubmit = () => {
    const {company, service, value} = this.state
    let formErrors = []
    if (company === '') { formErrors.push('company') }
    if (service === '') { formErrors.push('service') }
    if (isNaN(parseInt(value))) { formErrors.push('value') }
    if (formErrors.length !== 0) {
      return this.setState({
        errors: formErrors
      })
    } else {
      this.createInvoice()
    }
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
      dateSelected: false,
      errors: []
    })
  }

  render() {

    const { company, service, value, due, errors, calendarOpen } = this.state

    return (
       <tr>
        <td>
          <input 
            type="text"
            name="company"
            value={company} 
            onChange={this.handleInputChange}
            className={errors.indexOf('company') >= 0 ? 'input-error' : null}
          />
        </td>
        <td>
          <input
            type="text"
            name="service"
            value={service}
            onChange={this.handleInputChange}
            className={errors.indexOf('service') >= 0 ? 'input-error' : null}
          />
        </td>
        <td>
          <input
            type="number"
            name="value"
            value={value}
            min={0}
            onChange={this.handleInputChange}
            className={errors.indexOf('service') >= 0 ? 'input-error' : null}
          />
        </td>
        <td>
          <button onClick={this.toggleCalendar}>
            {new Date(due).toLocaleDateString('en-GB')}
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
          <button onClick={this.formSubmit} className='create-button'>
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