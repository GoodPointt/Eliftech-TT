import { Suspense } from 'react';
import Header from './components/Header';
import { Outlet } from 'react-router-dom';
import Footer from './components/Footer';
import { Grid } from '@chakra-ui/react';

const Layout = () => {
  return (
    <Suspense fallback={null}>
      <Grid gridTemplateRows={'auto 1fr auto'} minH={'100dvh'}>
        <Header />

        <main>
          <Outlet />
        </main>

        <Footer />
      </Grid>
    </Suspense>
  );
};

export default Layout;
