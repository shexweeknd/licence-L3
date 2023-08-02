export const logout = () => {
    localStorage.clear();
    window.location.pathname = 'auth'
}

export const verifyToken = () => {
    const UserDetails = localStorage.getItem('user')
    if (!UserDetails) {
        logout();
    } else {
        return true
    }
}