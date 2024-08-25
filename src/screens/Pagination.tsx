import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

type PaginationProps = {
  booksPerPage: number;
  totalBooks: number;
  currentPage: number;
  paginate: (pageNumber: number) => void;
};

const Pagination: React.FC<PaginationProps> = ({ booksPerPage, totalBooks, currentPage, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalBooks / booksPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <View style={styles.container}>
      {pageNumbers.map(number => (
        <TouchableOpacity
          key={number}
          onPress={() => paginate(number)}
          style={[
            styles.pageButton,
            currentPage === number && styles.selectedPageButton,
          ]}
        >
          <Text style={styles.pageButtonText}>{number}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 20,
  },
  pageButton: {
    marginHorizontal: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#ccc',
    borderRadius: 5,
  },
  selectedPageButton: {
    backgroundColor: '#007BFF',
  },
  pageButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default Pagination;
