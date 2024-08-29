import React, {createContext, useState, useEffect} from 'react';
import axios from 'axios';
import {jsonUrl} from '../utils/constants';

// Create the context
export const BookContext = createContext();

export const BookProvider = ({children}) => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchBooks = async () => {
    try {
      const response = await axios.get(jsonUrl);
      const updatedBooks = response.data.map(book => ({
        ...book,
        thumbnail: book.thumbnail.replace('http://', 'https://'),
        author: 'Chandeli',
        description: 'lorem ipsun lol',
      }));
      setBooks(updatedBooks);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <BookContext.Provider value={{books, fetchBooks, loading, error}}>
      {children}
    </BookContext.Provider>
  );
};
