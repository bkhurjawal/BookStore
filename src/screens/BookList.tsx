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
  TextInput,
  Button,
} from 'react-native';
import Pagination from '../components/Pagination';

type Book = {
  id: number;
  title: string;
  thumbnail: string;
  category: string;
};

type BookListProps = {
  navigation: any;
  route: any;
};

const categories = [
  'Fiction',
  'Non-Fiction',
  'Science',
  'History',
  'Biography',
  'Fantasy',
];

const BookList: React.FC<BookListProps> = ({navigation, route}) => {
  const [books, setBooks] = useState<Book[]>([]);
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [booksPerPage] = useState(10); // Number of books per page
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [filterBy, setFilterBy] = useState('none');
  const [searchTerm, setSearchTerm] = useState('');
  const jsonUrl = 'https://www.jsonkeeper.com/b/XY62';

  useEffect(() => {
    if (route.params?.filter) {
      setFilterBy(route?.params?.filter);
    }
  }, [route.params?.filter]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get(jsonUrl);
        const updatedBooks = response.data.map((book: {thumbnail: string}) => ({
          ...book,
          thumbnail: book.thumbnail.replace('http://', 'https://'),
        }));

        setBooks(updatedBooks);
        setFilteredBooks(updatedBooks);
      } catch (error) {
        console.error('Error fetching the books:', error);
      }
    };
    fetchBooks();
  }, []);

  // Update filteredBooks when searchTerm or selectedCategory changes
  useEffect(() => {
    let filtered = books;

    if (selectedCategory) {
      filtered = filtered.filter(book => book.category === selectedCategory);
      setSearchTerm('');
    }

    if (searchTerm) {
      filtered = filtered.filter(book =>
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
    <View style={styles.bookItem}>
      <Image
        source={{uri: `${item.thumbnail}?random=${new Date().getTime()}`}}
        style={styles.thumbnail}
      />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.category}>{item.category}</Text>
    </View>
  );

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
          {/* <Text style={styles.header}>Filter</Text> */}
          <Image
            style={{height: 30, width: 30, resizeMode: 'contain'}}
            source={{
              uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQw5VCiRMI-cC2Gig51nF1tFtSc_rkMEVOvJzIACrtQRjJnAIb_lPhzzuiPvuC5nwJfXBE&usqp=CAU',
            }}
          />
        </TouchableOpacity>
      </View>
      {filterBy === 'category' && (
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
      {filterBy === 'title' && (
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
