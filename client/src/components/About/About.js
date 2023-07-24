import React, { useState, useEffect } from 'react';
import Spinner from '../commons/Spinner';
import useLang from '../../context/useLang';

const About = () => {
    const [loading, setLoading] = useState(true);
    const lang = useLang();

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
                    <p><b>{lang.texts.about1}</b>{lang.texts.about2}</p>
                    <p>{lang.texts.about3}</p>
                    <p>{lang.texts.about4}<a href="https://github.com/SebastianCoppola" target="_blank">GitHub</a>{lang.texts.about5}<a href="https://www.linkedin.com/in/sebastiáncoppola" target="_blank">LinkedIn</a>.</p>
                </div>
            }
        </>
    )
}
export default About;