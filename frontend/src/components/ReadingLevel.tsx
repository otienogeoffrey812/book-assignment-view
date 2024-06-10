import React, { useEffect } from 'react';
import { Chip, Box } from '@mui/material';

interface ReadingLevelProps {
    readingLevels: string[];
    selectedCategory: string | null;
    setSelectedCategory: React.Dispatch<React.SetStateAction<string | null>>
}

const ReadingLevel: React.FC<ReadingLevelProps> = ({ selectedCategory, setSelectedCategory, readingLevels }) => {

  useEffect(() => {
    if (readingLevels.length > 0 && selectedCategory === null) {
      setSelectedCategory(readingLevels[0]);
    }
  }, [readingLevels, selectedCategory, setSelectedCategory]);

  const handleClick = (categoryName: string) => {
    if (selectedCategory === categoryName) { return; }
    setSelectedCategory(categoryName);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        gap: 3,
        flexWrap: 'wrap',
        marginTop: '20px',
        fontWeight: 'bold',
      }}
    >
      {readingLevels.map((categoryName, index) => (
        <Chip
          key={index}
          label={categoryName}
          onClick={() => handleClick(categoryName)}
          color={categoryName === selectedCategory ? 'primary' : undefined}
          clickable
        />
      ))}
    </Box>
  );
};

export default ReadingLevel;