import React from 'react'
import { MemoryRouter } from 'react-router'
import { mount, shallow } from 'enzyme'
import { act } from 'react-dom/test-utils'
import * as api from '../utils/api'
import Article from './Article'

const pageName = 'test'
const mockNameValue = jest.fn(() => pageName)
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({
    name: mockNameValue()
  })
}))

afterAll(() => jest.clearAllMocks())

describe('rendering', () => {
  it('should render a Page component', () => {
    const component = shallow(<Article />)

    expect(component.find('Page').length).toBe(1)
  })

  it('should render a Header component, with the URL as the value of the name prop', () => {
    const component = shallow(<Article />)

    const header = component.find('Header')
    expect(header.length).toBe(1)
    expect(header.prop('name')).toBe(pageName)
    expect(header.prop('displayEditButton')).toBe(true)
  })

  it('should render a ReactCommonmark component, with the content state as the value of the source prop', async () => {
    const content = 'this is content'
    jest.spyOn(api, 'getArticle').mockImplementation(() => Promise.resolve(content))

    await act(async () => {
      const component = mount(
        <MemoryRouter>
          <Article />
        </MemoryRouter>
      )

      setImmediate(() => {
        component.update()
        const commonmark = component.find('ReactCommonmark')
        expect(commonmark.length).toBe(1)
        expect(commonmark.prop('source')).toBe(content)
      })
    })
  })
})
