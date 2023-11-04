import React, { useState, useEffect } from 'react'
import './Favorite.scss'
import Navbar from '../../components/navbar/Navbar'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

const Favorite = () => {
  const initialGrs = JSON.parse(localStorage.getItem('favorites') || '[]');
  const [grsFromLS, setGrsFromLS] = useState(initialGrs);
  const [readyID, setReadyID] = useState([]);
  const grsFromRedux = useSelector(state => state.grMini);

  const navigate = useNavigate()

  useEffect(() => {
    const dataFromLS = JSON.parse(localStorage.getItem('favorites') || '[]');
    setGrsFromLS(dataFromLS);
    setReadyID(grsFromLS.map(id => parseInt(id))); 
  }, []);

  // Фильтрация групп по readyID
  const filteredGrs = grsFromRedux.filter(gr => readyID.includes(gr.id));

  return (
    <div>
        <div className="favorite">
            <div className="container">
                <Navbar />

                <h2 className='fav-text-1'>Избранные</h2>

                <div className="fv-groups">
                {filteredGrs.map((gr , i) => (
                  <div 
                    className='gr'
                    key={gr.id} 
                    onClick={() => {
                    navigate(`/gr/:${gr.id}`) ; }}
                    >
                      <Link className='gr-name'>{gr.grName}</Link>
                  </div>
                        ))}
                </div>
            </div>
        </div>
    </div>
  )
}


export default Favorite;
