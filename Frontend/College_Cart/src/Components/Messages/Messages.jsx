import React from 'react'
import Header from '../Header/Header'
import "./messages.css"

const Messages = () => {
  return (
    <>
        <Header/>
        <div className='messageContainer'>
            <p className='messageTextNotFound'>Messages Not Found</p>
        </div>
       
    </>
  )
}

export default Messages