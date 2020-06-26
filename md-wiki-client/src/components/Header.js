import React from 'react'
import { Link } from 'react-router-dom'
import uiStrings from '../constants/uiStrings-EN'
import './Header.css'

function Header ({ name, displayEditButton }) {
  return (
    <div>
      <Link to='/'>
        <button>{uiStrings.homeButton}</button>
      </Link>
      <div className='content'>
        <h2>{name}</h2>
        {displayEditButton &&
          <Link to={`/edit/${name}`}>
            <button className='editButton'>{uiStrings.editButton}</button>
          </Link>}
      </div>
    </div>
  )
}

export default Header
