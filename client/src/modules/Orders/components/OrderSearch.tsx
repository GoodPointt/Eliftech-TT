import { Button, Flex, Heading, Input } from '@chakra-ui/react';
import SectionWrapper from '../../../components/SectionWrapper';
import { ChangeEvent, FormEvent } from 'react';
import { IFormData } from '../Orders';

const OrderSearch = ({
  handleSubmit,
  handleChange,
  formData: { email, phone },
}: {
  handleSubmit: (e: FormEvent) => void;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  formData: IFormData;
}) => {
  return (
    <SectionWrapper>
      <Heading mb={10} fontWeight={900} fontSize={'5xl'}>
        History of orders
      </Heading>
      <Flex
        as={'form'}
        onSubmit={handleSubmit}
        gap={'20px'}
        flexDir={{ base: 'column', lg: 'row' }}
        justifyContent={'center'}
      >
        <Input
          value={email}
          name="email"
          onChange={handleChange}
          fontSize={'xl'}
          type="email"
          placeholder="Search by email..."
          maxW={{ base: '100%', lg: '400px' }}
          py={'20px'}
          bgColor={'gray.100'}
        />
        <Input
          value={phone}
          name="phone"
          onChange={handleChange}
          fontSize={'xl'}
          type="text"
          placeholder="Search by phone..."
          maxW={{ base: '100%', lg: '400px' }}
          py={'20px'}
          bgColor={'gray.100'}
        />
        <Button colorScheme={'green'} type="submit" p={'20px'} fontSize={'2xl'}>
          🔎Search
        </Button>
      </Flex>
    </SectionWrapper>
  );
};

export default OrderSearch;
