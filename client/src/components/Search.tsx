import { Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDebouncedCallback } from 'use-debounce';

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    const searchValue = searchParams.get('search') || '';
    setInputValue(searchValue);
  }, [searchParams]);

  const handleSearch = useDebouncedCallback((value) => {
    const currentSearchParams = new URLSearchParams(location.search);
    if (value) {
      currentSearchParams.delete('count');
      currentSearchParams.set('search', value);
      currentSearchParams.set('page', '1');
      setSearchParams(currentSearchParams.toString());
    } else {
      currentSearchParams.delete('search');
      currentSearchParams.set('page', '1');
      setSearchParams(currentSearchParams.toString());
    }
  }, 300);

  return (
    <InputGroup ml={{ base: 'none', lg: 'auto' }} w={'255px'}>
      <InputLeftElement pointerEvents="none" color="gray.300" fontSize="1.2em">
        🔎
      </InputLeftElement>
      <Input
        px={2}
        py={'5px'}
        value={inputValue}
        variant={'unstyled'}
        placeholder="Search by medicine name..."
        type="search"
        onChange={(e) => {
          const { value } = e.target;
          setInputValue(value);
          handleSearch(value);
        }}
      />
    </InputGroup>
  );
};

export default Search;
