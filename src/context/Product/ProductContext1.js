import React, { createContext, useState } from 'react';

const ProductContext1 = createContext();

const ProductProvider = ({ children }) => {
  const [carrito, setCarrito] = useState([]);

  const addToCart = (product) => {
    setCarrito([...carrito, product]);
    console.log(product);
  };

  return (
    <ProductContext1.Provider value={{ carrito, addToCart }}>
      {children}
    </ProductContext1.Provider>
  );
};

export { ProductProvider, ProductContext1 };