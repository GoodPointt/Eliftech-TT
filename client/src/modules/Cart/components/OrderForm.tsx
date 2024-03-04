import {
  Box,
  Button,
  Flex,
  Image,
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
import { useEffect, useRef, useState } from 'react';
import { createOrder, generateCaptcah, sendCaptcha } from '../../../api/data';
import { useCart } from '../../../utils/hooks/useCart';

const OrderForm = ({
  totalCartPrice,
  cartItems,
  mapAddress,
}: {
  totalCartPrice: number;
  cartItems: IMedicineData[];
  mapAddress: string;
}) => {
  const [orderData, setOrderData] = useState<IOrderData | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isCaptchaSolved, setIsCaptchaSolved] = useState<boolean>(false);
  const [captchaHash, setCaptchaHash] = useState<string>('');
  const [captchaImg, setCaptchaImg] = useState<string>('');
  const [captchaText, setCaptchaText] = useState<string>('');

  const toast = useToast();

  const captchaInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    (async () => {
      const newCaptcha = async () => {
        const res = await generateCaptcah();

        if (!res || res?.status !== 200)
          return toast({
            title: 'An error occurred.',
            description: 'Unable to generate captcha.',
            status: 'warning',
          });

        const {
          data: { image, hash },
        } = res;

        setCaptchaImg(image);
        setCaptchaHash(hash);
      };

      if (!captchaHash && !captchaImg) {
        return await newCaptcha();
      }
      if (captchaHash && captchaImg && captchaText) {
        const res = await sendCaptcha({
          captcha: captchaText,
          hash: captchaHash,
        });

        if (!res || res?.status !== 200)
          return toast({
            title: 'An error occurred.',
            description: 'Unable to generate captcha.',
            status: 'warning',
          });

        if (
          res?.status === 200 &&
          res?.data.message === 'Verification successful'
        ) {
          toast({
            title: 'Success!',
            description: res.data.message,
            status: 'success',
          });

          return setIsCaptchaSolved(true);
        }

        if (res?.status === 200 && res?.data.message === 'Invalid captcha') {
          toast({
            title: 'Error!',
            description: res.data.message,
            status: 'warning',
          });
          if (captchaInput.current) captchaInput.current.value = '';
          return await newCaptcha();
        }
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [captchaText]);

  const { wipeCart } = useCart();

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
            medicine: item._id,
            count: item.count,
          };
          return newItem;
        }),
        totalPrice: String(totalCartPrice.toFixed(1)),
      };
      setOrderData(formData);
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

  useEffect(() => {
    formik.setValues((prevValues) => ({
      ...prevValues,
      address: mapAddress,
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mapAddress]);

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
      if (res?.status === 201) {
        toast({
          title: 'Success!',
          description: 'Order created.',
          status: 'success',
        });
        formik.resetForm();
        wipeCart();
        setOrderData(null);
      }

      setIsSubmitting(false);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderData]);

  return (
    <Box bg="white" borderRadius="lg" flex={1}>
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

        {!isCaptchaSolved && (
          <Flex
            mb={'20px'}
            gap={'20px'}
            flexDir={{ base: 'column', lg: 'row' }}
          >
            <Image src={captchaImg} />
            <Flex
              gap={'20px'}
              mt={'auto'}
              flexDir={{ base: 'column', lg: 'row' }}
            >
              <Input
                py={3}
                flex={1}
                ref={captchaInput}
                type="text"
                placeholder="Enter captcha..."
              />
              <Button
                py={3}
                flex={1}
                type="button"
                onClick={() =>
                  setCaptchaText(captchaInput.current?.value || '')
                }
              >
                I'm not a robot
              </Button>
            </Flex>
          </Flex>
        )}

        <Button
          type="submit"
          w="full"
          bg="green.200"
          size={'lg'}
          textTransform="uppercase"
          fontWeight={'normal'}
          letterSpacing="wide"
          boxShadow="0 3px hsl(154, 59%, 65%)"
          _hover={{ filter: 'brightness(0.9)' }}
          isLoading={isSubmitting}
          isDisabled={isSubmitting || !isCaptchaSolved}
        >
          Create order
        </Button>
        <Text as="p" fontSize="xs" color="blue.600" mt={3} textAlign="center">
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
