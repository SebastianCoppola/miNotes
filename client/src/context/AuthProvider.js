import { createContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";

export const AuthContext = createContext();

export default function AuthProvider({children}) {
    const [loading, setLoading] = useState(true);
    const [logged, setLogged] = useState(false);
    const [user, setUser] = useState();
    const [token, setToken] = useCookies();
    const [loadingNotes,setLoadingNotes] = useState(true);

    useEffect(()=>{
        if(token.token){
            fetch('/decode', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({token: token.token})
            })
            .then(res => res.json())
            .then(res => {
                setLogged(true);
                setUser(res);
                setLoading(false);
            })
        }
        if(!token.token){
            setLogged(false);
            setLoading(false);
        }
    },[logged]);

    const contextValue = {
        token,
        setToken,
        user,
        loading,
        loadingNotes,
        setLoadingNotes,
        login() { setLogged(true) },
        logout() { setLogged(false) },
        isLogged() { return logged },
    }
    
    return (
        <>
            {
                loading
                ?
                <div className="body">
                    <h4>loading...</h4>
                </div>
                :
                <AuthContext.Provider value={contextValue}>
                    {children}
                </AuthContext.Provider>
            }
        </>
        
    )
}
