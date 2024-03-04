import { Box, Drawer, DrawerContent, useDisclosure } from '@chakra-ui/react';

import { useEffect, useState } from 'react';
import MobileSidebar from './components/MobileSidebar';
import Sidebar from './components/Sidebar';
import MedicinesGrid from './components/MedicinesGrid';
import { fetchStores } from '../../api/data';
import { IStore } from '../../interfaces/store';
import Pagination from './components/Pagination';
import StoreToolbar from './components/StoreToolbar';

export default function Store() {
  const [stores, setStores] = useState<IStore[]>([]);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    (async () => {
      const data = await fetchStores();
      if (!data) return setStores([]);
      setStores(data);
    })();
  }, []);

  return (
    <Box minH="100%" bg={'gray.100'}>
      <Sidebar
        stores={stores}
        onClose={() => onClose}
        display={{ base: 'none', md: 'block' }}
      />
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <Sidebar onClose={onClose} stores={stores} />
        </DrawerContent>
      </Drawer>
      <MobileSidebar display={{ base: 'flex', md: 'none' }} onOpen={onOpen} />
      <Box
        as="section"
        ml={{ base: 0, md: 60 }}
        p="4"
        // maxW={{ base: '744px', lg: '1000px', xl: '1300px' }}
        height={'100%'}
      >
        <StoreToolbar />
        <MedicinesGrid />
      </Box>
      <Pagination />
    </Box>
  );
}
