import React from 'react'
import { assets } from '../../assets/assets'
import './AppDownload.css'

const AppDownload = () => {
  return (
    <div className='app-download' id='app-download'>
      <p>For Better Experience Download<br />FOOD MUNCH App</p>
      <div className="app-download-platforms">
        <img src={assets.play_store} alt='play-store' />
        <img src={assets.app_store} alt='app-store' />
      </div>
    </div>
  )
}

export default AppDownload
