import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../pages/home/Home'
import SingleGr from '../pages/singleGr/SingleGr'
import CreateTask from '../pages/createTask/CreateTask'
import FAQ from '../pages/faq/FAQ'
import Favorite from '../pages/favorite/Favorite'

const Layout = () => {
  return (
    <div>
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/gr/:id' element={<SingleGr />} />
            <Route path='/createTask' element={<CreateTask />} />
            <Route path='/faq' element={<FAQ />} />
            <Route path='/favoriteGroup' element={<Favorite />} />
        </Routes>
    </div>
  )
}

export default Layout