import './AdminNav.css';

import LogoIcon from '../../assets/animated/eye.gif';
import LogoutIcon from '../../assets/icons/logout.png';

import {Link} from 'react-router-dom';
import { useEffect, useContext } from 'react';
import { verifyToken } from '../../utils/authFunctions.js';
import { logout } from '../../utils/authFunctions.js';

function AdminNav() {

    useEffect( () => {
        async function verifyOnNav () {
            await verifyToken()
        }
        verifyOnNav()
    }, [])

    return (
        <>
            <nav>
                <div className='logo-icon container'>
                    <img className='logo-icon' src={LogoIcon}/>
                </div>

                <div className="link-container">
                    <Link to="/admin">Gestion Utilisateurs</Link>
                </div>
                
                <div onClick={() => logout() } className='disconnect-icon container'>
                    <img className='disconnect-icon' src={LogoutIcon}/>
                </div>

            </nav>
        </>
    )
}

export default AdminNav