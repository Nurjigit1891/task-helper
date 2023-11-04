import React from 'react'
import './Navbar.scss'
import { Link } from 'react-router-dom'
import FavoriteIcon from '@mui/icons-material/Favorite';


const Navbar = () => {



  return (
    <div>
        <div className="navbar">
            <div className="container">
                <div className="link">
                <Link 
                to='/' 
                className='toMain toCreate'
                >Главная</Link>


                <Link 
                to='/createTask' 
                className='toMain toCreate'
                >Создать задачу</Link>


                <Link 
                to='/faq' 
                className='toMain toCreate'
                >?</Link>

                <Link
                to="/favoriteGroup"
                className='toMain toCreate'>
                <FavoriteIcon />
                </Link>
                
                </div>
            </div>
        </div>
    </div>
  )
}

export default Navbar