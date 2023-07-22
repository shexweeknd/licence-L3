import './Nav.css'
import {Link} from 'react-router-dom';


function Nav() {
    return (
        <>
            <nav>
                <div className="link-container">
                    <Link to="/">Surveillance</Link>
                </div>
                
                <div className="link-container">
                    <Link to="/logs">Serveur Log</Link>
                </div>
                
                {/* <button className="disconnect-button">
                    <img src ="" alt='déconnection'/>
                </button> */}
            </nav>
        </>
    )
}

export default Nav