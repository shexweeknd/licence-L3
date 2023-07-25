import './Surveillance.css';

import IpContainer from '../../shared/components/IpContainer/IpContainer.js'
import VideoContainer from '../../shared/components/VideoContainer/VideoContainer.js'

function Surveillance() {
    return (
        <>
        <section className="surveillance-section" style={{ display: 'flex', position: 'relative' }}>
            <IpContainer/>
            <VideoContainer/>
        </section >
        </>
    )
}

export default Surveillance