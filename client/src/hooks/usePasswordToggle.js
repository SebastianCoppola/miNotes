import React, { useState } from 'react'
import { Visibility as VisibilityOn, VisibilityOff } from '@mui/icons-material'

const usePasswordToggle = () => {
    const [visible, setVisible]= useState(false)
    
    const Icon = (
        <>
            {visible ?
                <VisibilityOn onClick= {()=>setVisible(visibility => !visibility)}/>
            :
                <VisibilityOff onClick= {()=>setVisible(visibility => !visibility)}/>
            }
        </>        
    )
    
    const PasswordInputType = visible ? 'text' : 'password'
    
    return [PasswordInputType, Icon]
}

export default usePasswordToggle