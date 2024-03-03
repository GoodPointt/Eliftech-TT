import { Box, Text } from '@chakra-ui/react';
import { Link } from '@chakra-ui/react';
import SectionWrapper from './SectionWrapper';
import { GitIcon } from '../assets/svg';

const Footer = () => {
  return (
    <SectionWrapper color={'rgba(255, 255, 255, 0.87)'} bgColor={'#242424'}>
      <Text
        display={'flex'}
        flexWrap={'wrap'}
        gap={3}
        alignItems={'center'}
        fontSize={{ base: 'md', lg: 'xl', xl: '2xl' }}
        justifyContent={'center'}
      >
        <Text as={'span'}>Developed by</Text>
        <Link
          color="blue.700"
          href="https://github.com/GoodPointt"
          rel="noopener noreferrer nofollow"
          target="_blank"
          fontSize={{ base: 'md', lg: 'xl', xl: '2xl' }}
          transition={'all 0.3s'}
          _hover={{ color: 'blue.100', transform: 'scale(1.05)' }}
        >
          <Text
            as={'span'}
            display={'flex'}
            gap={1}
            alignItems={'center'}
            flexWrap={'wrap'}
          >
            <Box as={'span'} w={'25px'} h={'25px'}>
              <GitIcon />
            </Box>
            Dmytro Petyshyn
          </Text>
        </Link>
        <Text as={'span'}> © 2024 All rights reserved.</Text>
      </Text>
    </SectionWrapper>
  );
};

export default Footer;
