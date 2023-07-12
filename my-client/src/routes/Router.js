import { createBrowserRouter } from 'react-router-dom';
import Nav from '../components/Nav/Nav';
import Logs from '../screens/Logs/Logs';
import Surveillance from '../screens/Surveillance/Surveillance'

const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <>
                <Nav/>
                <Surveillance/>
            </>
            )
    },
    {
        path: "logs",
        element: (
            <>
                <Nav/>
                <Logs/>
            </>
            )
    },
])

export default router