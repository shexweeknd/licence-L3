import { Navigate, createBrowserRouter } from 'react-router-dom';
import Nav from '../shared/components/Nav/Nav';
import AdminNav from '../shared/components/AdminNav/AdminNav'

import Logs from '../screens/Logs/Logs';
import Surveillance from '../screens/Surveillance/Surveillance';
import Admin from '../screens/Admin/Admin';
import Auth from '../screens/Auth/Auth.js';
import CamsApp from '../screens/CamsApp/CamsApp.js';

import { SurveillanceContextProvider, LogsContextProvider, NavContextProvider } from '../contexts/Context';
// import Brouillon from './Brouillon';

const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <>
                {/* ajoute une logique avec les cookies pour faire du protect route et du rendu conditionnel */}
                <Navigate to='/auth' replace={true}/>
            </>
            )
    },
    {
        path: "/auth",
        element: (
            <>
                <Auth/>
            </>
            )
    },
    {
        path: "/admin",
        element: (
            <>  
                <AdminNav/>
                <Admin/>
            </>
        )
    },
    {
        path: "/stream",
        element: (
            <>
                <NavContextProvider>
                    <Nav/>
                </NavContextProvider>
                <SurveillanceContextProvider>
                    <Surveillance/>
                </SurveillanceContextProvider>
            </>
            )
    },
    {
        path: "logs",
        element: (
            <>
                <NavContextProvider>
                    <Nav/>
                </NavContextProvider>
                <LogsContextProvider>
                    <Logs/> 
                </LogsContextProvider>
            </>
            )
    },
    {
        path: "cams-app",
        element: (
            <>
                <CamsApp/>
            </>
        )
    },
    // {
    //     path: "brouillon",
    //     element: (
    //         <>
    //             <Nav/>
    //             <Brouillon/>
    //         </>
    //     )
    // }
])

export default router