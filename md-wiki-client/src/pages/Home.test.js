import React from 'react'
import { MemoryRouter } from 'react-router'
import { mount, shallow } from 'enzyme'
import { act } from 'react-dom/test-utils'
import Home from './Home'
import * as api from '../utils/api'
import uiStrings from '../constants/uiStrings-EN'

describe('rendering', () => {
  it('should render a Page component', () => {
    const component = shallow(<Home />)
    expect(component.find('Page').length).toBe(1)
  })

  it('should render a Link component for every entry in the articles state array', async () => {
    const articles = ['page0', 'page1', 'page2']
    jest.spyOn(api, 'getArticles').mockImplementation(() => Promise.resolve(articles))

    await act(async () => {
      const component = mount(
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      )

      setImmediate(() => {
        component.update()
        expect(component.find('Link').length).toBe(articles.length)
      })
    })
  })

  it('should render uiStrings.homeHeader as text within an h2 component', () => {
    const component = shallow(<Home />)
    const h2 = component.find('h2')
    expect(h2.text()).toBe(uiStrings.homeHeader)
  })

  it('should render uiStrings.articlesListHeader as text within an h4 component', () => {
    const component = shallow(<Home />)
    const h4 = component.find('h4')
    expect(h4.text()).toBe(uiStrings.articlesListHeader)
  })
})
