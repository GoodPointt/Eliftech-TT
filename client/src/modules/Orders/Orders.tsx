import { ChangeEvent, FormEvent, useState } from 'react';
import OrderSearch from './components/OrderSearch';
import OrdersList from './components/OrdersList';
import { fetchOrders } from '../../api/data';
import { Text, useToast } from '@chakra-ui/react';
import { IOrderData } from '../../interfaces/store';

export interface IFormData {
  email: string;
  phone: string;
}

const Orders = () => {
  const toast = useToast();
  const [formData, setFormData] = useState<IFormData>({
    email: '',
    phone: '',
  });
  const [orders, setOrders] = useState<IOrderData[]>([]);
  const [message, setMessage] = useState<string>(
    'Search orders by email/phone.'
  );

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const res = await fetchOrders(formData);

    if (!res || res?.status !== 200) {
      return toast({
        title: 'An error occurred.',
        description: 'Unable to find orders.',
        status: 'warning',
      });
    }

    setOrders(res.data);
    setMessage(
      `We found ${res.data.length} order${res.data.length !== 1 ? "'s" : ''}.`
    );
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      <OrderSearch
        handleSubmit={handleSubmit}
        formData={formData}
        handleChange={handleChange}
      />
      <Text>{message}</Text>
      <OrdersList orders={orders} />
    </div>
  );
};

export default Orders;
