import React from 'react'
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';


const BotonLink = ({link,value,variant,color}) => {

    return (
        <Link to={link} className="link">
            <Button variant={variant} color={color}>
                {value}
            </Button>
        </Link>
    )
}

BotonLink.defaultProps = {
    variant: "outlined",
    color: "primary",
    value: "Button Link",
    link: "/"
}

export default BotonLink;