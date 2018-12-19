import React from 'react'
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'
import { shallow } from 'enzyme'

import InvoiceRow from '../components/InvoiceRow'
import DatePicker from 'react-datepicker'
import { newInvoice } from './testData'

configure({ adapter: new Adapter() })

let wrapper
let date = new Date("2019-01-15")
const mockUpdate = jest.fn()

describe('<InvoiceRow> allows users to set the paid date', () => {

  beforeEach(() => {
    wrapper = shallow(
    <InvoiceRow invoice={newInvoice} updateInvoice={mockUpdate} />
    )
  })

  it('shows the calendar on button press', () => {
    wrapper.find('button').simulate('click')
    expect(wrapper.find(DatePicker)).toHaveLength(1)
  })

  it('controls the date input through state', () => {
    wrapper.find('button').simulate('click')
    wrapper.find(DatePicker).simulate('change', date)
    expect(wrapper.state().date).toEqual(date)
    wrapper.find('button').simulate('click')
    expect(wrapper.find(DatePicker).first().props().selected).toEqual(date)
  })

  it('calls the date update function correctly', () => {
    wrapper.find('button').simulate('click')
    wrapper.find(DatePicker).simulate('change', date)
    expect(mockUpdate.mock.calls[0][0]).toEqual({
      ...newInvoice,
      paidStatus: true,
      paidDate: date
    })
  })

})
