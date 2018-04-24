import React from 'react'

import './index.css'

function TweetCard (props) {
  let {
    userName,
    timestamp,
    text,
    displayName
  } = props

  return (
    <div className='TweetCard'>
      <div className='TweetCard-Header'>
        <div className='TweetCard-UserInfo'>
          <span className='TweetCard-DisplayName'>{displayName}</span>
          &nbsp;-&nbsp;
          <span className='TweetCard-User'>{userName}</span>
        </div>
      </div>
      <div className='TweetCard-Text'>
        {text}
      </div>
      <time className='TweetCard-Time'>{new Date().toDateString()}</time>
    </div>
  )
}

TweetCard.defaultProps = {
  userName: '@griecomv',
  timestamp: 12312312312,
  displayName: 'Mario Grieco',
  text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
}

export default TweetCard
