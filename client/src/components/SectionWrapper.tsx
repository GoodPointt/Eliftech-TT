import { Box, Container } from '@chakra-ui/react';
import React from 'react';

const SectionWrapper = ({
  children,
  color,
  bgColor,
}: {
  children: React.ReactNode;
  color?: string;
  bgColor?: string;
}) => {
  return (
    <Box
      as={'section'}
      py={{ base: '20px', lg: '30px', xl: '40px' }}
      bgColor={bgColor}
      color={color}
    >
      <Container
        maxW={{ base: '744px', lg: '1000px', xl: '1300px' }}
        px="12px"
        height={'100%'}
      >
        {children}
      </Container>
    </Box>
  );
};

export default SectionWrapper;
