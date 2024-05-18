// import React, { useState, useContext } from 'react';
// import { useVentasContext } from './VentasContext';
// import UserContext from '../User/UserContext'; // Importa el contexto UserContext
// import { CartContext } from '../CarContext';

// const CrearVentaFunction = ({ onSuccess, onError }) => {
//     const { crearVenta } = useVentasContext();
//     const ctxUser = useContext(UserContext); // Obtén el contexto de usuario
//     const carro1 = useContext(CartContext); // Obtén el contexto del carrito

//     // Estado local para usuario y monto
//     const [usuario, setUsuario] = useState(ctxUser.user.email);
//     const [monto, setMonto] = useState(carro1.valorTotal);
//     const [mensaje, setMensaje] = useState('');

//     // Función para manejar el envío del formulario
//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         try {
//             const nuevaVenta = { usuario, monto };
//             const ventaCreada = await crearVenta(nuevaVenta);

//             if (ventaCreada) {
//                 setMensaje(`Nueva venta creada: ${JSON.stringify(ventaCreada)}`);
//                 onSuccess(); // Llama a la función onSuccess si la creación de la venta tiene éxito
//             } else {
//                 throw new Error('Hubo un problema al crear la venta');
//             }
//         } catch (error) {
//             console.error(error);
//             setMensaje(`Error: ${error.message}`);
//             onError(); // Llama a la función onError si hay un error al crear la venta
//         }
//     };

//     // Función para manejar cambios en el campo de usuario
//     const handleUsuarioChange = (e) => {
//         setUsuario(e.target.value);
//     };

//     return {
//         handleSubmit,
//         handleUsuarioChange,
//         mensaje,
//         usuario,
//         monto
//     };
// };

// export default CrearVentaFunction;

// import React, { useContext, useEffect } from 'react';
// import { useVentasContext } from './VentasContext';
// import UserContext from '../User/UserContext';
// import { CartContext } from '../CarContext';

// const CrearVentaFunction = ({ onVentaCreada }) => {
//     const { crearVenta } = useVentasContext();
//     const { user } = useContext(UserContext);
//     const { valorTotal } = useContext(CartContext);

//     useEffect(() => {
//         const crearVentaAsync = async () => {
//             const usuario = user.email;
//             const monto = valorTotal;

//             try {
//                 const nuevaVenta = { usuario, monto };
//                 const ventaCreada = await crearVenta(nuevaVenta);

//                 if (ventaCreada) {
//                     console.log(`Nueva venta creada: ${JSON.stringify(ventaCreada)}`);
//                     onVentaCreada(true);
//                 } else {
//                     throw new Error('Hubo un problema al crear la venta');
//                     onVentaCreada(false);
//                 }
//             } catch (error) {
//                 console.error(`Error: ${error.message}`);
//                 onVentaCreada(false);
//             }
//         };

//         crearVentaAsync();
//     }, []);
// //}, [crearVenta, user.email, valorTotal, onVentaCreada]);

//     return null; // No renderizamos nada
// };

// export default CrearVentaFunction;



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
            // const paymentId = paymentId;
            // const collectionId = collectionId;

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
