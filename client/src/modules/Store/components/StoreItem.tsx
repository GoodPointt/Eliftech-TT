import { Box, Flex, FlexProps } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

interface StoreItemProps extends FlexProps {
  children: React.ReactNode;
  _id: string;
}

const StoreItem = ({ children, _id }: StoreItemProps) => {
  return (
    <Box
      as={Link}
      to={`?storeid=${_id}`}
      style={{ textDecoration: 'none' }}
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
          bg: 'cyan.400',
          color: 'white',
        }}
      >
        {children}
      </Flex>
    </Box>
  );
};

export default StoreItem;
