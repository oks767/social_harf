// App.tsx
import { Route, Routes } from 'react-router-dom'
import Profile from './screens/Profile/Profile'
// import AuthAndRegister from './screens/steppers/auth/Auth'
import Register from './screens/steppers/auth/Register/Register'
import Role from './screens/steppers/role/Role'


function App() {
    return (
        <Routes>
            
            <Route path="/register" element={<Register/>} />
            <Route path='/profile' element={<Profile />} />
            <Route path="/" element={<div>Home</div>} />
    
            <Route path="/role" element={<Role />} />
        </Routes>
    );
}

export default App;