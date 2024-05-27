"use client"
import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';
import { MovieCard } from './movieCard/MovieCard';
import mockDataMovies from '../../../../public/mockDataMovies.json'


const options = {
  method: 'GET',
  url: 'https://imdb-top-100-movies.p.rapidapi.com/',
  headers: {
    'x-rapidapi-key': 'bbf07d3af0mshbf83338a42ab25fp1ac141jsn3bb9e8cbdce3',
    'x-rapidapi-host': 'imdb-top-100-movies.p.rapidapi.com'
  }
};

const ScrollInfiniteList = ({ initialItems, initialPage }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    // initial call when the component has been mounted
    fetchData();
  }, []);

  const fetchData = async () => {
    // setLoading(true);
    try {
      // const response = await axios.request(options);
      // const response = await fetch('../../../../public/mockDataMovies.json')
      const response = {
        data: mockDataMovies
      };
      console.log("response", response)
      const {data} = response
      console.log("data", data)
      setItems(data)
      // setData(response.data);
      // setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      // setLoading(false);
    }
  };


    // const fetchItems = async () => {
    //     try {
    //       const response = await axios.request(options);
    //       console.log(response.data);
    //       const newItems = response.data;
    
    //     //   if (newItems.length > 0) {
    //     //     setItems((prevItems) => [...prevItems, ...newItems]);
    //     //     setPage(page + 1);
    //     //   } else {
    //     //     // setHasMore(false);
    //     //   }
    //     } catch (error) {
    //       console.error('Error fetching items:', error);
    //     //   setHasMore(false);
    //     }
    // }

  return (
    <div>
     <h1>Movies List</h1>  
     <ul>
        {items.map((item) => (
          <li key={item.title + Math.random()}>
              <MovieCard 
                title={item.title}
                description={item.extract}
                year={item.year}
                genres={item.genres}
                imgSrc={item.thumbnail}
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

export const getServerSideProps = async () => {
    const response = await axios.request(options);
    const initialItems = response.data;
  
    return {
      props: {
        initialItems,
        initialPage: 2,
      },
    };
  };

export default ScrollInfiniteList;
