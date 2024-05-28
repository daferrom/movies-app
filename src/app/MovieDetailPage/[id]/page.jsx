import React from 'react'
import MovieDetails from '../../components/clientComponents/movieDetails/MovieDetails'
import mockDataMovie from '../../../app/__fixtures__/mockDataMovies.json'
import styles from "./styles/page.module.css"
import { Image } from 'react-bootstrap';

const MovieDetailPage =  ({ params }) => {
  const { id } = params;
  console.log("id", id)

  const movieData = mockDataMovie[id]
  console.log("movieData", movieData)
  return (
    <div className={styles.pageContainer}>
      <h1 className={styles.title}>{movieData.title}</h1>
      <section className={styles.sectionContainer}>
        <div className={styles.imageContainer}>
        <Image className={styles.image}src={movieData.thumbnail} alt={`movie image of ${movieData.title}`}/>
        </div>
          
        <div className={styles.contentContainer}>
          <p ><span className={styles.detailInfo}>Year: </span> {movieData.year}</p>
          <p><span className={styles.detailInfo}>Genre: </span> {movieData.genres.join(', ')}</p>
          <span className={styles.detailInfo}>Cast: </span> 
            <ul className={styles.genres}>
                {movieData.cast.map((actor , index)=>(
                    <li className={styles.description}
                      key={index}
                    > 
                      {actor}
                    </li>)
                )}
            </ul>

          <br />
          {/* <p><strong>Description:</strong> 
          <br />
            {movieData.extract}
          </p> */}
          <br />
          <button><a className={styles.link} href={`https://en.wikipedia.org/wiki/${movieData.href}`} target="_blank" rel="noopener noreferrer">...More info on Wikipedia</a></button>
        </div>
      </section>
      <br />
      <section className={styles.description}>
        <p><strong>Description:</strong> 
          <br />
            {movieData.extract}
          </p>
      </section>
    </div>
  )
}

export default MovieDetailPage
