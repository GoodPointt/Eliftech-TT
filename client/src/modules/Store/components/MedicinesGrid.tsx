import { useEffect, useState } from 'react';
import MedicineItem from './MedicineItem';
import { Grid, Spinner, Text } from '@chakra-ui/react';
import { fetchMedicines } from '../../../api/data';
import { IMedicineData } from '../../../interfaces/store';
import { useSearchParams } from 'react-router-dom';
import { useCart } from '../../../utils/hooks/useCart';
import { checkIsNew } from '../../../utils/helpers/checkIsNew';

const MedicinesGrid = () => {
  const [medicines, setMedicines] = useState<IMedicineData[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isPending, setIsPending] = useState<boolean>(false);
  const [hasCheked, setHasCheked] = useState<boolean>(false);
  const [search, setSearch] = useState<string>('');
  const [page, setPage] = useState<string>('1');
  const [, setCount] = useState<string>('');
  const [storeid, setStoreid] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('');
  const [sortDir, setSortDir] = useState<string>('');

  const [searchParams, setSearchParams] = useSearchParams();

  const { syncCart, cartItems } = useCart();

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

  useEffect(() => {
    setSearch(searchParams.get('search') ?? '');
    setPage(searchParams.get('page') ?? '');
    setCount(searchParams.get('count') ?? '');
    setStoreid(searchParams.get('storeid') ?? '');
    setSortBy(searchParams.get('sortBy') ?? '');
    setSortDir(searchParams.get('sortDir') ?? '');
  }, [searchParams]);

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

  if (isPending) return <Spinner size="xl" />;
  if (medicines.length === 0) return <Text size={'xl'}>Nothing found.</Text>;
};

export default MedicinesGrid;
