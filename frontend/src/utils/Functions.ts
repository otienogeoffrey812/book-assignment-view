import { Book } from '../types/Book';

export const getPersistedReadingList = (category: string): Book[] => {
  const getReadingList = localStorage.getItem('readingList');
  const parsedList: Book[] = getReadingList ? JSON.parse(getReadingList) : [];
  const filteredList = parsedList.filter((book: Book) => book.readingLevel === category);
  return category === '' ? parsedList : filteredList;
};
