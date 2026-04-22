// router.tsx
import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import AuthAndRegister from '../screens/auth/Auth'

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,  
        children: [
            {
                path: '/register',
                element: <AuthAndRegister  />,
            },
            {
                path: 'login',
                element: <AuthAndRegister />,
            },
        ],
    },
]);