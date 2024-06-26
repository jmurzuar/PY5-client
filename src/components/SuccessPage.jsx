import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { CartContext } from '../context/CarContext';
import CrearVentaFunction from '../context/Venta/CrearVenta1';
import UserContext from '../context/User/UserContext';

function SuccessPage() {
  const { vaciarCarrito } = useContext(CartContext);
  const { user } = useContext(UserContext);
  const history = useHistory();
  const [countdown, setCountdown] = useState(10);
  const [ventaCreada, setVentaCreada] = useState({ estado: false, datos: null });

  // Obtenemos la ubicación actual
  const location = useLocation();

  // Parseamos los parámetros de la URL
  const queryParams = new URLSearchParams(location.search);
  const collectionId = queryParams.get('collection_id');
  const collectionStatus = queryParams.get('collection_status');
  const paymentId = queryParams.get('payment_id');
  const paymentType = queryParams.get('payment_type');
  const merchantOrderId = queryParams.get('merchant_order_id');
  const preferenceId = queryParams.get('preference_id');
  const siteId = queryParams.get('site_id');
  const processingMode = queryParams.get('processing_mode');
  const merchantAccountId = queryParams.get('merchant_account_id');

  const handleVaciar = () => {
    vaciarCarrito();
  }

  useEffect(() => {
    

    // Ejecutar CrearVentaFunction después de 5 segundos
    const timeoutId = setTimeout(() => {
      setVentaCreada({ estado: true });
      handleVaciar();
    }, 5000);

    // Limpiar el timeout si el componente se desmonta antes de los 5 segundos
    return () => {
      clearTimeout(timeoutId);
    };
  }, []); // El segundo argumento vacío asegura que este useEffect se ejecute solo una vez

  useEffect(() => {
    // Inicia el temporizador para esperar 10 segundos
    const timeoutId = setTimeout(() => {
      // Redirige a la otra página después de 10 segundos
      history.push('/');
    }, countdown * 1000); // Multiplicamos por 1000 para convertir segundos a milisegundos

    // Actualiza el contador cada segundo
    const intervalId = setInterval(() => {
      setCountdown(prevCountdown => prevCountdown - 1);
    }, 1000); // Actualiza el contador cada segundo

    // Limpia el temporizador y el intervalo cuando el componente se desmonta o cuando el temporizador finalice
    return () => {
      clearTimeout(timeoutId);
      clearInterval(intervalId);
    };
  }, [countdown, history]);

  const handleVentaCreada = (estado, datos) => {
    setVentaCreada({ estado, datos });
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-3xl font-bold text-green-500 mb-4">¡Pago Exitoso!</h2>
      <p className="text-lg text-gray-800">Merchant Order ID: {merchantOrderId}</p>
      <p className="text-lg text-gray-800">Collection Status: {collectionStatus}</p>
      <p className="text-lg text-gray-800">Payment ID: {paymentId}</p>
      {/* Mostrar otros datos de la URL según sea necesario */}
      <h2 className="text-2xl text-blue-500 mt-4">{countdown > 0 ? `Estamos gestionando su compra, espere... finalizaremos en ${countdown} segundos...` : "Redirigiendo..."}</h2>

      {ventaCreada.estado && (
        <CrearVentaFunction
        payment_id={paymentId}
        merchant_order_id={merchantOrderId}
        onVentaCreada={handleVentaCreada}
        />
      )}
    </div>
  );
}

export default SuccessPage;


