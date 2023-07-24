import React, { useState } from 'react'
import VisibilityOn from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const usePasswordToggle = () => {
    const [visible, setVisible]= useState(false);
    const Icon = (
        <>{
            visible 
            ?
            <VisibilityOn onClick= { () => setVisible(visibility => !visibility) } />
            :
            <VisibilityOff onClick= { () => setVisible(visibility => !visibility) } />
            
        }</>        
    )
    const PasswordInputType = visible ? "text" : "password";
    
    return [PasswordInputType, Icon];
}

export default usePasswordToggle