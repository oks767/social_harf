// AuthAndRegister.tsx
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../store/hooks/hooks'; // ✅ используйте кастомные хуки
import { clearError, clearSuccess, registerUser } from '../../store/slices/AuthSlice/register_slice'

function AuthAndRegister() {
    const location = useLocation();
    const navigate = useNavigate();
    
    // ✅ ПРАВИЛЬНО - вызываем функцию
    const dispatch = useAppDispatch();
    
    const isLoginMode = location.pathname === '/login';
    const { isLoading, error, success } = useAppSelector((state) => state.auth);
    
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        if (isLoginMode) {
            // Логика логина
            console.log('Login:', formData);
        } else {
            if (!formData.name || !formData.email || !formData.password) {
                return;
            }
            // ✅ ПРАВИЛЬНО - вызываем dispatch с экшеном
            dispatch(registerUser(formData));
        }
    };

    useEffect(() => {
        if (success && !isLoginMode) {
            setFormData({ name: '', email: '', password: '' });
            dispatch(clearSuccess());
            navigate('/login');
        }
    }, [success, isLoginMode, navigate, dispatch]);

    useEffect(() => {
        return () => {
            dispatch(clearError());
        };
    }, [dispatch]);

    return (
        <form onSubmit={handleSubmit}>
            <h2>{isLoginMode ? 'Login' : 'Register'}</h2>
            
            {error && <div className="error-message">{error}</div>}
            
            {!isLoginMode && (
                <input
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Full Name"
                    required
                />
            )}
            
            <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                required
            />
            
            <input
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                required
            />
            
            <button type="submit" disabled={isLoading}>
                {isLoading ? 'Loading...' : (isLoginMode ? 'Login' : 'Register')}
            </button>
        </form>
    );
}

export default AuthAndRegister;