import { Box, Center, Flex, Text } from '@chakra-ui/react';
import CartList from './components/CartList';
import OrderForm from './components/OrderForm';
import { useEffect } from 'react';
import { useCart } from '../../utils/hooks/useCart';
import { Link } from 'react-router-dom';
import SectionWrapper from '../../components/SectionWrapper';

const Cart = () => {
  const { syncCart, cartItems } = useCart();

  useEffect(() => {
    const cartData = localStorage.getItem('localCart');
    syncCart(cartData ? JSON.parse(cartData) : []);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const totalCartPrice = cartItems.reduce((acc, { count = 1, price }) => {
    return acc + price * count;
  }, 0);

  if (cartItems.length > 0)
    return (
      <SectionWrapper>
        <Flex flexDir={{ base: 'column', md: 'row-reverse' }}>
          <CartList totalCartPrice={totalCartPrice} />
          <OrderForm totalCartPrice={totalCartPrice} cartItems={cartItems} />
        </Flex>
      </SectionWrapper>
    );

  if (cartItems.length === 0)
    return (
      <Center py={'50px'}>
        <Text fontSize={'2xl'}>
          Your cart is empty. Let&apos;s check{' '}
          <Box as={Link} textDecor={'underline'} to={'/'}>
            Store
          </Box>
        </Text>
      </Center>
    );
};

export default Cart;
