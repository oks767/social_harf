// router.tsx
import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import { default as AuthAndRegister, default as Register } from '../screens/steppers/auth/Register/Register'
import Role from '../screens/steppers/role/Role'
export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,  
        children: [
            {
                path: '/register',
                element: <Register  />,
            },
            {
                path: 'login',
                element: <AuthAndRegister />,
            },
            {
                path: '/role',
                element: <Role/ >
                
            },
        ],
    },
]);