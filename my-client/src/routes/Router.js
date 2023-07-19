import { createBrowserRouter } from 'react-router-dom';
import Nav from '../components/Nav/Nav';
import Logs from '../screens/Logs/Logs';
import Surveillance from '../screens/Surveillance/Surveillance';
import { SurveillanceContextProvider, LogsContextProvider } from '../contexts/Context';

const router = createBrowserRouter([
    {
        path: "/",
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