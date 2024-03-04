import { useEffect, useState } from 'react';
import MedicineItem from './MedicineItem';
import { Center, Grid, Spinner, Text } from '@chakra-ui/react';
import { fetchMedicines } from '../../../api/data';
import { IMedicineData } from '../../../interfaces/store';
import { useSearchParams } from 'react-router-dom';
import { useCart } from '../../../utils/hooks/useCart';
import { checkIsNew } from '../../../utils/helpers/checkIsNew';

const MedicinesGrid = ({
  isPending,
  setIsPending,
}: {
  isPending: boolean;
  setIsPending: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [medicines, setMedicines] = useState<IMedicineData[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [hasCheked, setHasCheked] = useState<boolean>(false);

  const [searchParams, setSearchParams] = useSearchParams();

  const { syncCart, cartItems } = useCart();

  const search = searchParams.get('search') ?? '';
  const page = searchParams.get('page') ?? '';
  const storeid = searchParams.get('storeid') ?? '';
  const sortBy = searchParams.get('sortBy') ?? '';
  const sortDir = searchParams.get('sortDir') ?? '';

  useEffect(() => {
    const favsData = localStorage.getItem('localFavorites');
    setFavorites(favsData ? JSON.parse(favsData) : []);

    const cartData = localStorage.getItem('localCart');
    syncCart(cartData ? JSON.parse(cartData) : []);

    setHasCheked(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    (async () => {
      setIsPending(true);

      const res = await fetchMedicines({
        page,
        search,
        storeid,
        sortBy,
        sortDir,
      });

      if (!res) {
        setIsPending(false);
        return setMedicines([]);
      }

      const { data, count } = res;

      const dataWithFavs = syncDataWithFavsAndCart(data);

      if (!sortBy) setMedicines(dataWithFavs);
      else {
        const sortedDataWidthFavs = sortDataWithFavs(dataWithFavs);
        setMedicines(sortedDataWidthFavs);
      }

      if (count) {
        const currentSearchParams = new URLSearchParams(location.search);
        currentSearchParams.set('count', count);
        setSearchParams(currentSearchParams.toString());
      }

      setIsPending(false);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasCheked, search, storeid, page, sortBy, sortDir]);

  useEffect(() => {
    if (hasCheked)
      localStorage.setItem('localFavorites', JSON.stringify(favorites));
  }, [favorites, hasCheked]);

  const handleFavorite = (id: string) => {
    setFavorites((prevFavorites) => {
      const favIdx = prevFavorites.findIndex((fav) => fav === id);
      if (favIdx === -1) {
        return [...prevFavorites, id];
      } else {
        return prevFavorites.filter((fav) => fav !== id);
      }
    });

    setMedicines((prev) =>
      prev.map((med) => {
        if (med._id === id) {
          if (!med.isFavorite) {
            return { ...med, isFavorite: true };
          } else return { ...med, isFavorite: false };
        } else return med;
      })
    );
  };

  const handleAddToCart = (id: string) => {
    setMedicines((prev) =>
      prev.map((med) => {
        if (med._id === id) {
          if (!med.isCartItem) {
            return { ...med, isCartItem: true, count: 1 };
          } else return { ...med, isCartItem: false };
        } else return med;
      })
    );
  };

  const syncDataWithFavsAndCart = (data: IMedicineData[]) => {
    const dataWithFavs = data.map((item) => {
      const isFavorite = favorites.some((fav) => fav === item._id);
      const isCartItem = cartItems.some(({ _id }) => _id === item._id);
      const isNew = checkIsNew(item.createdAt);

      return { ...item, isFavorite, isCartItem, isNew };
    });

    return dataWithFavs;
  };

  const sortDataWithFavs = (data: IMedicineData[]) => {
    const favoriteMedicines = data.filter((medicine) => medicine.isFavorite);
    const nonFavoriteMedicines = data.filter(
      (medicine) => !medicine.isFavorite
    );

    return favoriteMedicines.concat(nonFavoriteMedicines);
  };

  if (!isPending && medicines.length > 0)
    return (
      <Grid
        as={'ul'}
        gridTemplateColumns={'repeat(auto-fill, minmax(230px, 1fr))'}
        gridGap={'12px'}
      >
        {medicines.map((med) => (
          <MedicineItem
            key={med._id}
            data={med}
            handleFavorite={handleFavorite}
            handleAddToCart={handleAddToCart}
          />
        ))}
      </Grid>
    );

  if (isPending)
    return (
      <Center height={'320px'}>
        <Spinner
          thickness="15px"
          speed="0.65s"
          emptyColor="gray.300"
          color="blue.500"
          size="xl"
        />
      </Center>
    );
  if (medicines.length === 0) return <Text size={'xl'}>Nothing found.</Text>;
};

export default MedicinesGrid;
