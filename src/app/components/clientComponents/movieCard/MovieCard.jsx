import { useState, useEffect } from 'react';
import React from 'react'
import styles from './styles/MovieCard.module.css'
import { Image } from 'react-bootstrap';
import NotAvailablePoster from '../../../../../public/no-poster-available.jpg'


export const MovieCard = ({title, id, description, year, genres=[], imgSrc}) => {
  const [isFavorite, setIsFavorite] = useState(localStorage.getItem(id) === 'true');
  
  useEffect(() => {
    // load favorites when capp initializes
    const storedFavorite = localStorage.getItem(id);
    setIsFavorite(storedFavorite === 'true');
  }, [id]);

  const toggleFavorite = () =>{
    const newIsFavorite = !isFavorite;
    setIsFavorite(newIsFavorite);
    localStorage.setItem(id, newIsFavorite); // Guardar el estado en localStorage
  };
  
  
  return (
    <div className={styles.cardContainer}>
        <div className={styles.imageContainer}>
      <Image src={imgSrc} alt={`movie image of ${title}`}/>
        </div>
        
        <div className={styles.infoContainer}>
            <h2 className={styles.title}>{title}</h2>
            <h3>Year: {year}</h3>
            {/* <p className={styles.description}>{description}</p> */}
              <div className={styles.genres}>
                Genres:
                <ul className={styles.genres}>
                  {genres.map((genre)=>(
                  <span className={styles.description}
                    key={Math.random()}
                  > {genre} |</span>))}
                </ul>
              </div>
        </div>
        <div className={styles.btnsContainer}>
          <button onClick={toggleFavorite}>
            {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
          </button>
        </div>

    </div>
  )
}
