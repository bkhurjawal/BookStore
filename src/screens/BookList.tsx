import axios from 'axios';
import React, {useContext, useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Pagination from '../components/Pagination';
import {
  categories,
  category,
  filterImageUrl,
  jsonUrl,
  navigationConstants,
  title,
} from '../utils/constants';
import {BookContext} from '../Context/BookContext';
import ContentLoader from 'react-native-easy-content-loader';

export type Book = {
  id: number;
  title: string;
  thumbnail: string;
  category: string;
  description: string;
  author: string;
};

type BookListProps = {
  navigation: any;
  route: any;
};

const BookList: React.FC<BookListProps> = ({navigation, route}) => {
  // const [books, setBooks] = useState<Book[]>([]);
  const {books, loading, error} = useContext(BookContext);
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [booksPerPage] = useState(9); // Number of books per page
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [filterBy, setFilterBy] = useState('none');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (route.params?.filter) {
      setFilterBy(route?.params?.filter);
      if (route?.params?.filter === category) {
        setSelectedCategory(categories[0]); //default selection
      }
      setCurrentPage(1);
    }
  }, [route.params?.filter]);

  // Update filteredBooks when searchTerm or selectedCategory changes
  useEffect(() => {
    let filtered = books;

    if (selectedCategory) {
      filtered = filtered.filter(
        (book: {category: string}) => book.category === selectedCategory,
      );
      setSearchTerm('');
    }

    if (searchTerm) {
      filtered = filtered.filter((book: {title: string}) =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase()),
      );
      setSelectedCategory(null);
    }

    setFilteredBooks(filtered);
    setCurrentPage(1); // Reset to the first page whenever filters change
  }, [searchTerm, selectedCategory, books]);

  // Handle category filter
  const handleCategoryClick = (category: string) => {
    if (selectedCategory === category) {
      setSelectedCategory(null); // Deselect category
    } else {
      setSelectedCategory(category);
    }
  };

  // Get current books for the page
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);

  const renderBook = ({item}: {item: Book}) => (
    <TouchableOpacity
      style={styles.bookItem}
      onPress={() =>
        navigation.navigate(navigationConstants.BookDetail, {
          bookdetail: item,
        })
      }>
      <Image
        source={{uri: `${item.thumbnail}?random=${new Date().getTime()}`}}
        style={styles.thumbnail}
      />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.category}>{item.category}</Text>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <>
        <ContentLoader
          avatar
          loading
          aShape={'square'}
          listSize={23}
          // pWidth={[100, 70, 100]}
        />
      </>
    );
  }

  if (error) {
    return <Text>Error fetching books: {error.message}</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <View>
          <Text style={styles.header}>Book Shelf</Text>
        </View>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('Filter', {
              filter: filterBy,
            })
          }>
          <Image
            style={{height: 30, width: 30, resizeMode: 'contain'}}
            source={{
              uri: filterImageUrl,
            }}
          />
        </TouchableOpacity>
      </View>
      {filterBy === category && (
        <>
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
                  selectedCategory === category &&
                    styles.selectedCategoryButton,
                ]}>
                <Text style={styles.categoryButtonText}>{category}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </>
      )}
      {filterBy === title && (
        <>
          <Text style={styles.label}>Search by Title</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter title"
            value={searchTerm}
            onChangeText={setSearchTerm}
          />
        </>
      )}

      {/* Book List with 3 columns */}
      <FlatList
        data={currentBooks}
        renderItem={renderBook}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.bookList}
        numColumns={3} // Display 3 columns
        ListEmptyComponent={() => (
          <View>
            <Text> No books available</Text>
          </View>
        )}
      />

      {/* Pagination Component */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <Pagination
          booksPerPage={booksPerPage}
          totalBooks={filteredBooks.length}
          currentPage={currentPage}
          paginate={pageNumber => setCurrentPage(pageNumber)}
        />
      </ScrollView>
    </View>
  );
};

export const styles = StyleSheet.create({
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
    height: 60,
  },
  categoryButton: {
    marginRight: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#ccc',
    borderRadius: 20,
    height: 40,
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
    padding: 10,
    borderRadius: 10,
    margin: 5,
    alignItems: 'center',
    flex: 1,
    maxWidth: '30%', // ensures that each book occupies roughly 1/3rd of the row
  },
  thumbnail: {
    width: 100,
    height: 150,
    marginBottom: 10,
    resizeMode: 'contain',
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
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
});

export default BookList;
