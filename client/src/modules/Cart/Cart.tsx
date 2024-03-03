import { Box, Center, Flex, Heading, Text } from '@chakra-ui/react';
import CartList from './components/CartList';
import OrderForm from './components/OrderForm';
import { useEffect, useState } from 'react';
import { useCart } from '../../utils/hooks/useCart';
import { Link } from 'react-router-dom';
import SectionWrapper from '../../components/SectionWrapper';
import GoogleMap from '../GoogleMap/GoogleMap';

const Cart = () => {
  const [mapAddress, setMapAddress] = useState<string>('');

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
        <Heading mb={10} fontWeight={900} fontSize={'5xl'}>
          Cart
        </Heading>
        <Flex flexDir={{ base: 'column', md: 'row-reverse' }} gap={'20px'}>
          <CartList totalCartPrice={totalCartPrice} />
          <OrderForm
            totalCartPrice={totalCartPrice}
            cartItems={cartItems}
            mapAddress={mapAddress}
          />
        </Flex>
        <GoogleMap setMapAddress={setMapAddress} />
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
