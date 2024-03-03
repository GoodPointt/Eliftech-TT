import { Box, BoxProps, CloseButton, Flex, Text } from '@chakra-ui/react';
import StoreItem from './StoreItem';
import { IStore } from '../../../interfaces/store';

interface SidebarProps extends BoxProps {
  stores: IStore[];
  onClose: () => void;
}

const Sidebar = ({ stores, onClose, ...rest }: SidebarProps) => {
  return (
    <Box
      bgColor={'white'}
      borderRight="1px"
      borderRightColor={'gray.200'}
      w={{ base: 'full', md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          Drug Stores
        </Text>
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>
      <ul>
        <li key={Date.now()}>
          <StoreItem _id={''}>All</StoreItem>
        </li>
        {stores.length > 0 &&
          stores.map(({ name, _id }) => (
            <li key={_id}>
              <StoreItem _id={_id}>{name}</StoreItem>
            </li>
          ))}
      </ul>
    </Box>
  );
};

export default Sidebar;
