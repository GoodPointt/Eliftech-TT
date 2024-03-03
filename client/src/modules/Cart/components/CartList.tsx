import { Center, Flex, List, ListItem, Text } from '@chakra-ui/react';
import { useCart } from '../../../utils/hooks/useCart';
import CartItem from './CartItem';

const CartList = ({ totalCartPrice }: { totalCartPrice: number }) => {
  const { removeFromCart, cartItems, handleCartItemCount } = useCart();

  if (cartItems.length > 0)
    return (
      <Flex flexDir={'column'} flex={1}>
        <List w="full" display={'flex'} flexDir={'column'} gap={2}>
          {cartItems.map((item) => (
            <ListItem key={item._id}>
              <CartItem
                data={item}
                removeFromCart={removeFromCart}
                handleCartItemCount={handleCartItemCount}
              />
            </ListItem>
          ))}
        </List>
        <Center>
          <Text fontSize={'2xl'} fontWeight={900}>
            Total price: {totalCartPrice.toFixed(1)}£
          </Text>
        </Center>
      </Flex>
    );
};

export default CartList;
