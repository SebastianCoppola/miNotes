import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '../context/useAuth';

export default function PrivateRoute() {
    const auth = useAuth();
    return (
        <>
            {auth.isLogged() ? 
                <Outlet />
                : 
                <Navigate to='/login' /> 
            }
        </>     
    )
}