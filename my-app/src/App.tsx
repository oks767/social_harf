// App.tsx
import { Route, Routes } from 'react-router-dom'
import AuthAndRegister from './screens/auth/Auth'

function App() {
    return (
        <Routes>
            {/* 👇 Правильно - используем Route */}
            <Route path="/register" element={<AuthAndRegister />} />
            <Route path="/login" element={<AuthAndRegister />} />
            <Route path="/" element={<div>Home</div>} />
        </Routes>
    );
}

export default App;