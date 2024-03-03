import { Button, Flex } from '@chakra-ui/react';
import { useSearchParams } from 'react-router-dom';
import { LIMIT } from '../../../common/limit';
import { ImArrowLeft, ImArrowRight } from 'react-icons/im';

const Pagination = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const page = parseInt(searchParams.get('page') || '1');
  const count = parseInt(searchParams.get('count') || '0');
  const limit = LIMIT;

  const currentSearchParams = new URLSearchParams(location.search);

  const hasPrev = page > 1;

  const hasNext = limit * (page - 1) + limit < count;

  const handleChangePage = (type: string) => {
    type === 'prev'
      ? currentSearchParams.set('page', String(page - 1))
      : currentSearchParams.set('page', String(page + 1));

    setSearchParams(currentSearchParams.toString());
  };

  return (
    <Flex justify={'center'} gap={20} py={10}>
      <Button
        variant={'unstyled'}
        _hover={{
          color: !hasPrev ? 'lightgray' : 'blue.200',
          cursor: !hasPrev && 'not-allowed',
        }}
        isDisabled={!hasPrev}
        onClick={() => handleChangePage('prev')}
      >
        <ImArrowLeft size={35} />
      </Button>
      <Button
        variant={'unstyled'}
        _hover={{
          color: !hasNext ? 'lightgray' : 'blue.200',
          cursor: !hasNext && 'not-allowed',
        }}
        onClick={() => handleChangePage('next')}
        isDisabled={!hasNext}
      >
        <ImArrowRight size={35} />
      </Button>
    </Flex>
  );
};

export default Pagination;
