import { createBrowserRouter } from 'react-router-dom';
import Nav from '../shared/components/Nav/Nav';

import Logs from '../screens/Logs/Logs';
import Surveillance from '../screens/Surveillance/Surveillance';
import Auth from '../screens/Auth/Auth.js';
import RegisterScreen from '../screens/RegisterScreen/RegisterScreen.js';

import { SurveillanceContextProvider, LogsContextProvider } from '../contexts/Context';

const router = createBrowserRouter([
    {
        path: "/auth",
        element: (
            <>
                <Auth/>
            </>
            )
    },
    {
        path: "/register",
        element: (
            <>
                <RegisterScreen/>
            </>
            )
    },
    {
        path: "/stream",
        element: (
            <>
                <Nav/>
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
                <Nav/>
                <LogsContextProvider>
                    <Logs/> 
                </LogsContextProvider>
            </>
            )
    },
])

export default router