import React from 'react'
import { MemoryRouter } from 'react-router'
import { shallow, mount } from 'enzyme'
import Header from './Header'
import App from '../App'
import uiStrings from '../constants/uiStrings-EN'

describe('rendering', () => {
  it('should render a home button', () => {
    const component = shallow(<Header />)
    const button = component.find('button')
    expect(button.text()).toBe(uiStrings.homeButton)
  })

  it('should render an edit button only if the displayEditButton prop is true', () => {
    const component = shallow(<Header />)
    expect(component.find('button').length).toBe(1)

    component.setProps({ displayEditButton: true })
    expect(component.find('button').length).toBe(2)
    expect(component.find('button').at(1).text()).toBe(uiStrings.editButton)
  })

  it('should render the name prop as text in an h2 component', () => {
    const name = 'Page 1'
    const component = shallow(<Header name={name} />)

    const h2 = component.find('h2')
    expect(h2.length).toBe(1)
    expect(h2.text()).toBe(name)
  })
})

describe('events', () => {
  it('should navigate App to the home page when the home button is clicked', () => {
    const app = mount(
      <MemoryRouter initialEntries={['/page1']}>
        <App />
      </MemoryRouter>
    )
    expect(app.find('Home').length).toBe(0)

    const header = app.find('Header')
    const button = header.find('button').at(0)

    button.simulate('click', { button: 0 })
    expect(app.find('Home').length).toBe(1)
  })

  it('should navigate App to the edit page when the edit button is clicked', () => {
    const app = mount(
      <MemoryRouter initialEntries={['/page1']}>
        <App />
      </MemoryRouter>
    )
    expect(app.find('Home').length).toBe(0)

    const header = app.find('Header')
    const button = header.find('button').at(1)

    button.simulate('click', { button: 0 })
    expect(app.find('EditArticle').length).toBe(1)
  })
})
