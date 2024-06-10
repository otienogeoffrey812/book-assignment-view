import React, { useState, useRef, useEffect } from 'react';
import { gql, useQuery } from '@apollo/client';
import { Container, Alert, Snackbar } from '@mui/material';
import SearchBar from '../components/SearchBar';
import SearchList from '../components/SearchList';
import ReadingList from '../components/ReadingList';
import ReadingLevel from '../components/ReadingLevel';
import { Book } from '../types/Book';

const GET_BOOKS = gql`
  query Books {
    books {
      author
      coverPhotoURL
      readingLevel
      title
    }
  }
`;

const Home: React.FC = () => {
  const { loading, error, data } = useQuery<{ books: Book[] }>(GET_BOOKS);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [readingList, setReadingList] = useState<Book[]>([]);
  const [isSearchViewFocused, setIsSearchViewFocused] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [alertOpen, setAlertOpen] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>('');

  const searchListRef = useRef<HTMLDivElement>(null);
  const searchBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const isOutsideSearchBar = searchBarRef.current && !searchBarRef.current.contains(event.target as Node);
      const isOutsideSearchList = searchListRef.current && !searchListRef.current.contains(event.target as Node);

      setIsSearchViewFocused(isOutsideSearchBar === false || isOutsideSearchList === false);
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const searchList = data?.books.filter(book =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  const addToReadingList = (book: Book) => {
    setReadingList(() => {
      const getReadingList = localStorage.getItem('readingList');
      const persistedReadingList: Book[] = getReadingList ? JSON.parse(getReadingList) : [];
      const isBookInList = persistedReadingList.some(item => item.title === book.title);
  
      if (!isBookInList) {
        const newList = [...persistedReadingList, book];
        localStorage.setItem('readingList', JSON.stringify(newList));
        setIsSearchViewFocused(false);
        setAlertMessage('Book added to the reading list!');
        setAlertOpen(true);
        return newList;
      } else {
        setAlertMessage('Book is already in the reading list!');
        setAlertOpen(true);
        return persistedReadingList;
      }
    });
  };
  

  const removeFromReadingList = (title: string) => {
    setReadingList(() => {
      const getReadingList = localStorage.getItem('readingList');
      const persistedReadingList = getReadingList ? [...JSON.parse(getReadingList)] : [];
      const newList = persistedReadingList.filter(book => book.title !== title);
      localStorage.setItem('readingList', JSON.stringify(newList));
      setAlertMessage('Book removed from the reading list!');
      setAlertOpen(true);
      return newList;
    });
  };

  const readingLevels = Array.from(new Set(data?.books.map(book => book.readingLevel))).sort();
  readingLevels.splice(0, 0, 'All Reading Levels');

  const handleAlertClose = () => {
    setAlertOpen(false);
  };

  return (
    <Container sx={{ position: 'relative' }}>
      <Snackbar open={alertOpen} autoHideDuration={3000} onClose={handleAlertClose}>
        <Alert onClose={handleAlertClose} severity="success" sx={{ width: '100%' }}>
          {alertMessage}
        </Alert>
      </Snackbar>
      <div ref={searchBarRef}>
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </div>
      <div ref={searchListRef}>
        {isSearchViewFocused && <SearchList books={searchList} addToReadingList={addToReadingList} />}
      </div>
      <ReadingLevel 
        readingLevels={readingLevels} 
        selectedCategory={selectedCategory} 
        setSelectedCategory={setSelectedCategory}
      />
      <ReadingList 
        readingLevels={readingLevels}  
        readingList={readingList} 
        selectedCategory={selectedCategory} 
        removeFromReadingList={removeFromReadingList} 
      />
    </Container>
  );
};

export default Home;