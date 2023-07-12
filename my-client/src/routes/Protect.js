// ce fichier sert à protéger les routes

import { Navigate } from 'react-router-dom';

function Protect({token, children}) {
    const validateToken = (token) => (
        token
        // ajoute une logique pour authentifier l'utilisateur
    )
    verifiedToken = validateToken(token)

    if(!verifiedToken) {
        return <Navigate to="/login"/>
    }

    return {children}
}

export default Protect