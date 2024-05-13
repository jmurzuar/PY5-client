// MercadoPago.js
import React, { useContext, useEffect, useState } from 'react';
import ProductContext from '../context/Product/ProductContext';
import UserContext from '../context/User/UserContext';
import { CartContext } from '../context/CarContext';

export const MercadoPago = ({ containerId }) => {
  const { carrito } = useContext(CartContext);


  const ctxProduct = useContext(ProductContext);
  const { getPreferenceCheckoutMP } = ctxProduct;

  const ctxUser = useContext(UserContext);
  const { user } = ctxUser;

  const [checkoutInitialized, setCheckoutInitialized] = useState(false);

  useEffect(() => {
    const initializeMercadoPago = async () => {
      if (!user || checkoutInitialized) return;

      const id = await getPreferenceCheckoutMP({
        items: carrito.map(prod => ({
          title: prod[0].nombre,
          quantity: prod.cantidad,
          currency_id: 'CLP',
          unit_price: prod[0].precio,
          picture_url: prod[0].imagen
        }))
      });

      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = 'https://sdk.mercadopago.com/js/v2';

      script.addEventListener('load', () => {
        const mp = new window.MercadoPago(process.env.REACT_APP_MERCADO_PAGO_PUBLIC_KEY, {
          locale: "es-CL"
        });

        mp.checkout({
          preference: {
            id: id,
          },
          render: {
            container: `#${containerId}`,
            label: "Pagar en MERCADO PAGO"
          }
        });
      });

      document.body.appendChild(script);
      setCheckoutInitialized(true);
    };

    initializeMercadoPago();

    return () => {
      // Clean up if needed
    };
  }, []);
// }, [carrito, user, checkoutInitialized, containerId]);

  return (
    <div id={containerId}></div>
  );
};
