import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import productsData from './data/products.json';
import Home from './pages/home';
import Products from './pages/products';
import ProductDetails from './pages/productDetails';
import './App.scss';

function App() {
  return (
    <div className="App">
      <Router>
        <div className="logo"></div>
        <AnimatePresence>
          <Switch>
            <Route
              path="/products/:slug"
              render={(props) => <ProductDetails {...props} productsData={productsData} />}
            />
            <Route
              path="/products"
              render={(props) => <Products {...props} productsData={productsData} />}
            />
            <Route
              exact
              path="/"
              render={(props) => <Home {...props} productsData={productsData} />}
            />
          </Switch>
        </AnimatePresence>
      </Router>
    </div>
  );
}

export default App;
