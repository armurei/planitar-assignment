import React from 'react'
import { MemoryRouter } from 'react-router'
import { shallow, mount } from 'enzyme'
import App from './App'

describe('rendering', () => {
  it('should render a Switch component', () => {
    const component = shallow(<App />)
    expect(component.find('Switch').length).toBe(1)
  })

  it('should render three Route components', () => {
    const component = shallow(<App />)
    expect(component.find('Route').length).toBe(3)
  })

  it('should render a Home component when the URL is /', () => {
    const component = mount(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    )
    expect(component.find('Home').length).toBe(1)
    expect(component.find('Article').length).toBe(0)
    expect(component.find('EditArticle').length).toBe(0)
  })

  it('should render an Article component when the URL is /:name', () => {
    const component = mount(
      <MemoryRouter initialEntries={['/test']}>
        <App />
      </MemoryRouter>
    )
    expect(component.find('Home').length).toBe(0)
    expect(component.find('Article').length).toBe(1)
    expect(component.find('EditArticle').length).toBe(0)
  })

  it('should render an EditArticle component when the URL is /edit/:name', () => {
    const component = mount(
      <MemoryRouter initialEntries={['/edit/page1']}>
        <App />
      </MemoryRouter>
    )
    expect(component.find('Home').length).toBe(0)
    expect(component.find('Article').length).toBe(0)
    expect(component.find('EditArticle').length).toBe(1)
  })
})
