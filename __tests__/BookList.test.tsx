import React from 'react';
import {render, fireEvent, waitFor} from '@testing-library/react-native';
import axios from 'axios';
import BookList from '../src/screens/BookList';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('BookList Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render the component correctly', async () => {
    mockedAxios.get.mockResolvedValueOnce({
      data: [
        {
          id: 1,
          title: 'Book Title 1',
          thumbnail: 'https://picsum.photos/200/300',
          category: 'Fiction',
        },
        {
          id: 2,
          title: 'Book Title 2',
          thumbnail: 'https://picsum.photos/200/300',
          category: 'Non-Fiction',
        },
      ],
    });

    const {getByText, getByPlaceholderText} = render(
      <BookList navigation={{navigate: jest.fn()}} route={{params: {}}} />,
    );

    // Wait for the books to be fetched and rendered
    await waitFor(() => {
      expect(getByText('Book Title 1')).toBeTruthy();
      expect(getByText('Book Title 2')).toBeTruthy();
    });
  });

  it('should filter books by category', async () => {
    mockedAxios.get.mockResolvedValueOnce({
      data: [
        {
          id: 1,
          title: 'Book Title 1',
          thumbnail: 'https://picsum.photos/200/300',
          category: 'Fiction',
        },
        {
          id: 2,
          title: 'Book Title 2',
          thumbnail: 'https://picsum.photos/200/300',
          category: 'Non-Fiction',
        },
      ],
    });

    const {getByText, queryByText, getByTestId} = render(
      <BookList navigation={{navigate: jest.fn()}} route={{params: {}}} />,
    );

    await waitFor(() => {
      expect(getByText('Book Title 1')).toBeTruthy();
      expect(getByText('Book Title 2')).toBeTruthy();
    });

    // Click the category filter button
    fireEvent.press(getByText('Fiction'));

    // Only books with category 'Fiction' should be visible
    expect(getByText('Book Title 1')).toBeTruthy();
    expect(queryByText('Book Title 2')).toBeNull();
  });

  it('should search books by title', async () => {
    mockedAxios.get.mockResolvedValueOnce({
      data: [
        {
          id: 1,
          title: 'Book Title 1',
          thumbnail: 'https://picsum.photos/200/300',
          category: 'Fiction',
        },
        {
          id: 2,
          title: 'Book Title 2',
          thumbnail: 'https://picsum.photos/200/300',
          category: 'Non-Fiction',
        },
      ],
    });

    const {getByText, getByPlaceholderText} = render(
      <BookList navigation={{navigate: jest.fn()}} route={{params: {}}} />,
    );

    await waitFor(() => {
      expect(getByText('Book Title 1')).toBeTruthy();
      expect(getByText('Book Title 2')).toBeTruthy();
    });

    // Search for a title
    fireEvent.changeText(getByPlaceholderText('Enter title'), 'Book Title 1');

    // Only books with title containing 'Book Title 1' should be visible
    expect(getByText('Book Title 1')).toBeTruthy();
    expect(getByText('Book Title 2')).toBeNull();
  });

  it('should handle pagination correctly', async () => {
    mockedAxios.get.mockResolvedValueOnce({
      data: Array.from({length: 20}, (_, i) => ({
        id: i + 1,
        title: `Book Title ${i + 1}`,
        thumbnail: 'https://picsum.photos/200/300',
        category: 'Fiction',
      })),
    });

    const {getByText, getByTestId} = render(
      <BookList navigation={{navigate: jest.fn()}} route={{params: {}}} />,
    );

    await waitFor(() => {
      expect(getByText('Book Title 1')).toBeTruthy();
    });

    // Test pagination (assuming Pagination component updates page number)
    fireEvent.press(getByText('2')); // Replace with the actual text or ID for the pagination button
    await waitFor(() => {
      expect(getByText('Book Title 11')).toBeTruthy();
    });
  });
});
