import { Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import { useSearchParams } from 'react-router-dom';
import { useDebouncedCallback } from 'use-debounce';

const Search = () => {
  const [, setSearchParams] = useSearchParams();

  const handleSearch = useDebouncedCallback((e) => {
    const currentSearchParams = new URLSearchParams(location.search);
    if (e.target.value) {
      currentSearchParams.delete('count');
      currentSearchParams.set('search', e.target.value);
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
        variant={'unstyled'}
        placeholder="Search by medicine name..."
        type="search"
        onChange={(e) => {
          handleSearch(e);
        }}
      />
    </InputGroup>
  );
};

export default Search;
