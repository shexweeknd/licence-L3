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

export const verifyAdminToken = async () => {
    const userDetails = JSON.parse(localStorage.getItem('userData'))

    if (!userDetails) {
        return logout();
    }

    if(userDetails.email !== "admin@eye.com") {
        return window.location.pathname = 'stream'
    }
}