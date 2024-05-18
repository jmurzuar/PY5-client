import React, { useState } from 'react';
import axiosClient from "./../../config/axios";
import VentasContext from './VentasContext';

const VentaState = (props) => {
    const initialState = {
        ventas: [],
        venta: {
            id_: "",
            usuario: "",
            monto: "",
            payment_id: "",
            merchant_order_id: ""            
        }
    };

    const getVentas = async () => {
        try {
            const res = await axiosClient.get("/obtener-ventas");
            return res.data.ventas;
        } catch (error) {
            console.error('Error al obtener las ventas:', error);
            return [];
        }
    };

    const crearVenta = async (nuevaVenta) => {
        try {
            const res = await axiosClient.post('/crear-ventas', nuevaVenta);
            return res.data;
        } catch (error) {
            console.error('Error al crear la venta:', error);
            return null;
        }
    };

    return (
        <VentasContext.Provider value={{ getVentas, crearVenta }}>
            {props.children}
        </VentasContext.Provider>
    );
};

export default VentaState;
