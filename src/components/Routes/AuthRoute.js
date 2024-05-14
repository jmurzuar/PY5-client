import React, {useContext, useEffect, useState} from 'react'

import { Route, Redirect } from 'react-router-dom'
import UserContext from './../../context/User/UserContext'

export default function AuthRoute({ component: Component, ...props }) {

    const userCtx = useContext(UserContext)
    const { authStatus, verifyingToken } = userCtx

    const [loading, setLoading] = useState(true)

    // useEffect(() => {
    //     const fetchToken = async () => {
    //     await verifyingToken();
    //     setLoading(false);
    // };
    // fetchToken();
    // }, [ authStatus ])

    //INICIO CAMBIO
    useEffect(() => {
        const fetchData = async () => {
          await verifyingToken();
          setLoading(false);
        };
    
        fetchData();
    
        //Dependencia authStatus para que se vuelva a ejecutar cuando cambie
    //   }, [verifyingToken, authStatus]);
    }, [authStatus]);

      //FIN CAMBIO

    return (
        <Route {...props} render={ props => {            

            if(loading) return null

            return authStatus ? 
                (<Redirect to="/" />)
                :
                (<Component {...props} />)
            }
        } />
    )    
}
