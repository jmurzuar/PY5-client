import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { CartContext } from '../context/CarContext';

const CartWidget = () => {

    const { cantidadEnCarrito, valorTotal } = useContext(CartContext);

  return (
    <div className="bg-blue-500 rounded-lg p-4 h-4 flex items-center justify-center">
    <Link className="menu-link flex items-center" to="/carrito">
            <p className="pl-2 pr-2 text-white">Ver Carro</p>
            <span className="bg-blue-100 rounded-lg pl-2 pr-2 text-blue"> {cantidadEnCarrito()} - $ {valorTotal.toLocaleString('es-ES')}</span>
            
        </Link>
    </div>
  )
}

export default CartWidget