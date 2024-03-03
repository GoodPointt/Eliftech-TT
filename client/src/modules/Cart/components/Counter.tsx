import { Button, Flex, Input } from '@chakra-ui/react';

const Counter = ({
  count,
  setCount,
}: {
  count: number;
  setCount: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const decrement = () => {
    if (count === 1) {
      return;
    }
    setCount(count - 1);
  };

  const increment = () => {
    if (count === 100) {
      return;
    }
    setCount(count + 1);
  };

  return (
    <>
      <Flex
        pos={'relative'}
        alignItems={'center'}
        justifyContent={'center'}
        border={'1px #3B3D46 solid'}
        maxW={'100%'}
        gap={'10px'}
        px={'24px'}
      >
        <Button
          variant={'link'}
          w={'24px'}
          minW={0}
          textColor={'#000'}
          onClick={decrement}
          isDisabled={count <= 1}
        >
          -
        </Button>

        <Input
          type="number"
          h={'max-content'}
          variant={'unstyled'}
          inputMode="numeric"
          // isDisabled={isInBag}
          w={'60px'}
          minH={0}
          p={'9px'}
          border={'1px transparent solid'}
          _focus={{
            border: '#000 1px solid',
            _hover: { border: '#000 1px solid' },
          }}
          _hover={{ border: '1px rgba(255, 255, 255, 0.5) solid' }}
          _disabled={{
            _hover: { border: '1px transparent solid' },
            color: 'rgba(255, 255, 255, 0.5)',
            cursor: 'not-allowed',
          }}
          textAlign={'center'}
          ringColor={'transparent'}
          value={count}
          onBlur={(evt) => {
            (evt.currentTarget.value === '' ||
              parseInt(evt.currentTarget.value) <= 0) &&
              setCount(1);
          }}
          onChange={(evt) => {
            if (evt.currentTarget.value !== '') {
              const value = parseInt(evt.currentTarget.value);
              setCount(value <= 100 ? value : 100);
            } else setCount(1);
          }}
        />

        <Button
          variant={'link'}
          w={'32px'}
          minW={0}
          textColor={'#000'}
          onClick={increment}
          isDisabled={count === 100}
        >
          +
        </Button>
      </Flex>
    </>
  );
};

export default Counter;
