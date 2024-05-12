import React, { useContext } from 'react'
import { CartContext } from '../context/CarContext'

import MercadoPago from './../assets/mercadopago.jpg'
import UserContext from '../context/User/UserContext'



export const Carro = () => {
    const { carrito, valorTotal, cantidadEnCarrito, vaciarCarrito, precioTotal} = useContext(CartContext);
    
    // console.log(carrito)


    const iniciarPago = () => {
        // Aquí deberías implementar la lógica para iniciar el proceso de pago con Mercado Pago
        // Esto puede incluir redireccionar al usuario a una página de pago o mostrar un modal de pago, dependiendo de la integración de Mercado Pago que estés utilizando
        console.log('Iniciando proceso de pago con Mercado Pago para el monto:', valorTotal);
      };

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
    <div className="mt-4 lg:mt-0 ml-10 lg:flex lg:items-start lg:justify-between">
    <div className="lg:ml-4 lg:mt-1 lg:flex lg:space-x-2">
        <button className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded" onClick={handleVaciar}>Vaciar Carro</button>
        <button className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded" onClick={iniciarPago}>Pagar con Mercado Pago</button>
    </div>
    </div>
        {/* <p>Valor Total: $ {valorTotal.toLocaleString('es-ES')}</p>

        <button onClick={handleVaciar}>Vaciar Carro</button>

        <button onClick={iniciarPago}>Pagar con Mercado Pago</button> */}

       

          {/* Aquí puedes agregar más elementos o funcionalidades relacionadas con el carrito */}
        </> :
        <h2 className="mt-4 lg:mt-4 ml-10 lg:flex lg:items-start lg:justify-between text-3xl font-semibold mb-4 lg:mb-4">El carrito está vacío</h2>
    }
        
    {
//             carrito.map((prod, index) => (
//                 // <div key={index}>
//                 //     <br />
//                 //     <h3>{prod[0].nombre}</h3>
//                 //     <p>Precio unit: $ {prod[0].precio.toLocaleString('es-ES')}</p>
//                 //     <p>id: {prod[0]._id} </p>
//                 //     <p>Cant: {prod.cantidad} </p>
//                 //     <p>Precio total parcial: $ {(prod[0].precio * prod.cantidad).toLocaleString('es-ES')}</p>
                    
//                 //     <br />
//                 // </div>

//                 <div key={index} className="my-4 border border-gray-200 rounded-lg overflow-hidden">
//     <div className="p-4">
//         <h3 className="text-xl font-semibold">{prod[0].nombre}</h3>
//         <p className="text-gray-600">Precio unitario: $ {prod[0].precio.toLocaleString('es-ES')}</p>
//         <p className="text-gray-600">ID: {prod[0]._id} </p>
//         <p className="text-gray-600">Cantidad: {prod.cantidad} </p>
//         <p className="text-gray-600">Precio total parcial: $ {(prod[0].precio * prod.cantidad).toLocaleString('es-ES')}</p>
//     </div>
// </div>
//             ))


<div className="mx-auto max-w-screen-xl px-4">
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
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
            <div className="w-20 h-20 ml-4">
                <img src={prod[0].imagen} alt="Two each of gray, white, and black shirts laying flat." className="w-full h-full object-center object-cover" />
            </div>
        </div>
    </div>
    ))}
</div>
</div>
           
        }
        

        

    </div>
  )
}

