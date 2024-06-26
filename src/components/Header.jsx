import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import UserContext from '../context/User/UserContext'

import GuitarLogo from './../assets/guitarlogo.svg'

import LayoutContext from '../context/Layout/LayoutContext'
import Sidebar from './Sidebar'
import CartWidget from './CartWidget'
import { CartContext } from '../context/CarContext'




export default function Header() {

  const { vaciarCarrito } = useContext(CartContext);

  const ctxLayout = useContext(LayoutContext)

  const { setMobileNavOn, toggleMobileSidebar } = ctxLayout

  const ctxUser = useContext(UserContext)

  const { logoutUser } = ctxUser

  const handleVaciar = () => {
    vaciarCarrito();
  }

  return (
    <>

      <div className="bg-white">

        {
          setMobileNavOn ?
            <div className="fixed inset-0 flex z-40 lg:hidden" role="dialog" aria-modal="true">
              <div className="fixed inset-0 bg-black bg-opacity-25" aria-hidden="true"></div>

              <div className="relative max-w-xs w-full bg-white shadow-xl pb-12 flex flex-col overflow-y-auto">
                <div className="px-4 pt-5 pb-2 flex">
                  <button onClick={toggleMobileSidebar} type="button" className="-m-2 p-2 rounded-md inline-flex items-center justify-center text-gray-400">
                    <span className="sr-only">Cerrar menu</span>
                    <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <div className="border-t border-gray-200 py-6 px-4 space-y-6">

                  <div className="flow-root" onClick={toggleMobileSidebar}>
                    <Link to="/">
                      <img className="h-8 w-auto" src={GuitarLogo} alt="Guitar LATAM" />
                    </Link>
                  </div>

                  <div className="flow-root" onClick={toggleMobileSidebar}>
                    <Link to="/catalogo" className="-m-2 p-2 block font-medium text-gray-900">Catálogo</Link>
                    {/* <Link to="/catalogo">
                      <a href="#" className="-m-2 p-2 block font-medium text-gray-900">Catálogo</a>
                    </Link> */}
                  </div>
                </div>

                <div className="border-t border-gray-200 py-6 px-4 space-y-6">

                  {
                    ctxUser.user?.name ?
                      <>
                        <div className="flow-root" onClick={toggleMobileSidebar}>
                          <Link to="/perfil" className="-m-2 p-2 block font-medium text-gray-900">Mi perfil</Link>
                          {/* <Link to="/perfil">
                            <a href="#" className="-m-2 p-2 block font-medium text-gray-900">Mi perfil</a>
                          </Link> */}
                        </div>
                      </>
                      :
                      <>
                        <div className="flow-root" onClick={toggleMobileSidebar}>
                          <Link to="/iniciar-sesion" className="-m-2 p-2 block font-medium text-gray-900">Iniciar sesión</Link>
                          {/* <Link to="/iniciar-sesion">
                            <a href="#" className="-m-2 p-2 block font-medium text-gray-900">Iniciar sesión</a>
                          </Link> */}
                        </div>
                        <div className="flow-root" onClick={toggleMobileSidebar}>
                          <Link to="/iniciar-sesion" className="-m-2 p-2 block font-medium text-gray-900">Crear cuenta</Link>
                          {/* <Link to="/iniciar-sesion">
                            <a href="#" className="-m-2 p-2 block font-medium text-gray-900">Crear cuenta</a>
                          </Link> */}
                        </div>
                      </>
                  }

                </div>

                <div className="border-t border-gray-200 py-6 px-4">
                  <div className="-m-2 p-2 flex items-center">
                    <img src="https://catamphetamine.gitlab.io/country-flag-icons/3x2/CL.svg" alt="" className="w-5 h-auto block flex-shrink-0" />
                    <span className="ml-3 block text-base font-medium text-gray-900">
                      CLP
                    </span>
                  </div>
                </div>

                <div className="border-t border-gray-200 py-6 px-4" onClick={toggleMobileSidebar}>
                  <div className="-m-2 flex items-center">
                    <span className="ml-3 block text-base font-medium text-gray-900">
                      <CartWidget />
                    </span>
                  </div>
                </div>

              </div>
            </div>
            :
            null
        }

        <header className="relative bg-white">

          <nav aria-label="Top" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="border-b border-gray-200">
              <div className="h-16 flex items-center">
                <button onClick={toggleMobileSidebar} type="button" className="bg-white p-2 rounded-md text-gray-400 lg:hidden">
                  <span className="sr-only">Open menu</span>
                  <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>

                <Link to="/">
                  <div className="ml-4 mr-4 flex lg:ml-0">
                    <img className="h-8 w-auto" src={GuitarLogo} alt="Guitar LATAM" />
                    <div>

                      <h2 className="ml-1 font-medium bg-red-500 text-white rounded-lg h-8 w-32 flex items-center justify-center hover:bg-green-400">MARKET TEC</h2>
                    </div>

                  </div>
                </Link>


                <div className="hidden lg:ml-8 lg:block lg:self-stretch">
                  <div className="h-full flex space-x-8">

                    <div className="flex">
                      <div className="relative flex">
                        <Link to="/catalogo" className="border-transparent text-gray-700 hover:text-gray-800 relative z-10 flex items-center transition-colors ease-out duration-200 text-sm font-medium border-b-2 -mb-px pt-px" aria-expanded="false">
                          Catálogo de Productos
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>

                {
                  ctxUser.user?.name ?

                    <>
                      <Link to="/" className="ml-5 font-medium text-white bg-yellow-500 rounded-lg p-2 h-8 w-38 flex items-center justify-center hover:bg-red-500 overflow-hidden">
                        <span className="text-xs truncate">
                          Hola {ctxUser.user.name}!!
                        </span>
                      </Link>
                      <Link to="/sales" className="ml-5 border-transparent text-gray-700 hover:text-gray-800 relative z-10 flex items-center transition-colors ease-out duration-200 text-sm font-medium border-b-2 -mb-px pt-px" aria-expanded="false">
                        Tus compras
                      </Link>
                    </>

                    :
                    <>
                      <span className="h-6 w-px bg-gray-200" aria-hidden="true"></span>
                    </>

                }

                <div className="ml-auto flex items-center">





                  <div className="hidden lg:ml-8 lg:flex">
                    <div className="mx-10 text-gray-700 hover:text-gray-800 flex items-center">
                      <img src="https://catamphetamine.gitlab.io/country-flag-icons/3x2/CL.svg" alt="" className="w-5 h-auto block flex-shrink-0" />
                      <span className="ml-3 block text-sm font-medium">
                        CLP
                      </span>

                      <span className="ml-3 block text-sm font-medium">
                        <CartWidget />
                      </span>


                    </div>
                  </div>

                  {
                    ctxUser.user?.name ?

                      <>
                        <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                          <Link to="/perfil" className="text-sm font-medium text-gray-700 hover:text-gray-800">Tu perfil</Link>
                          {/* <Link to="/perfil">
                            <a href="#" className="text-sm font-medium text-gray-700 hover:text-gray-800">Tu perfil</a>
                          </Link> */}
                          <span className="h-6 w-px bg-gray-200" aria-hidden="true"></span>
                          <Link to="#" onClick={() => { logoutUser(); handleVaciar(); }} className="text-sm font-medium text-gray-700 hover:text-gray-800" >Cerrar sesión</Link>
                          {/* <a onClick={() => { logoutUser(); handleVaciar(); }} href="#" className="text-sm font-medium text-gray-700 hover:text-gray-800">Cerrar sesión</a> */}
                        </div>
                      </>

                      :
                      <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                        <Link to="/iniciar-sesion" className="text-sm font-medium text-gray-700 hover:text-gray-800">
                          Iniciar sesión
                        </Link>
                        <span className="h-6 w-px bg-gray-200" aria-hidden="true"></span>
                        <Link to="/crear-cuenta" className="text-sm font-medium text-gray-700 hover:text-gray-800">
                          Crear cuenta
                        </Link>

                      </div>

                  }

                </div>
              </div>
            </div>

          </nav>
        </header>
        <Sidebar />
      </div>
    </>
  )
}
