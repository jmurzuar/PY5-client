import React, { useContext, useEffect, useState } from 'react'
import MercadoPago2 from './../assets/mercadopago.jpg'
import ProductContext from '../context/Product/ProductContext'
import UserContext from '../context/User/UserContext'
import { Link, useParams } from 'react-router-dom'
import { CartContext } from '../context/CarContext'
import ItemCount from './ItemCount'



export default function Product() {

  const { carrito, setCarrito, valorTotal, setValorTotal } = useContext(CartContext);


  const [cantidad, setCantidad] = useState(1);

  const handleAgregar = (guitar, cantidad) => {
    const itemAgregado = { ...guitar, cantidad };

    const nuevoCarrito = [...carrito];
    console.log(nuevoCarrito)
    const estaEnElCarrito = nuevoCarrito.find((producto) => producto[0]._id === itemAgregado[0]._id);
    //console.log('soy nuevo carrito ', nuevoCarrito)

    if (estaEnElCarrito) {

      estaEnElCarrito.cantidad += cantidad;

    } else {
      nuevoCarrito.push(itemAgregado);

    }

    setCarrito(nuevoCarrito);


    //setCarrito([...carrito, itemAgregado]);
    setValorTotal(valorTotal + (precio * cantidad));

  
  }







  const handleRestar = () => {
    cantidad > 1 && setCantidad(cantidad - 1)
  }

  const handleSumar = () => {
    cantidad < 5 && setCantidad(cantidad + 1)
  }





  const params = useParams()

  const { productId } = params

  const ctxProduct = useContext(ProductContext)
  const { guitar, getGuitar, getPreferenceCheckoutMP } = ctxProduct
  //const { nombre, precio, imagen, color, descripcion, detalle } = guitar[0]
  const { nombre, precio, imagen, descripcion, detalle } = guitar[0]

  const ctxUser = useContext(UserContext)
  const { user } = ctxUser

  const baseUrl = process.env.REACT_APP_BASE_URL;
  const pathSucc = '/success';
  const pathFail = '/failure';
  const pathPend = '/pending';

  const back_urls = {
    success: `${baseUrl}${pathSucc}`,
    failure: `${baseUrl}${pathFail}`,
    pending: `${baseUrl}${pathPend}`
  };


  useEffect(() => {

    const fetchGuitar = async () => {

      const res = await getGuitar(productId)

      // MANEJO DE MERCADOPAGO.COM, SOLO SI HAY USUARIO
      if (user) {

        const id = await getPreferenceCheckoutMP({
          items: [
            {
              title: res.nombre,
              quantity: 1,
              currency_id: "CLP",
              unit_price: res.precio,
              picture_url: res.imagen
            }
          ],
          payer: {
            name: user.name,
            email: user.email
          },
          back_urls: back_urls,
          auto_return: 'approved'
        })

        console.log(id);

        const script = document.createElement('script');

        script.type = 'text/javascript';
        script.src = 'https://sdk.mercadopago.com/js/v2';

        script.addEventListener('load', () => { addCheckout(id) });
        return document.body.appendChild(script);
      }
    }

    fetchGuitar()

  }, [])

  const addCheckout = (id) => {
    const mp = new window.MercadoPago(process.env.REACT_APP_MERCADO_PAGO_PUBLIC_KEY, {
      locale: "es-CL"
    })

    mp.checkout({
      preference: {
        id: id,
      },
      render: {
        container: `#payment-form`,
        label: "Compra Rápida"
      }
    })

  }




  return (
    <div className="bg-white">


      {guitar.length === 0 ?
        null :
        (
          <>
            <div className="pt-6">
              <nav aria-label="Breadcrumb">
                <ol role="list" className="max-w-2xl mx-auto px-4 flex items-center space-x-2 sm:px-6 lg:max-w-7xl lg:px-8">
                  <li>
                    <div className="flex items-center">
                      <Link to="/catalogo">
                        <h2 className="mr-2 text-sm font-medium text-gray-900">
                          Catálogo
                        </h2>
                      </Link>
                      <svg width="16" height="20" viewBox="0 0 16 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="w-4 h-5 text-gray-300">
                        <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                      </svg>
                    </div>
                  </li>

                  <li className="text-sm">
                    <h2 aria-current="page" className="font-medium text-gray-500 hover:text-gray-600">
                      {nombre}
                    </h2>
                  </li>
                </ol>
              </nav>
              <div className="mt-6 max-w-2xl mx-auto sm:px-6 lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-3 lg:gap-x-8">
                <div className="w-full rounded-lg overflow-hidden lg:block">
                  <img src={imagen} alt="Two each of gray, white, and black shirts laying flat." className="w-full h-full object-center object-cover" />
                </div>

              </div>
              <div className="ml-6 max-w-2xl mx-auto sm:px-6 lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-3 lg:gap-x-8">
                <ItemCount
                  cantidad={cantidad}
                  handleRestar={handleRestar}
                  handleSumar={handleSumar}
                  handleAgregar={() => { handleAgregar(guitar, cantidad) }}
                />
              </div>

              <div className="max-w-2xl mx-auto pt-10 pb-16 px-4 sm:px-6 lg:max-w-7xl lg:pt-16 lg:pb-24 lg:px-8 lg:grid lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8">
                <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
                  <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
                    {nombre}
                  </h1>
                </div>

                <div className="mt-4 lg:mt-0 lg:row-span-3">
                  <h2 className="text-3xl font-extrabold text-gray-400">Características</h2>

                  <p className="text-base text-gray-900 mt-6">
                    <b>Precio</b>
                  </p>

                  {/* <p className="text-base text-gray-900 mb-6">
                    <b>Color</b>: { color }
                  </p> */}
                  <p className="text-base font-extrabold text-gray-900 mb-6">
                    CLP $ {precio.toLocaleString('es-CL')}
                  </p>




                  {
                    user?.email ?
                      <div className="mt-10" id="payment-form">
                        <img src={MercadoPago2} alt="Descripción de la imagen"></img>
                      </div>
                      :
                      <Link to="/crear-cuenta">
                        <button type="button" className="mt-10 inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                          Para adquirir, regístrate primero
                        </button>
                      </Link>
                  }

                </div>

                <div className="py-10 lg:pt-6 lg:pb-16 lg:col-start-1 lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
                  <div>
                    <h3 className="sr-only">Description</h3>

                    <div className="space-y-6">
                      <p className="text-base text-gray-900"> {descripcion} </p>
                    </div>
                  </div>

                  
                  <div className="mt-10">
                    <h2 className="text-sm font-medium text-gray-900">Detalles</h2>
                    {/* <button onClick={handleClick (guitar)}>Haz clic aquí</button> */}
                    <div className="mt-4 space-y-6">
                      <p className="text-sm text-gray-600"> {detalle}</p>



                    </div>
                  </div>
                </div>
              </div>







            </div>
          </>
        )
      }


    </div>
  )
}
