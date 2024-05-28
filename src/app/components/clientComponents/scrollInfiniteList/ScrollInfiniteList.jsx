"use client"
import React from 'react'
import { useState, useEffect, useCallback } from 'react';
import { MovieCard } from '../movieCard/MovieCard';
import './styles/ScrollInfiniteList.modules.css'
import SearchBar from '../searchBar/SearchBar';
import dataSuggestions from '../../../__fixtures__/mockDataMovies.json'


async function fetchMovies(page) {

  const res = await fetch(`/api/movies?page=${page}`);
  if (!res.ok) {
    throw new Error('Error fetching movies');
  }
  return res.json();
}

const ScrollInfiniteList = () => {
  const [movies, setMovies] = useState([]);
  const [originalMovies, setOriginalMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  // fetching initial elements //
  useEffect(() => {
    const loadInitialMovies = async () => {
      try {
        const data = await fetchMovies(1);
        setMovies(data.movies);
        setOriginalMovies(data.movies)
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

  const handleSuggestionClick = (suggestion) => {
    console.log('Suggestion clicked:', suggestion);
    const filteredMovie = dataSuggestions.filter(movie => movie.title === suggestion.title);
    setMovies(filteredMovie);
    // Aquí puedes realizar cualquier acción necesaria con la sugerencia seleccionada
  };

  const resetSearch = () => {
    setMovies(originalMovies)
  }


  return (
    <div className="main-container">
     <h2>Movies List</h2>
      <div className='btn-container'>
          <SearchBar 
              onSuggestionClick={handleSuggestionClick}
          />
          <button className='reset-btn' onClick={resetSearch}>Clear search</button>
      </div>

     <ul className="card-list">
        {movies.map((movie, index) => (
          <li className="card-item" key={index}>
              <MovieCard
                className="card"
                key={index}
                id={index}
                title={movie.title}
                description={movie.extract}
                year={movie.year}
                genres={movie.genres}
                imgSrc={movie.thumbnail}
              />
          </li>
        ))}
      </ul>
    </div>
  )

}


export default ScrollInfiniteList;
