import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { lazy } from 'react';
import Layout from './Layout';
import NotFound from './pages/NotFound';

const LazyStore = lazy(() => import('./pages/StorePage'));
const LazyCart = lazy(() => import('./pages/CartPage'));

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<LazyStore />} />
        <Route path="cart" element={<LazyCart />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

function MainApp() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default MainApp;
