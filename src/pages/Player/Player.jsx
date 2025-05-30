import React, { useEffect, useState } from 'react'
import './Player.css'
import back_arrow_icon from "../../assets/back_arrow_icon.png"
import { useNavigate, useParams } from 'react-router-dom'

const Player = () => {

const {id} = useParams()
const navigate = useNavigate()

  const [apiData , setApiData] = useState({
    name : "",
    key:"",
    published_at : "",
    typeof : ""
  })

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MTYzYzliODFlY2NlYWVlZjA5NzQyYzljNGM1ZGQ0YSIsIm5iZiI6MTc0ODUxMDU3NC4xNTkwMDAyLCJzdWIiOiI2ODM4Mjc2ZWQ4Y2E3NGE5ZGFiNmM4YzAiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.-xbhGnaauF2yn0uaqGWPGbAyxUjXfCii8te-Qtwh2d4'
    }
  };
  
useEffect(() => {
  fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
    .then(res => res.json())
    .then(res => setApiData(res.results[0]))
    .catch(err => console.error(err));

},[])

  return (
    <div className='player'>
      <img onClick={() => navigate(-2)} src={back_arrow_icon} alt="" />
      <iframe src={`https://www.youtube.com/embed/${apiData.key}`} width="90%" height="90%" title="trailer" frameBorder='0' allowFullScreen>
        <div className="player-info">
          <p>
          {apiData.published_at.slice(0,10)}
          </p>
          <p>
            {apiData.name}
          </p>
          <p>
            {apiData.typeof}
          </p>
        </div>
      </iframe>
    </div>
  )
}

export default Player