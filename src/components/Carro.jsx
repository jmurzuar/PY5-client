import React, { useContext } from 'react'
import { CartContext } from '../context/CarContext'
import { MercadoPago } from './MercadoPago'
import UserContext from '../context/User/UserContext';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

export const Carro = () => {
    const { carrito, valorTotal, vaciarCarrito} = useContext(CartContext);
    const { user } = useContext(UserContext);
    // console.log(carrito)


    
      const handleVaciar = () => {
        vaciarCarrito();
      }




  return (
    <div>

{  
        carrito.length > 0 ?
        <>
        <div className="mt-4 lg:mt-4 ml-10 lg:flex lg:items-start lg:justify-between">
    <p className="text-3xl font-semibold mb-4 lg:mb-4">Valor Total: $ {valorTotal.toLocaleString('es-CL')}</p>
    
    </div>

    
        
        </> :
        <h2 className="mt-4 lg:mt-4 ml-10 lg:flex lg:items-start lg:justify-between text-3xl font-semibold mb-4 lg:mb-4">El carrito está vacío</h2>
    }
        
    {


<div className="mx-auto max-w-screen-xl px-4">
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
    {carrito.map((prod, index) => (
        <div key={index} className="my-4 border border-gray-200 rounded-lg overflow-hidden">
        <div className="p-4 flex items-center">
            <div className="flex-grow">
                <h3 className="text-xl font-semibold">{prod[0].nombre}</h3>
                <p className="text-gray-600">Precio unitario: $ {prod[0].precio.toLocaleString('es-CL')}</p>
                <p className="text-gray-600">ID: {prod[0]._id} </p>
                <p className="text-gray-600">Cantidad: {prod.cantidad} </p>
                <p className="text-gray-600">Total parcial: $ {(prod[0].precio * prod.cantidad).toLocaleString('es-CL')}</p>
            </div>
            <div className="sm: w-20 h-20 ml-4 md: w-20 h-20 ml-4 lg: w-20 h-20 ml-4">
                <img src={prod[0].imagen} alt="Two each of gray, white, and black shirts laying flat." className="w-full h-full object-center object-cover" />
            </div>
        </div>
    </div>
    ))}
</div>
</div>
           
        }
        

       

    <div className="flex items-center space-x-4 pl-10">
        {
                    user?.email ? 
                    <div className="mt-10" id="payment-form1">
                        <MercadoPago containerId="payment-form" />
                    </div>
                    :
                    <Link to="/crear-cuenta">
                      <button type="button" className="mt-10 inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        Para adquirir, regístrate primero
                      </button>
                    </Link>
                  }
                
                {
        carrito.length > 0 ? (
        <>
        <div className="mt-10" id="payment-form1">
        <button className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded" onClick={handleVaciar}>Vaciar Carro</button>
        {/* <button className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded" onClick={iniciarPago}>Pagar con Mercado Pago</button> */}
        </div>
        </> ) : (
        <span></span>
        )
    }

    </div>
        

    </div>
  )
}

