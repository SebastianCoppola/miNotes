import React, { useState, useEffect } from 'react';
import Spinner from '../commons/Spinner';

const About = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(false);
    })

    return (
        <>
            {
                loading
                ?
                <Spinner />
                :
                <div className="about">
                    <p> <b>miNotes</b> main goal is to end procastination. Use it as your ally for setting priorities and make sure you get everything done.</p>
                    <p> It was developed by Sebastián Coppola using React 18.2 and Node Js. </p>
                    <p> Check out more of his work on <a href="https://github.com/SebastianCoppola" target="_blank">GitHub</a>, or email: </p>
                    <p>seba.coppola@hotmail.com </p>
                </div>
            }
        </>
    )
}
export default About;