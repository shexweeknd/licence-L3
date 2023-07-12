import './Nav.css'
import {Link} from 'react-router-dom';


function Nav() {
    return (
        <>
            <nav>
                <Link to="/">Surveillance</Link>
                <Link to="/logs">Serveur Log</Link>
                {/* <button className="disconnect-button">
                    <img src ="" alt='déconnection'/>
                </button> */}
            </nav>
        </>
    )
}

export default Nav