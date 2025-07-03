import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react';
function AuthLayout({ children, authenticationStatus = true }) {
    const navigate = useNavigate();
    const [loader, setLoader] = useState(true)
    const authStatus = useSelector((state) => state.auth.status)

    useEffect(() => {
        if (authenticationStatus && authStatus == !authenticationStatus) {
            navigate('/login')
            
        }
        else if (!authenticationStatus && authStatus !== authenticationStatus){
            navigate('/')
        }
        setLoader(false)
    }, [authenticationStatus, navigate, authStatus])
    
    return loader ? <h1>loading</h1> : <h1>{children}</h1>
    
}

export default AuthLayout