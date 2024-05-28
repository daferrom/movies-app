"use client"
import React, { useState, useEffect } from 'react';
import './styles/SearchBar.modules.css'
import dataSuggestions from '../../../__fixtures__/mockDataMovies.json'

const data = dataSuggestions.filter((movie)=>  movie.title !== undefined).map(item => ({title: item.title}))

const SearchBar = ({ onSuggestionClick }) => {
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]); 

    useEffect(() => {
        if (query.length > 2) {
            const filteredSuggestions = data.filter(item =>
                item.title.toLowerCase().includes(query.toLowerCase())
            );
            setSuggestions(filteredSuggestions);
        } else {
            setSuggestions([]);
        }
    }, [query]);

    const handleSuggestionMovieClick = (suggestion) => {
        console.log("suggestion", suggestion)
        onSuggestionClick(suggestion)
        setQuery(''); // Limpia el campo de búsqueda después de la selección
    };

  return (
        <div className="search-bar">
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search..."
            />
            {suggestions.length > 0 && (
                <ul className="suggestions">
                    {suggestions.map((suggestion, index) => (
                        <li key={index} 
                            onClick={() => handleSuggestionMovieClick(suggestion)}
                        >
                            {suggestion.title}
                        </li>
                    ))}
                </ul>
            )}
        </div>
  )
}

export default SearchBar
