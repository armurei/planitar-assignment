import React from 'react'
import './Page.css'

function Page ({ children }) {
  return (
    <div className='page'>
      {children}
    </div>
  )
}

export default Page
