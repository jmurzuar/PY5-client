import { createContext, useContext } from 'react';

const VentasContext = createContext();

export const useVentasContext = () => {
    return useContext(VentasContext);
};

export default VentasContext;

