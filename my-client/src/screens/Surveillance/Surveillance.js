import IpContainer from '../../components/IpContainer/IpContainer.js'
import VideoContainer from '../../components/VideoContainer/VideoContainer.js'

function Surveillance() {
    return (
        <>
        <section style={{display: 'flex', position: 'relative'}}>
            <IpContainer/>
            <VideoContainer/>
        </section >
        </>
    )
}

export default Surveillance