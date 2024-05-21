import React, { useContext, useEffect } from 'react';
import { useVentasContext } from './VentasContext';
import UserContext from '../User/UserContext';
import { CartContext } from '../CarContext';

const CrearVentaFunction = ({ payment_id, merchant_order_id, onVentaCreada }) => {
    const { crearVenta } = useVentasContext();
    const { user } = useContext(UserContext);
    const { valorTotal } = useContext(CartContext);

    useEffect(() => {
        const crearVentaAsync = async () => {
            const usuario = user.email;
            const monto = valorTotal;
      

            try {
                const nuevaVenta = { usuario, monto, payment_id, merchant_order_id };
                const ventaCreada = await crearVenta(nuevaVenta);

                if (ventaCreada) {
                    console.log(`Nueva venta creada: ${JSON.stringify(ventaCreada)}`);
                    onVentaCreada(true, ventaCreada);
                } else {
                    throw new Error('Hubo un problema al crear la venta');
                }
            } catch (error) {
                console.error(`Error: ${error.message}`);
                onVentaCreada(false, null);
            }
        };

        crearVentaAsync();
    }, []);
    //}, [crearVenta, user.email, valorTotal, payment_id, collection_id, onVentaCreada]);

    return null; // No renderizamos nada
};

export default CrearVentaFunction;
