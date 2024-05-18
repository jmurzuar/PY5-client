import React, { useState, useContext } from 'react';
import { useVentasContext } from './VentasContext';

import { CartContext } from '../CarContext'
import UserContext from '../User/UserContext';


const CrearVenta = () => {
    const { crearVenta } = useVentasContext();
    const { user } = useContext(UserContext);

    console.log(user.name);
    
        // Obtén el correo electrónico del usuario del contexto UserContext
    const [usuario, setUsuario] = useState(user.email); // Establece el nombre de usuario como valor inicial del estado
    const { carrito, valorTotal, vaciarCarrito} = useContext(CartContext);
    const [monto, setMonto] = useState(valorTotal);
    const [mensaje, setMensaje] = useState('');

    
    

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const nuevaVenta = { usuario, monto };
            const ventaCreada = await crearVenta(nuevaVenta);

            if (ventaCreada) {
                setMensaje(`Nueva venta creada: ${JSON.stringify(ventaCreada)}`);
            } else {
                throw new Error('Hubo un problema al crear la venta');
            }
        } catch (error) {
            console.error(error);
            setMensaje(`Error: ${error.message}`);
        }
    };

    const handleUsuarioChange = (e) => {
        setUsuario(e.target.value);
    };

    return (
        <div>
            <h2>Crear Venta</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Usuario:</label>
                    <input type="text" value={usuario} onChange={handleUsuarioChange} />
                </div>
                <div>
                    <label>Monto:</label>
                    <input type="number" value={monto} onChange={(e) => setMonto(e.target.value)} />
                </div>
                <button type="submit">Crear Venta</button>
            </form>
            {mensaje && <p>{mensaje}</p>}
        </div>
    );
};

export default CrearVenta;
