import {
  Box,
  Button,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useToast,
} from '@chakra-ui/react';
import { FormControl, FormErrorMessage } from '@chakra-ui/react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { ErrorIcon } from '../../../assets/svg';
import { IMedicineData, IOrderData } from '../../../interfaces/store';
import { useEffect, useState } from 'react';
import { createOrder } from '../../../api/data';
import { useCart } from '../../../utils/hooks/useCart';

const OrderForm = ({
  totalCartPrice,
  cartItems,
}: {
  totalCartPrice: number;
  cartItems: IMedicineData[];
}) => {
  const [orderData, setOrderData] = useState<IOrderData | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const { wipeCart } = useCart();

  const toast = useToast();

  useEffect(() => {
    (async () => {
      if (!orderData) return;
      setIsSubmitting(true);
      const res = await createOrder(orderData);
      if (!res || res?.status !== 201)
        toast({
          title: 'An error occurred.',
          description: 'Unable to create order.',
          status: 'warning',
        });
      if (res?.status === 201)
        toast({
          title: 'Success!',
          description: 'Order created.',
          status: 'success',
        });
      wipeCart();
      setOrderData(null);
      setIsSubmitting(false);
    })();
  }, [orderData, toast, wipeCart]);

  const formik = useFormik({
    initialValues: {
      username: '',
      phone: '',
      email: '',
      address: '',
    },
    onSubmit: (values) => {
      const formData = {
        ...values,
        medicines: cartItems.map((item) => {
          const newItem = {
            _id: item._id,
            count: item.count,
          };
          return newItem;
        }),
        totalPrice: totalCartPrice,
      };
      setOrderData(formData as IOrderData);
      formik.resetForm();
    },
    validationSchema: Yup.object({
      username: Yup.string().required('Name cannot be empty'),
      phone: Yup.string().required('Phone cannot be empty').min(6),
      email: Yup.string()
        .required('Email Address cannot be empty')
        .email('Looks like this is not an email')
        .matches(
          /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
          'Invalid email'
        ),
      address: Yup.string().required('Address cannot be empty'),
    }),
    validateOnChange: true,
  });
  return (
    <Box bg="white" w="full" p={8} borderRadius="lg">
      <form autoComplete="off" onSubmit={formik.handleSubmit}>
        <FormControl
          isInvalid={!!formik.touched.address && !!formik.errors.address}
          mb={5}
          color="black"
        >
          <InputGroup>
            <Input
              size="lg"
              type="address"
              name="address"
              placeholder="Address"
              value={formik.values.address}
              onChange={formik.handleChange}
            />
            {formik.touched.address && formik.errors.address && (
              <InputRightElement h="full" children={<ErrorIcon />} />
            )}
          </InputGroup>
          {formik.touched.address && formik.errors.address && (
            <FormErrorMessage>{formik.errors.address}</FormErrorMessage>
          )}
        </FormControl>

        <FormControl
          isInvalid={!!formik.touched.email && !!formik.errors.email}
          mb={5}
          color="black"
        >
          <InputGroup>
            <Input
              size="lg"
              type="text"
              name="email"
              placeholder="Email"
              value={formik.values.email}
              onChange={formik.handleChange}
            />
            {formik.touched.email && formik.errors.email && (
              <InputRightElement h="full" children={<ErrorIcon />} />
            )}
          </InputGroup>
          {formik.touched.email && formik.errors.email && (
            <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
          )}
        </FormControl>

        <FormControl
          isInvalid={!!formik.touched.phone && !!formik.errors.phone}
          mb={5}
          color="black"
        >
          <InputGroup>
            <Input
              size="lg"
              type="text"
              name="phone"
              placeholder="Phone"
              value={formik.values.phone}
              onChange={formik.handleChange}
            />
            {formik.touched.phone && formik.errors.phone && (
              <InputRightElement h="full" children={<ErrorIcon />} />
            )}
          </InputGroup>
          {formik.touched.phone && formik.errors.phone && (
            <FormErrorMessage>{formik.errors.phone}</FormErrorMessage>
          )}
        </FormControl>

        <FormControl
          isInvalid={!!formik.touched.username && !!formik.errors.username}
          mb={5}
          color="black"
        >
          <InputGroup>
            <Input
              size="lg"
              type="text"
              name="username"
              placeholder="Name"
              value={formik.values.username}
              onChange={formik.handleChange}
            />
            {formik.touched.username && formik.errors.username && (
              <InputRightElement h="full" children={<ErrorIcon />} />
            )}
          </InputGroup>
          {formik.touched.username && formik.errors.username && (
            <FormErrorMessage>{formik.errors.username}</FormErrorMessage>
          )}
        </FormControl>

        <Button
          type="submit"
          w="full"
          bg="brand.green"
          size={'lg'}
          textTransform="uppercase"
          fontWeight={'normal'}
          letterSpacing="wide"
          boxShadow="0 3px hsl(154, 59%, 65%)"
          _hover={{ filter: 'brightness(0.9)' }}
          isLoading={isSubmitting}
          isDisabled={isSubmitting}
        >
          Create order
        </Button>
        <Text
          as="p"
          fontSize="xs"
          color="brand.grayishBlue"
          mt={3}
          textAlign="center"
        >
          By clicking the button, you are agreeing to our{' '}
          <Text as="a" fontWeight={'bold'} color="brand.red">
            Terms and Services
          </Text>
        </Text>
      </form>
    </Box>
  );
};

export default OrderForm;
