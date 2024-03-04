import { useState } from 'react';
import { Box, Button } from '@chakra-ui/react';
import { useSearchParams } from 'react-router-dom';

const StoreToolbar = () => {
  const [, setSearchParams] = useSearchParams();
  const [activeSort, setActiveSort] = useState({
    sortBy: '',
    sortDir: '',
  });

  const currentSearchParams = new URLSearchParams(location.search);

  const handleSort = (sortBy: string, sortDir: string) => {
    setActiveSort({ sortBy, sortDir });
    currentSearchParams.set('sortBy', sortBy);
    currentSearchParams.set('sortDir', sortDir);
    setSearchParams(currentSearchParams.toString());
  };

  return (
    <Box mb={'20px'}>
      <Button
        onClick={() => {
          handleSort('createdAt', 'asc');
        }}
        color={
          activeSort.sortBy === 'createdAt' && activeSort.sortDir === 'asc'
            ? 'blue.600'
            : 'blue.300'
        }
      >
        Sort by date asc
      </Button>
      <Button
        onClick={() => {
          handleSort('createdAt', 'desc');
        }}
        color={
          activeSort.sortBy === 'createdAt' && activeSort.sortDir === 'desc'
            ? 'blue.600'
            : 'blue.300'
        }
      >
        Sort by date desc
      </Button>
      <Button
        onClick={() => {
          handleSort('price', 'asc');
        }}
        color={
          activeSort.sortBy === 'price' && activeSort.sortDir === 'asc'
            ? 'blue.600'
            : 'blue.300'
        }
      >
        Sort by price asc
      </Button>
      <Button
        onClick={() => {
          handleSort('price', 'desc');
        }}
        color={
          activeSort.sortBy === 'price' && activeSort.sortDir === 'desc'
            ? 'blue.600'
            : 'blue.300'
        }
      >
        Sort by price desc
      </Button>
    </Box>
  );
};

export default StoreToolbar;
