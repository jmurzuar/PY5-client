import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { CartContext } from '../context/CarContext'


function SuccessPage() {
  const { vaciarCarrito } = useContext(CartContext);
  const history = useHistory();
  const [countdown, setCountdown] = useState(10);

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

  useEffect(() => {
    handleVaciar();
  }, []);

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

  return (
    // <div>
    //   <h2>¡Pago Exitoso!</h2>
    //   <p>Collection ID: {collectionId}</p>
    //   <p>Collection Status: {collectionStatus}</p>
    //   <p>Payment ID: {paymentId}</p>
    //   {/* Mostrar los otros datos de la URL según sea necesario */}
    //   <h2>Redirigiendo en {countdown} segundos...</h2>
    // </div>
    <div className="flex flex-col items-center justify-center h-screen">
    <h2 className="text-3xl font-bold text-green-500 mb-4">¡Pago Exitoso!</h2>
    <p className="text-lg text-gray-800">Collection ID: {collectionId}</p>
    <p className="text-lg text-gray-800">Collection Status: {collectionStatus}</p>
    <p className="text-lg text-gray-800">Payment ID: {paymentId}</p>
    {/* Mostrar otros datos de la URL según sea necesario */}
    <h2 className="text-2xl text-blue-500 mt-4">{countdown > 0 ? `Redirigiendo en ${countdown} segundos...` : "Redirigiendo..."}</h2>
  </div>
  );
}

export default SuccessPage;