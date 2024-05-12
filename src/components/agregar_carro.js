import React, { useContext } from 'react';
import ProductContext from '../context/Product/ProductContext';

const ComponenteAgregarProducto = ({ nombre, precio }) => {
  const { addToCart } = useContext(ProductContext);

  const producto = {
    id: 1,
    nombre: nombre,
    precio: precio,
    cantidad: 1,
  };

  const handleAgregarAlCarrito = () => {
    addToCart(producto);
  };

  return (
    <button onClick={handleAgregarAlCarrito}>Agregar al carrito</button>
  );
};

export default ComponenteAgregarProducto;