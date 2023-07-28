import './Nav.css';

import LogoIcon from '../../assets/animated/eye.gif';
import LogoutIcon from '../../assets/icons/logout.png';

import {Link} from 'react-router-dom';

function Nav() {
    return (
        <>
            <nav>
                <div className='logo-icon container'>
                    <img className='logo-icon' src={LogoIcon}/>
                </div>

                <div className="link-container">
                    <Link to="/stream">Surveillance</Link>
                </div>
                
                <div className="link-container">
                    <Link to="/logs">Serveur Log</Link>
                </div>
                
                <div className='disconnect-icon container'>
                    <img className='disconnect-icon' src={LogoutIcon}/>
                </div>

                {/* <button className="disconnect-button">
                    <img src ="" alt='déconnection'/>
                </button> */}
            </nav>
        </>
    )
}

export default Nav