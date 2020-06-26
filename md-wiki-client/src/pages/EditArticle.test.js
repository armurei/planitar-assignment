import React from 'react'
import { shallow } from 'enzyme'
import { act } from 'react-dom/test-utils'
import * as api from '../utils/api'
import EditArticle from './EditArticle'
import uiStrings from '../constants/uiStrings-EN'

const pageName = 'editTest'
const mockNameValue = jest.fn(() => pageName)
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({
    name: mockNameValue()
  }),
  useHistory: () => ({ push: () => {} })
}))

afterAll(() => jest.clearAllMocks())

describe('rendering', () => {
  it('should render a Page component', () => {
    const component = shallow(<EditArticle />)

    expect(component.find('Page').length).toBe(1)
  })

  it('should render a Header component, with the URL as the value of the name prop', () => {
    const component = shallow(<EditArticle />)

    const header = component.find('Header')
    expect(header.length).toBe(1)
    expect(header.prop('name')).toBe(pageName)
    expect(header.prop('displayEditButton')).toBe(undefined)
  })

  it('should render a ReactCommonmark component only if previewing state is true', () => {
    const component = shallow(<EditArticle />)

    expect(component.find('ReactCommonmark').length).toBe(0)

    const input = component.find('input')
    input.prop('onChange')()
    component.update()
    expect(component.find('ReactCommonmark').length).toBe(1)
  })

  it('should render a form and textarea if previewing state is false', () => {
    const component = shallow(<EditArticle />)

    const form = component.find('form')
    expect(form.length).toBe(1)

    const textarea = form.find('textarea')
    expect(textarea.length).toBe(1)
  })

  it('should render a save button', () => {
    const component = shallow(<EditArticle />)

    const button = component.find('button').at(0)
    expect(button.text()).toBe(uiStrings.saveButton)
  })

  it('should render a cancel button', () => {
    const component = shallow(<EditArticle />)

    const button = component.find('button').at(1)
    expect(button.text()).toBe(uiStrings.cancelButton)
  })

  it('should render a preview toggle', () => {
    const component = shallow(<EditArticle />)

    const label = component.find('label').at(0)
    expect(label.text()).toBe(uiStrings.previewToggle)

    const input = label.find('input')
    expect(input.length).toBe(1)
  })
})

describe('events', () => {
  it('should call api.putArticle when form is submitted', () => {
    const spy = jest.spyOn(api, 'putArticle').mockImplementation(() => Promise.resolve())

    const component = shallow(<EditArticle />)
    const form = component.find('form')

    const mockEvent = { preventDefault: () => {} }

    act(() => {
      form.prop('onSubmit')(mockEvent)
    })
    expect(spy.mock.calls.length).toBe(1)
  })
})
