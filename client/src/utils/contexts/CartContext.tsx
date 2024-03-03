import { createContext, useState, ReactNode } from 'react';
import { IMedicineData } from '../../interfaces/store';

interface CartContextType {
  cartItems: IMedicineData[];
  syncCart: (localCart: IMedicineData[]) => void;
  addToCart: (item: IMedicineData) => void;
  removeFromCart: (itemId: string) => void;
  handleCartItemCount: (itemId: string, count: number) => void;
  wipeCart: () => void;
}

export const CartContext = createContext<CartContextType | undefined>(
  undefined
);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<IMedicineData[]>([]);

  const syncCart = (localCart: IMedicineData[]) => {
    setCartItems(localCart);
  };

  const addToCart = (item: IMedicineData) => {
    const updatedItems = [...cartItems, { ...item, count: 1 }];
    setCartItems(updatedItems);
    localStorage.setItem('localCart', JSON.stringify(updatedItems));
  };

  const removeFromCart = (itemId: string) => {
    const updatedItems = cartItems.filter((item) => item._id !== itemId);
    setCartItems(updatedItems);
    localStorage.setItem('localCart', JSON.stringify(updatedItems));
  };

  const handleCartItemCount = (itemId: string, count: number) => {
    const updatedItems = cartItems.map((item) => {
      if (item._id !== itemId) return item;
      else return { ...item, count };
    });
    setCartItems(updatedItems);
    localStorage.setItem('localCart', JSON.stringify(updatedItems));
  };

  const wipeCart = () => {
    setCartItems([]);
    localStorage.removeItem('localCart');
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        syncCart,
        addToCart,
        removeFromCart,
        handleCartItemCount,
        wipeCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
