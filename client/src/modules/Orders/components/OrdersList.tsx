import { Flex, List, ListItem, Text } from '@chakra-ui/react';
import SectionWrapper from '../../../components/SectionWrapper';
import { IMedicineData, IOrderData } from '../../../interfaces/store';
import CartItem from '../../Cart/components/CartItem';

const OrdersList = ({ orders }: { orders: IOrderData[] }) => {
  return (
    <SectionWrapper>
      {orders.length > 0 && (
        <List display={'flex'} flexDir={'column'} gap={'20px'}>
          {orders.map((order) => {
            let createdAt;
            if (order.createdAt)
              createdAt = new Date(order.createdAt)
                .toISOString()
                .substring(0, 10);
            return (
              <ListItem
                key={order._id}
                border={'3px gray solid'}
                borderRadius={'10px'}
                alignItems={'center'}
              >
                <Flex justify={'space-around'} align={'center'} mb={'12px'}>
                  <Text>{createdAt}</Text>
                  <Text fontSize={'xl'} fontWeight={900}>
                    Total price: {Number(order.totalPrice).toFixed(1)}£
                  </Text>
                </Flex>
                {order.medicines.length > 0 && (
                  <List
                    display={'flex'}
                    flexWrap={'wrap'}
                    gap={'12px'}
                    p={'10px'}
                  >
                    {order.medicines.map((med) => {
                      const medOrderitem = {
                        ...(med.medicine as IMedicineData),
                        count: med.count,
                      };
                      return (
                        <ListItem key={medOrderitem._id}>
                          <CartItem data={medOrderitem} />
                        </ListItem>
                      );
                    })}
                  </List>
                )}
              </ListItem>
            );
          })}
        </List>
      )}
    </SectionWrapper>
  );
};

export default OrdersList;
