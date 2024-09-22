import React, { useState } from 'react'
import './Home.css'
import Header from '../../components/Header/Header'
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu'
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay'
import AppDownload from '../../components/AppDownload/AppDownload'
import { MdKeyboardDoubleArrowUp } from "react-icons/md";

const Home = () => {
   
    const [category,setCategory] = useState("All")
    console.log('home')

  return (
    <div>
      <Header />
      <ExploreMenu category={category} setCategory={setCategory} />
      <FoodDisplay category={category} />
      <AppDownload />
      <a href="#navbar" className="fixed-icon">
        <MdKeyboardDoubleArrowUp className='arrow-icon' />
      </a>
    </div>
  )
}

export default Home
