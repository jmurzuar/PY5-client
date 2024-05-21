import React from 'react'

const ItemCount = ( {cantidad, handleRestar, handleSumar, handleAgregar} ) => {

  return (

    <div className="flex items-center">
            <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-l" onClick={handleRestar}>-</button>
            <div className="bg-gray-200 py-2 px-4">{cantidad}</div>
            <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-r" onClick={handleSumar}>+</button>
            <button className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 ml-4 rounded" onClick={handleAgregar}>Agregar</button>
        </div>


    
  )
}

export default ItemCount
