import {
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  Link,
  List,
  ListItem,
} from '@chakra-ui/react';

import SectionWrapper from './SectionWrapper';
import { NavLink, useLocation, useSearchParams } from 'react-router-dom';
import { TNavLink } from '../interfaces/navigation';
import { navLinks } from '../common/navLinks';
import { useDebouncedCallback } from 'use-debounce';

const MainNavLink = ({ linkObj }: { linkObj: TNavLink }) => {
  return (
    <Link
      as={NavLink}
      to={linkObj.to}
      color="blue.200"
      fontSize={{ base: 'md', lg: 'xl', xl: '2xl' }}
      transition={'all 0.3s'}
      _hover={{ color: 'blue.300' }}
    >
      {linkObj.name}
    </Link>
  );
};

const Header = () => {
  const location = useLocation();
  const { pathname } = location;
  const [, setSearchParams] = useSearchParams();

  const handleSearch = useDebouncedCallback((e) => {
    const currentSearchParams = new URLSearchParams(location.search);
    if (e.target.value) {
      currentSearchParams.set('search', e.target.value);
      currentSearchParams.set('page', '1');
      setSearchParams(currentSearchParams.toString());
    } else {
      currentSearchParams.delete('search');
      currentSearchParams.set('page', '1');
      setSearchParams(currentSearchParams.toString());
    }
  }, 300);

  return (
    <SectionWrapper color={'rgba(255, 255, 255, 0.87)'} bgColor={'#242424'}>
      <Flex flexDir={{ base: 'column', lg: 'row' }}>
        <nav>
          <List display={'flex'}>
            {navLinks.length > 0 &&
              navLinks.map((link, idx) => (
                <ListItem
                  key={idx}
                  _notLast={{ borderRight: '1px solid #fff' }}
                  px={6}
                >
                  <MainNavLink linkObj={link} />
                </ListItem>
              ))}
          </List>
        </nav>
        {pathname === '/' && (
          <InputGroup ml={{ base: 'none', lg: 'auto' }} w={'200px'}>
            <InputLeftElement
              pointerEvents="none"
              color="gray.300"
              fontSize="1.2em"
            >
              🔎
            </InputLeftElement>
            <Input
              px={2}
              py={'5px'}
              variant={'unstyled'}
              placeholder="Search by medicine name..."
              type="search"
              onChange={(e) => {
                handleSearch(e);
              }}
            />
          </InputGroup>
        )}
      </Flex>
    </SectionWrapper>
  );
};

export default Header;
