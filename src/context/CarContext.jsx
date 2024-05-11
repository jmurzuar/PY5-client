import { createContext, useEffect, useState } from "react";

export const CartContext = createContext();

const carritoInicial = JSON.parse(localStorage.getItem("carrito")) || [];
const carritoTotal = JSON.parse(localStorage.getItem("valorTotal")) || (0);


export const CartProvider = ({children}) => {

    const [carrito, setCarrito] = useState(carritoInicial);
  const [valorTotal, setValorTotal] = useState(carritoTotal);
  
  const cantidadEnCarrito = () => {
    return carrito.reduce((acc, prod) => acc + prod.cantidad, 0);
}

const vaciarCarrito = () => {
  setCarrito([]);
  setValorTotal(0);
}

useEffect(() => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}, [carrito])

useEffect(() => {
    localStorage.setItem("valorTotal", JSON.stringify(valorTotal));
}, [valorTotal])


return (
    <CartContext.Provider value={{
        carrito, 
        setCarrito, 
        valorTotal, 
        setValorTotal, 
        cantidadEnCarrito, 
        vaciarCarrito
        }}>
        {children}
    </CartContext.Provider>
)
}

