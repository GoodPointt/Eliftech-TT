import {
  Box,
  Card,
  CardBody,
  Flex,
  Heading,
  IconButton,
  Image,
  Stack,
  Text,
} from '@chakra-ui/react';
import { TrashIcon } from '../../../assets/svg';
import { IMedicineData } from '../../../interfaces/store';
import { useEffect, useState } from 'react';
import Counter from './Counter';
import { useLocation } from 'react-router-dom';

interface ICartItemProps {
  data: IMedicineData;
  removeFromCart?: (id: string) => void;
  handleCartItemCount?: (id: string, count: number) => void;
}

const CartItem = ({
  data,
  removeFromCart,
  handleCartItemCount,
}: ICartItemProps) => {
  const { _id, name, imageUrl, price, count = 1 } = data;

  const { pathname } = useLocation();
  const isCart = pathname === '/cart';

  const [updatedCount, setUpdatedCount] = useState<number>(count);

  useEffect(() => {
    handleCartItemCount?.(_id, updatedCount);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updatedCount]);

  return (
    <Card
      direction={{ base: 'column', sm: 'row' }}
      border={'none'}
      overflow="hidden"
      variant="outline"
      maxH={{ base: '600px', md: '160px' }}
      w={'full'}
    >
      <Image
        objectFit="cover"
        maxW={{ base: '100%', sm: '160px' }}
        src={imageUrl}
        alt={`photo of ${name}`}
      />

      <Stack data-type="Stack">
        <CardBody>
          <Heading size="md" textAlign={'left'}>
            {name} {!isCart ? 'x' + count : ''}
          </Heading>
          <Flex mt={'10px'} alignItems={'center'} gap={'20px'}>
            {isCart && (
              <>
                <Counter count={updatedCount} setCount={setUpdatedCount} />

                <IconButton
                  onClick={() => removeFromCart?.(_id)}
                  w={'24px'}
                  h={'24px'}
                  aria-label={`Remove ${name} from cart`}
                  icon={<TrashIcon />}
                />
              </>
            )}
          </Flex>
          <Box>
            <Text py="2" fontSize={'xl'} fontWeight={600} textAlign={'left'}>
              Price: {(price * count).toFixed(1)}£
            </Text>
          </Box>
        </CardBody>
      </Stack>
    </Card>
  );
};

export default CartItem;
