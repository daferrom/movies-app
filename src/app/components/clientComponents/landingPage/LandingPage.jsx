"use client"
import React, { useState, useEffect } from 'react';
import ScrollInfiniteList from '../scrollInfiniteList/ScrollInfiniteList'
import SearchBar from '../searchBar/SearchBar'
import dataSuggestions from '../../../__fixtures__/mockDataMovies.json'

const LandingPage = () => {
    const [movies, setMovies] = useState(dataSuggestions);
    const [filteredMovies, setFilteredMovies] = useState([]);

    return (
      <div>
          <ScrollInfiniteList
            filteredMovies={filteredMovies}
          />
      </div>
    )
  }
  export default LandingPage
  