import React, { useEffect, useState } from 'react';
import { motion } from "framer-motion";
import './Home.scss';
import Navbar from '../../components/navbar/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

   


const Home = () => {
    const [grs, setGrs] = useState([]);
    const [filterGr, setFilterGr] = useState([]);
    const [searchText, setSearchText] = useState(''); // Стейт для текста поиска
    const [showDragon, setShowDragon] = useState(false); // для дракона
    const navigate = useNavigate();

    const a = useSelector(state => state.grMini)

    // для анимации 
    const divVariants = {
        visible: i => ({
            opacity: 1 ,
            transition: {
                delay: i * 0.2,
            }
        }),
        hidden: {
            opacity: 0
        }
    }

    
    useEffect(() => {
        const randomNum = Math.floor(Math.random() * 10);
        if (randomNum === 0 || randomNum === 4 || randomNum === 7) {
            setShowDragon(true);

        } else {
            setShowDragon(false);
        }
        
    
        setGrs(a);
        setFilterGr(a);
    }, [a]);
    

    // Обработчик изменения значения инпута поиска
    const handleSearchChange = (e) => {
        setSearchText(e.target.value);
        filterGroups(e.target.value); // Фильтрация групп при изменении текста поиска
    };

    // Функция для фильтрации групп
    const filterGroups = (search) => {
        const filteredGroups = grs.filter((gr) =>
            gr.grName.toLowerCase().includes(search.toLowerCase())
        );
        setFilterGr(filteredGroups);
    };

    return (
        <div>
            <div className="home">
                <div className="container">
                    <Navbar />
                    {
                        showDragon && <img className='dragonGif' src="https://steamuserimages-a.akamaihd.net/ugc/933807761346753033/795656C869BF977ED160EC6CE2F598695A8CF6F3/" alt="Cute Dragon" />
                    }
                    <h1 className='home-text-1'>Groups</h1>
                    <input
                        className='home-search-input'
                        type="text"
                        placeholder="Search Groups"
                        value={searchText}
                        onChange={handleSearchChange}
                    />
                    <div 
                        className="groups"
                    >
                        {filterGr.map((gr , i) => (
                            <motion.div 
                                key={gr.id} 
                                className="gr" 
                                onClick={() => {
                                navigate(`/gr/:${gr.id}`) ; }}
                                variants={divVariants}
                                initial="hidden"
                                animate="visible"
                                custom={i}
                            >
                                <Link className='gr-name'>{gr.grName}</Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home
