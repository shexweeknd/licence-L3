import './Nav.css';

import LogoIcon from '../../assets/animated/eye.gif';
import LogoutIcon from '../../assets/icons/logout.png';

import {Link} from 'react-router-dom';
import { useEffect } from 'react';
import { verifyToken } from '../../utils/authFunctions.js';
import { logout } from '../../utils/authFunctions.js';

function Nav() {

    useEffect(async () => {
        await verifyToken()
    }, [])

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
                
                <div onClick={() => logout() } className='disconnect-icon container'>
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