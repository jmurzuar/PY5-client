import React, { useEffect, useState, useContext } from 'react';
import axiosClient from "./../config/axios";
import UserContext from '../context/User/UserContext'; // Importa tu contexto de usuario

const HistorySales = () => {
    const { user } = useContext(UserContext); // Obtén el usuario del contexto
    const [ventas, setVentas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const obtenerVentas = async () => {
            try {
                const res = await axiosClient.get("/obtener-ventas", {
                    params: { email: user.email }, // Incluye el email del usuario en la solicitud
                });
                setVentas(res.data.ventas); // Actualiza el estado de ventas con los datos obtenidos
                setLoading(false); // Cambia el estado de loading a false después de obtener los datos
                console.log(res)
            } catch (error) {
                console.error('Error al obtener las ventas:', error);
                setError(error.message); // Establece el mensaje de error si ocurre un problema
                setLoading(false); // Asegúrate de cambiar el estado de loading a false incluso si ocurre un error
            }
        };

        obtenerVentas();
    }, [user.email]); // Asegúrate de incluir user.email en las dependencias del useEffect

    if (loading) return <p>Cargando ventas...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Ventas del Usuario: {user.email}</h2>
            {ventas.length === 0 ? (
                <p className="text-1xl font-bold mb-4 text-yellow-300">No hay ventas disponibles</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-300">
                        <thead className="bg-gray-200">
                            <tr>
                                <th className="py-2 px-4 border-b">Fecha</th>
                                <th className="py-2 px-4 border-b">Monto</th>
                                <th className="py-2 px-4 border-b">Payment ID</th>
                                <th className="py-2 px-4 border-b">Merchant Order ID</th>
                            </tr>
                        </thead>
                        <tbody>
                            {ventas.map((venta) => (
                                <tr key={venta._id} className="text-center">
                                    <td className="py-2 px-4 border-b">{new Date(venta.createdAt).toLocaleString('es-CL')}</td>
                                    <td className="py-2 px-4 border-b">${venta.monto.toLocaleString('es-CL')}</td>
                                    <td className="py-2 px-4 border-b">{venta.payment_id}</td>
                                    <td className="py-2 px-4 border-b">{venta.merchant_order_id}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default HistorySales;