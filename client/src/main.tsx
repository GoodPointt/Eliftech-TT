import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { ChakraProvider, theme } from '@chakra-ui/react';
import CartProvider from './utils/contexts/CartContext.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ChakraProvider
    theme={theme}
    toastOptions={{
      defaultOptions: {
        position: 'top-right',
        duration: 3500,
        isClosable: false,
      },
    }}
  >
    <CartProvider>
      <App />
    </CartProvider>
  </ChakraProvider>
);
