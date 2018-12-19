import React from 'react'
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'
import { shallow } from 'enzyme'

import App from '../App'
import * as API from '../API'
import InvoiceRow from '../components/InvoiceRow';
import {testArray, newInvoice, updatedInvoice} from './testData'
import NewInvoiceForm from '../components/NewInvoiceForm';

configure({ adapter: new Adapter() })

jest.mock('../API')
API.getInvoices.mockResolvedValue(testArray)
API.createInvoice.mockResolvedValue(newInvoice)
API.updateInvoice.mockResolvedValue(updatedInvoice)

let wrapper = shallow(<App />)

// we'll use this later to force tests to wait for the callback queue to clear
const flushPromises = () => {
  return new Promise(resolve => setImmediate(resolve));
}

describe('<App> fetches and displays data correctly', () => {

  beforeEach(() => {
    wrapper = shallow(<App />);
  })

  it('gets the data from the server and displays it', () => {
    expect(wrapper.find(InvoiceRow)).toHaveLength(3)
  })

  it('sorts the data by unpaid invoices first', () => {
    expect(wrapper.find(InvoiceRow).first().props().invoice.paidStatus)
      .toBeFalsy()
  })

})

describe('<App> handles invoice creation', () => {

  it('displays the add form on button press', () => {
    wrapper.find('button').simulate('click')
    expect(wrapper.find(NewInvoiceForm)).toHaveLength(1)
  })

  it('hides the add form on second button press', () => {
    wrapper.find('button').simulate('click')
    expect(wrapper.find(NewInvoiceForm)).toHaveLength(0)
  })

  it('submits new invoices to the API and adds the response to the list', () => {
    let instance = wrapper.instance()
    const createSpy = jest.spyOn(instance, 'createInvoice')
    instance.createInvoice(newInvoice)
    expect.assertions(2)
    return flushPromises().then(() => {
      expect(createSpy).toHaveBeenCalled()
      expect(wrapper.find(InvoiceRow)).toHaveLength(4)
    })
  })

})

describe ('<App> handles invoice update', () => {

  beforeEach(() => {
    wrapper = shallow(<App />);
  })

  it('submits updates to the API and replaces the invoice in the list', () => {
    let instance = wrapper.instance()
    const updateSpy = jest.spyOn(instance, 'updateInvoice')
    instance.updateInvoice(updatedInvoice)
    expect.assertions(3)
    return flushPromises().then(() => {
      expect(updateSpy).toHaveBeenCalled()
      expect(wrapper.find(InvoiceRow)).toHaveLength(3)
      expect(wrapper.find({invoice: updatedInvoice})).toHaveLength(1)
    })
  })

})