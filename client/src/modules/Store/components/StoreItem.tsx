import { Box, Flex, FlexProps } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

interface StoreItemProps extends FlexProps {
  children: React.ReactNode;
  _id: string;
  currentStore: string;
}

const StoreItem = ({ children, _id, currentStore }: StoreItemProps) => {
  return (
    <Box
      as={Link}
      to={`?storeid=${_id}`}
      textDecoration={'none'}
      _focus={{ boxShadow: 'none' }}
    >
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: 'blue.200',
          color: '#000',
        }}
        bgColor={currentStore === _id ? 'blue.700' : 'transparent'}
        color={currentStore === _id ? '#fff' : '#000'}
      >
        {children}
      </Flex>
    </Box>
  );
};

export default StoreItem;
