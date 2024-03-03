import { Flex, FlexProps, IconButton, Text } from '@chakra-ui/react';
import { BurgerIcon } from '../../../assets/svg';

interface MobileProps extends FlexProps {
  onOpen: () => void;
}
const MobileSidebar = ({ onOpen, ...rest }: MobileProps) => {
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 24 }}
      height="20"
      alignItems="center"
      bgColor={'gray.100'}
      borderBottomWidth="1px"
      borderBottomColor={'gray.700'}
      justifyContent="flex-start"
      {...rest}
    >
      <IconButton
        w={'25px'}
        h={'25px'}
        variant="outline"
        onClick={onOpen}
        aria-label="open menu"
        icon={<BurgerIcon />}
      />

      <Text fontSize="2xl" ml="8" fontFamily="monospace" fontWeight="bold">
        Drug Stores
      </Text>
    </Flex>
  );
};

export default MobileSidebar;
