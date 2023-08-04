import { useEffect } from 'react';

import './Surveillance.css';

import IpContainer from '../../shared/components/IpContainer/IpContainer.js'
import VideoContainer from '../../shared/components/VideoContainer/VideoContainer.js'
import { verifyToken } from '../../shared/utils/authFunctions';

export default function Surveillance() {
    useEffect(async () => {
        await verifyToken()
    }, [])

    return (
        <>
        <section className="surveillance-section" style={{ display: 'flex', position: 'relative' }}>
            <IpContainer/>
            <VideoContainer/>
        </section >
        </>
    )
}