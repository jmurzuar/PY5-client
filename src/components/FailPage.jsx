import React, { useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { CartContext } from '../context/CarContext'

function FailPage() {
  const { vaciarCarrito } = useContext(CartContext);
  // Obtenemos la ubicación actual
  const location = useLocation();
  
  // Parseamos los parámetros de la URL
  const queryParams = new URLSearchParams(location.search);
  const collectionId = queryParams.get('collection_id');
  const collectionStatus = queryParams.get('collection_status');
  const paymentId = queryParams.get('payment_id');
  // Y así sucesivamente para los otros parámetros

  const handleVaciar = () => {
    vaciarCarrito();
  }


  return (
    <div>
      <h2>¡Pago NO REALIZADO!</h2>
      <p>Collection ID: {collectionId}</p>
      <p>Collection Status: {collectionStatus}</p>
      <p>Payment ID: {paymentId}</p>
      {/* Mostrar los otros datos de la URL según sea necesario */}
      
    </div>
  );
}

export default FailPage;