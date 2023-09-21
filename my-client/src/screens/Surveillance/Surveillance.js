import { useEffect } from 'react';

import './Surveillance.css';

import IpContainer from '../../shared/components/IpContainer/IpContainer.js'
import VideoContainer from '../../shared/components/VideoContainer/VideoContainer.js'

import { NavContextProvider } from '../../contexts/Context';

export default function Surveillance() {
    
    return (
        <>
        <section className="surveillance-section" style={{ display: 'flex', position: 'relative' }}>
            <IpContainer/>
            <VideoContainer/>
            {/* <video id="stream-container" className='cam-stream' autoPlay={true} muted="muted"></video> */}
        </section >
        </>
    )
}