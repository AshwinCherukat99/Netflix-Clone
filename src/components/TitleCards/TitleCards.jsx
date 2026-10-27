import React,{useEffect, useRef,useState} from 'react'
import './TitleCards.css' 
import cards_data from '../../assets/cards/Cards_data'
import {Link} from 'react-router-dom'

const TitleCards = ({title,category}) => { 
  const [apiData,setApiData]=useState([])
  const cardsRef=useRef() 
  const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyYzBiYzAxOTMxNTU0ZTY3Yzc0N2RmN2RiYmY0NjJjYSIsIm5iZiI6MTc3OTQyMDY3OC45NzMsInN1YiI6IjZhMGZjZTA2OTlkYTRjNjlmNDYzNmM3YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.mavJPx04VpXcIZ1iS4o2IFA9XpX1z0o7XYAmKvj4E3o'
  }
};


const handleWheel=(event)=>{
  event.preventDefault()
  cardsRef.current.scrollLeft+=event.deltaY
}
useEffect(()=>{ 
  fetch(`https://api.themoviedb.org/3/movie/${category?category:"now_playing"}?language=en-US&page=1`, options)
  .then(res => res.json())
  .then(res => setApiData(res.results))
  .catch(err => console.error(err));
  cardsRef.current.addEventListener('wheel',handleWheel)
},[])
console.log(apiData)
  return (
    <div className='titlecards'>
      <h2>{title?title:"Popular on Netflix"}</h2>
      <div className='card-list' ref={cardsRef}>
        {apiData.map((card,index)=>{
          return <Link to={`/player/${card.id}`} className='card' key={index}>
            <img src={`https://image.tmdb.org/t/p/w500`+card.backdrop_path} alt="" />
            <p>{card.original_title}</p>
          </Link>
        })}
      </div>
    </div>
  )
}

export default TitleCards
