import {
  Flex,
  Circle,
  Box,
  Image,
  Badge,
  Icon,
  Tooltip,
  Button,
  GridItem,
} from '@chakra-ui/react';
import { AddedToCartIcon, CartIcon, StarIcon } from '../../../assets/svg';
import { BsStar, BsStarFill, BsStarHalf } from 'react-icons/bs';
import { IMedicineData } from '../../../interfaces/store';
import { useCart } from '../../../utils/hooks/useCart';
import { Link } from 'react-router-dom';

interface RatingProps {
  rating: number;
  numReviews: number;
}

function Rating({ rating, numReviews }: RatingProps) {
  return (
    <Box display="flex" alignItems="center">
      {Array(5)
        .fill('')
        .map((_, i) => {
          const roundedRating = Math.round(rating * 2) / 2;
          if (roundedRating - i >= 1) {
            return (
              <BsStarFill
                key={i}
                style={{ marginLeft: '1' }}
                color={i < rating ? 'teal.500' : 'gray.300'}
              />
            );
          }
          if (roundedRating - i === 0.5) {
            return <BsStarHalf key={i} style={{ marginLeft: '1' }} />;
          }
          return <BsStar key={i} style={{ marginLeft: '1' }} />;
        })}
      <Box as="span" ml="2" color="gray.600" fontSize="sm">
        {numReviews} review{numReviews > 1 && 's'}
      </Box>
    </Box>
  );
}

function MedicineItem({
  data,
  handleFavorite,
  handleAddToCart,
}: {
  data: IMedicineData;
  handleFavorite: (id: string) => void;
  handleAddToCart: (id: string) => void;
}) {
  const {
    _id,
    name,
    imageUrl,
    price,
    rating,
    numReviews,
    isFavorite,
    isNew,
    isCartItem,
  } = data;

  const { addToCart } = useCart();

  return (
    <GridItem>
      <Box
        bg={'white'}
        maxW="sm"
        rounded="lg"
        shadow="lg"
        position="relative"
        _hover={{
          filter: 'brightness(1.1)',
        }}
        css={{
          '&:hover img': {
            transform: 'scale(1.1)',
          },
        }}
        transition={'0.3s all ease'}
        overflow={'hidden'}
      >
        <Box overflow={'hidden'}>
          {isNew && (
            <Circle
              size="10px"
              position="absolute"
              top={3}
              right={3}
              bg="red.200"
              zIndex={3}
            />
          )}
          <Tooltip
            label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            bg="white"
            placement={'top'}
            color={'gray.800'}
            fontSize={'1.2em'}
          >
            <Button
              type="button"
              onClick={() => {
                handleFavorite(_id);
              }}
              w={'30px'}
              h={'30px'}
              pos={'absolute'}
              top={2}
              left={2}
              p={0}
              variant={'ghosted'}
              _hover={{ fill: 'yellow.400' }}
              fill={isFavorite ? 'yellow.400' : 'none'}
              zIndex={3}
            >
              <Icon as={StarIcon} />
            </Button>
          </Tooltip>

          <Image
            transition={'0.3s all ease'}
            src={imageUrl}
            alt={`Picture of ${name}`}
            roundedTop="lg"
            h={'190px'}
            w={'300px'}
            objectFit={'cover'}
          />
        </Box>

        <Box p="6">
          <Box display="flex" alignItems="baseline">
            {isNew && (
              <Badge rounded="full" px="2" fontSize="0.8em" colorScheme="red">
                New
              </Badge>
            )}
          </Box>
          <Flex mt="1" justifyContent="space-between" alignContent="center">
            <Box
              fontSize="2xl"
              fontWeight="semibold"
              as="h4"
              lineHeight="tight"
              isTruncated
            >
              {name}
            </Box>
            <Tooltip
              label={isCartItem ? 'Order now' : 'Add to cart'}
              bg="white"
              placement={'top'}
              color={'gray.800'}
              fontSize={'1.2em'}
            >
              {isCartItem ? (
                <Link to={'/cart'}>
                  <Icon as={AddedToCartIcon} alignSelf={'center'} />
                </Link>
              ) : (
                <Button
                  w={'40px'}
                  h={'40px'}
                  variant={'ghosted'}
                  p={0}
                  type="button"
                  display={'flex'}
                  onClick={() => {
                    handleAddToCart(data._id);
                    addToCart(data);
                  }}
                >
                  <Icon as={CartIcon} alignSelf={'center'} />
                </Button>
              )}
            </Tooltip>
          </Flex>

          <Flex justifyContent="space-between" alignContent="center">
            <Rating rating={rating} numReviews={numReviews} />
            <Box fontSize="2xl" color={'gray.800'}>
              <Box as="span" color={'gray.600'} fontSize="lg">
                £
              </Box>
              {price.toFixed(2)}
            </Box>
          </Flex>
        </Box>
      </Box>
    </GridItem>
  );
}

export default MedicineItem;
