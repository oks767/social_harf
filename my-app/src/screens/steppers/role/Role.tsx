// Role.tsx
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../../store/hooks/hooks'
import { clearError } from '../../../store/slices/AuthSlice/register_slice'; // ✅ Правильный импорт
import ButtonRegister from '../../../UI/ButtonRegister/ButtonRegister'
import styles from './Role.module.scss'

function Role() {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [selectedRole, setSelectedRole] = useState<string>('');
    const [localError, setLocalError] = useState('');
    
    // ✅ Исправлено: используем state.register, не state.role
    const { isLoading, error, success } = useAppSelector((state) => state.role);
    
    const userEmail = localStorage.getItem('userEmail') || 
                     JSON.parse(localStorage.getItem('userData') || '{}').email;

    useEffect(() => {
        if (localError) {
            setLocalError('');
        }
    }, [selectedRole]);

    useEffect(() => {
        if (success) {
            const roleValue = selectedRole === 'Психолог/Врач' ? 'doctor' : 'patient';
            localStorage.setItem('selectedRole', roleValue);
            localStorage.setItem('userRole', roleValue);
            navigate('/register');
            dispatch(clearError());
        }
    }, [success, selectedRole, navigate, dispatch]);

    const handleRoleSelect = (role: string) => {
        setSelectedRole(role);
        setLocalError('');
    };

    const handleNext = () => {
        if (!selectedRole) {
            setLocalError('Пожалуйста, выберите вашу роль');
            return;
        }

        // ✅ Для первого степпера отправляем только выбранную роль
        // Email пока не нужен, сохраняем роль в localStorage
        const roleValue = selectedRole === 'Психолог/Врач' ? 'doctor' : 'patient';
        
        // Сохраняем роль в localStorage
        localStorage.setItem('selectedRole', roleValue);
        localStorage.setItem('userRole', roleValue);
        
        // Переходим на страницу регистрации
        navigate('/register');
        
        // Если нужно отправить на сервер позже, это можно сделать при регистрации
    };

    const displayError = localError || error;

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Выберите вашу роль</h2>
            
            <form className={styles.card}>
                <ButtonRegister 
                    className={`${styles.button} ${selectedRole === 'Пациент' ? styles.active : ''}`}
                    onClick={() => handleRoleSelect('Пациент')}
                >
                    <div className={styles.buttonContent}>
                        <span className={styles.buttonIcon}>👤</span>
                        <span className={styles.buttonText}>Пациент</span>
                    </div>
                </ButtonRegister>
                
                <ButtonRegister 
                    className={`${styles.button} ${selectedRole === 'Психолог/Врач' ? styles.active : ''}`}
                    onClick={() => handleRoleSelect('Психолог/Врач')}
                >
                    <div className={styles.buttonContent}>
                        <span className={styles.buttonIcon}>👨‍⚕️</span>
                        <span className={styles.buttonText}>Психолог/Врач</span>
                    </div>
                </ButtonRegister>
            </form>
            
            {displayError && <div className={styles.error}>{displayError}</div>}
            
            <ButtonRegister 
                className={styles.nextButton}
                onClick={handleNext}
                disabled={!selectedRole}
            >
                Далее →
            </ButtonRegister>
        </div>
    );
}

export default Role;