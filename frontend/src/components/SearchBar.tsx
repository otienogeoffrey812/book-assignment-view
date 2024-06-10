import React from 'react';
import { TextField } from '@mui/material';

interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, setSearchTerm }) => {

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div>
      <TextField
        label="Search books"
        variant="outlined"
        id="searchBox"
        fullWidth
        value={searchTerm}
        onChange={handleSearchChange}
        sx={{
          zIndex: 4,
          backgroundColor: 'white',
          borderRadius: 5,
          marginTop: 2,
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderRadius: 5,
            },
            '&:hover fieldset': {
              borderWidth: 1,
              fontWeight: 'bold',
            },
          },
        }}
      />
    </div>
  );
};

export default SearchBar;
