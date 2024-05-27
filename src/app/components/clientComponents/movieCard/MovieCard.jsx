import React from 'react'
import styles from './styles/MovieCard.module.css'
import { Image } from 'react-bootstrap';


export const MovieCard = ({title, description, year, genres=[], imgSrc}) => {
  // const mockData = {
  //   rank: 1,
  //   // title: "The Shawshank Redemption",
  //   // description: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
  //   image: "http://m.media-amazon.com/images/M/MV5BMDFkYTc0MGEtZmNhMC00ZDIzLWFmNTEtODM1ZmRlYWMwMWFmXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_QL75_UX380_CR0,1,380,562_.jpg",
  //   big_image: "http://m.media-amazon.com/images/M/MV5BMDFkYTc0MGEtZmNhMC00ZDIzLWFmNTEtODM1ZmRlYWMwMWFmXkEyXkFqcGdeQXVyMTMxODk2OTU@",
  //   genre: [
  //       "Drama"
  //   ],
  //   thumbnail: "http://m.media-amazon.com/images/M/MV5BMDFkYTc0MGEtZmNhMC00ZDIzLWFmNTEtODM1ZmRlYWMwMWFmXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_UY67_CR0,0,45,67_AL_.jpg",
  //   rating: "9.3",
  //   id: "top1",
  //   year: 1994,
  //   imdbid: "tt0111161",
  //   imdb_link: "https://www.imdb.com/title/tt0111161"
  // }
  
  return (
    <div className={styles.cardContainer}>
        <div className={styles.imageContainer}>
          <Image src={imgSrc} alt="movie image"/>
        </div>
        
        <div className={styles.infoContainer}>
            <h2 className={styles.title}>{title}</h2>
            <h3>Year: {year}</h3>
            {/* <p className={styles.description}>{description}</p> */}
              <p className={styles.genres}>
                Genres:
                <ul className={styles.genres}>
                  {genres.map((genre)=>(
                  <span className={styles.description}
                    key={Math.random()}
                  >{genre}, </span>))}
                </ul>
              </p>
              
            
        </div>
    </div>
  )
}
