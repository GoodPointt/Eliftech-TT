import { Flex, Link, List, ListItem } from '@chakra-ui/react';

import SectionWrapper from './SectionWrapper';
import { NavLink, useLocation } from 'react-router-dom';
import { TNavLink } from '../interfaces/navigation';
import { navLinks } from '../common/navLinks';

import Search from './Search';

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
        {pathname === '/' && <Search />}
      </Flex>
    </SectionWrapper>
  );
};

export default Header;
