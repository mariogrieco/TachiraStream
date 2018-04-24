import React from 'react'

import './index.css'

function Header () {
  return (
    <div className='Header'>
      <div>Twitter Stream</div>
      <div className='Header-Topic'>
        Live Topic:
        <span className='Header-badge'>Tachira</span>
      </div>
    </div>
  )
}

export default Header
