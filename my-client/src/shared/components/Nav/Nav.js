import './Nav.css';

import LogoIcon from '../../assets/animated/eye.gif';
import LogoutIcon from '../../assets/icons/logout.png';

import {Link} from 'react-router-dom';
import { useEffect, useContext } from 'react';
import { verifyToken } from '../../utils/authFunctions.js';
import { logout } from '../../utils/authFunctions.js';

import { NavContext } from '../../../contexts/Context';

function Nav() {

    const { listed, setListed } = useContext(NavContext)

    const toggleListed = () => {
        setListed(!listed)
    }

    useEffect(async () => {
        await verifyToken()
    }, [])

    return (
        <>
            <nav>
                <div className='logo-icon container'>
                    <img onClick={() => toggleListed()} className='logo-icon' src={LogoIcon}/>
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

            </nav>
        </>
    )
}

export default Nav