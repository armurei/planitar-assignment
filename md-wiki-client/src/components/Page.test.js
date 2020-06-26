import React from 'react'
import { shallow } from 'enzyme'
import Page from './Page'

describe('rendering', () => {
  it('should render a wrapper div with class "page"', () => {
    const component = shallow(<Page />)
    const wrapper = component.find('div')
    expect(wrapper.length).toBe(1)
    expect(wrapper.hasClass('page')).toBe(true)
  })

  it('should render children prop as child of wrapper div', () => {
    const children = [(<span key={0} />), (<p key={1} />), (<h1 key={2} />)]
    const component = shallow(
      <Page>
        {children}
      </Page>
    )

    const wrapper = component.find('div')
    children.forEach(child => {
      expect(wrapper.contains(child)).toBe(true)
    })
  })
})
