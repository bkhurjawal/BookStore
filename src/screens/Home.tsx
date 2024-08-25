/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Pagination from './Pagination';

type Book = {
  id: number;
  title: string;
  thumbnail: string;
  category: string;
};
type HomeProps = {
  navigation: any;
};

const categories = [
  'Fiction',
  'Non-Fiction',
  'Science',
  'History',
  'Biography',
  'Fantasy',
];
const Home: React.FC<HomeProps> = ({navigation}) => {
  const [books, setBooks] = useState<Book[]>([]);
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [booksPerPage] = useState(10); // Number of books per page
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const jsonUrl = 'http://jsonkeeper.com/b/FNTL';
  // const jsonUrl = 'https://www.jsonkeeper.com/b/XY62';
  // const jsonUrl = 'https://catfact.ninja/fact';

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get(jsonUrl);
        console.log('response', response.data);
        // setBooks(response.data);
        // setFilteredBooks(response.data);
      } catch (error) {
        console.error('Error fetching the books:', error);
      }
    };
    fetchBooks();
  }, []);

  useEffect(() => {
    fetch(jsonUrl, {
      method: 'GET',
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
      })
      .catch(error => console.log('error fetch', error));
  }, []);

  // Handle category filter
  const handleCategoryClick = (category: string) => {
    if (selectedCategory === category) {
      setSelectedCategory(null); // Deselect category
      setFilteredBooks(books);
    } else {
      setSelectedCategory(category);
      setFilteredBooks(books.filter(book => book.category === category));
    }
    setCurrentPage(1); // Reset to the first page
  };

  // Get current books for the page
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);

  const renderBook = ({item}: {item: Book}) => (
    <View style={styles.bookItem}>
      <Image source={{uri: item.thumbnail}} style={styles.thumbnail} />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.category}>{item.category}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Book List</Text>

      {/* Category Filter */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoryContainer}>
        {categories.map(category => (
          <TouchableOpacity
            key={category}
            onPress={() => handleCategoryClick(category)}
            style={[
              styles.categoryButton,
              selectedCategory === category && styles.selectedCategoryButton,
            ]}>
            <Text style={styles.categoryButtonText}>{category}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Book List */}
      <FlatList
        data={currentBooks}
        renderItem={renderBook}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.bookList}
      />

      {/* Pagination Component */}
      <Pagination
        booksPerPage={booksPerPage}
        totalBooks={filteredBooks.length}
        currentPage={currentPage}
        paginate={pageNumber => setCurrentPage(pageNumber)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  categoryContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  categoryButton: {
    marginRight: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#ccc',
    borderRadius: 20,
  },
  selectedCategoryButton: {
    backgroundColor: '#007BFF',
  },
  categoryButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  bookList: {
    marginBottom: 20,
  },
  bookItem: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    alignItems: 'center',
  },
  thumbnail: {
    width: 100,
    height: 150,
    marginBottom: 10,
    resizeMode: 'cover',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 5,
  },
  category: {
    fontSize: 14,
    color: '#888',
  },
});

export default Home;
