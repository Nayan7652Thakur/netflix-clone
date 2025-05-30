import React, { useEffect, useRef, useState } from 'react'
import './TitleCards.css'
import { Link } from 'react-router-dom';

const TitleCards = ({ title  , category}) => {
  const [apiData, setApiData] = useState([]);
  const cardsRef = useRef();
 
  alert('Need VPN for Access Site.')

  const handleWheel = (e) => {
    e.preventDefault();
    cardsRef.current.scrollLeft += e.deltaY;
  };

  useEffect(() => {
    const apiKey = '4163c9b81ecceaeef09742c9c4c5dd4a'
    const url = `https://api.themoviedb.org/3/movie/${category ? category : 'now_playing'}?api_key=${apiKey}&language=en-US&page=1`;
  
    fetch(url)
      .then(res => res.json())
      .then(data => {
        console.log("TMDB response:", data);
        setApiData(data.results || []);
      })
      .catch(err => console.log(err))
      
  
    if (cardsRef.current) {
      cardsRef.current.addEventListener('wheel', handleWheel);
    }
  
    return () => {
      if (cardsRef.current) {
        cardsRef.current.removeEventListener('wheel', handleWheel);
      }
    };
  }, [category]);  // <-- Add category here!
  

  return (
    <div className='title-cards'>
      <h2>{title || 'Popular on Netflix'}</h2>
      <div className='card-list' ref={cardsRef}>
        {apiData.map((card, index) => (
          <Link to={`/player/${card.id}`} className="card" key={index}>
            <img
              src={`https://image.tmdb.org/t/p/w500${card.backdrop_path}`}
              alt={card.original_title || card.title}
            />
            <p>{card.original_title || card.title}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TitleCards;
