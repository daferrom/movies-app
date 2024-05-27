"use client"
import React from 'react'
import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';
import { MovieCard } from './movieCard/MovieCard';


// const options = {
//   method: 'GET',
//   url: 'https://imdb-top-100-movies.p.rapidapi.com/',
//   headers: {
//     'x-rapidapi-key': 'bbf07d3af0mshbf83338a42ab25fp1ac141jsn3bb9e8cbdce3',
//     'x-rapidapi-host': 'imdb-top-100-movies.p.rapidapi.com'
//   }
// };

async function fetchMovies(page) {
  console.log("fetched movies executes")
  const res = await fetch(`/api/movies?page=${page}`);
  if (!res.ok) {
    throw new Error('Error fetching movies');
  }
  return res.json();
}

const ScrollInfiniteList = () => {

  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  // fetching initial elements //
  useEffect(() => {
    const loadInitialMovies = async () => {
      try {
        const data = await fetchMovies(1);
        setMovies(data.movies);
        setPage(1);
        setHasMore(1 < data.totalPages);
      } catch (error) {
        console.error('Error loading initial movies:', error);
      }
    };
    loadInitialMovies();
  }, []);

  // fetch more elements //
  const loadMore = useCallback(async () => {
    if (!hasMore) {
      return;
    }
    const nextPage = page + 1;
    try {
      const newMovies = await fetchMovies(nextPage);
      setMovies((prevMovies) => [...prevMovies, ...newMovies.movies]);
      setPage(nextPage);
      setHasMore(nextPage < newMovies.totalPages);
    } catch (error) {
      console.error('Error loading more movies:', error);
    }
  }, [page, hasMore]);


  const handleScroll = useCallback(() => {
    console.log("document.documentElement.scrollTop", document.documentElement.scrollTop)
    console.log("document.documentElement.offsetHeight",document.body.offsetHeight)
    console.log("window.innerHeight",window.innerHeight)
    if (
      document.documentElement.scrollTop >= (window.innerHeight * page * 2)
    ) {
      loadMore();
    }
  }, [loadMore]);
  
  // scroll & fetch handling //
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return (
    <div>
     <h1>Movies List</h1>  
     <ul>
        {movies.map((movie, index) => (
          <li key={index}>
              <MovieCard
                id={index}
                title={movie.title}
                description={movie.extract}
                year={movie.year}
                genres={movie.genres}
                imgSrc={movie.thumbnail}
              />
          </li>
          
    
          // <li key={item.id}>
          //   {item.title}
          //   {/* <button onClick={() => handleFavorite(item.id)}>
          //     {favorites.includes(item.id) ? 'Unfavorite' : 'Favorite'}
          //   </button> */}
          // </li>

        ))}
      </ul>
        <InfiniteScroll
          dataLength={1}
            // next={fetchItems}
            // hasMore={hasMore}
            loader={<h4>Cargando...</h4>}
        >
        {/* {items.map((item, index) => (
          <div key={index} className={styles.item}>
            {item.name}
          </div>
        ))} */}
      </InfiniteScroll>
    </div>
  )

}

export async function getServerSideProps() {
  console.log("getServerSidePropds")
  const data = await fetchMovies(1);
  return {
    props: {
      initialMovies: data.movies,
      initialPage: 1,
      totalPages: data.totalPages,
    },
  };
}
export default ScrollInfiniteList;
