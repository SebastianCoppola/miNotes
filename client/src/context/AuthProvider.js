import React, { createContext, useEffect, useState } from "react"
import { CircularProgress } from "@mui/material"
import { useCookies } from "react-cookie"
import { BASE_URL } from "../utils/url"

export const AuthContext = createContext()

export default function AuthProvider({children}) {
    const [loading, setLoading] = useState(true)
    const [logged, setLogged] = useState(false)
    const [user, setUser] = useState(null)
    const [token, setToken, removeToken] = useCookies()
    const [loadingNotes,setLoadingNotes] = useState(true)
  
    useEffect(()=>{
        if(token && token.token){
            fetch(`${BASE_URL}/decode`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({token: token.token})
            })
            .then(res => res.json())
            .then(res => {
                setLogged(true)
                setUser(res)
                setLoading(false)
            })
        }else{
            setLogged(false)
            setLoading(false)
        }
    },[token])

    const contextValue = {
        token,
        setToken,
        removeToken,
        user,
        loading,
        loadingNotes,
        setLoadingNotes,
        login() { setLogged(true) },
        logout(){ setLogged(false) },
        isLogged() { return logged },
    }
    
    return (
        <>
            {loading ?
                <div style={{width:'100%', minHeight:'600px', display:'flex', alignItems:'center', justifyContent:'center'}}>
                    <CircularProgress />
                </div>
                :
                <AuthContext.Provider value={contextValue}>
                    {children}
                </AuthContext.Provider>
            }
        </>
        
    )
}
