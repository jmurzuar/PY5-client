
import { Link } from 'react-router-dom'
import BackgroundJumbotron from './../assets/portada.jpg'
import ListProducts from './ListProducts'

export default function Main() {
  return (
    <>
      <main className="mt-10">
        <div>
          <div className="relative">
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gray-100"></div>
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
              <div className="relative shadow-xl sm:rounded-2xl sm:overflow-hidden">
                <div className="absolute inset-0">
                  <img className="h-full w-full object-cover" src={ BackgroundJumbotron } alt="Materiales de primera" />
                  <div className="absolute inset-0 bg-gray-700 mix-blend-multiply"></div>
                </div>
                <div className="relative px-4 py-16 sm:px-6 sm:py-24 lg:py-32 lg:px-8">
                  <h1 className="text-center text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
                    <span className="block text-white">Solo los mejores materiales</span>
                    
                  </h1>
                  <p className="mt-6 max-w-lg mx-auto text-center text-xl text-white sm:max-w-3xl">
                    Contamos con el mayor stock de materiales para tu proyecto
                  </p>
                  <p className="mt-6 max-w-lg mx-auto text-center text-xl text-white sm:max-w-3xl">
                    Te acompañamos con la mejor asesoría de profesionales
                  </p>
                  
                  <div className="mt-10 max-w-sm mx-auto sm:max-w-none flex justify-center">
                    <div className="space-y-4 sm:space-y-0 sm:mx-auto sm:inline-grid  sm:gap-5">
                      <Link to="/catalogo">
                        <a className="flex items-center justify-center px-4 py-3 border border-transparent text-base text-white font-medium rounded-md shadow-sm bg-blue-500 hover:bg-blue-300 sm:px-8">
                          Ver catálogo
                        </a>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </main>

      <ListProducts title="Conoce nuestro catálogo" />
    </>
  )
}