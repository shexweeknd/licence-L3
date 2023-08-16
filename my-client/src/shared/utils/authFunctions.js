import { connectToSocketServer } from '../../socketClient/connexion.js';

export const logout = () => {
    localStorage.clear();
    window.location.pathname = 'auth'
}

export const verifyToken = async () => {
    const UserDetails = localStorage.getItem('userData')

    if (!UserDetails) {
        logout();
    } else {
        connectToSocketServer(JSON.parse(UserDetails));
    }
}