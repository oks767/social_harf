// screens/profile/Profile.tsx
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppSelector } from '../../store/hooks/hooks'
import type { UserProfile } from '../../types/types'
import styles from './Profile.module.scss'

function Profile() {
    const navigate = useNavigate();
    const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    
    // Получаем данные из Redux или localStorage
    const { userData } = useAppSelector((state) => state.auth);
    
    useEffect(() => {
        // Проверяем, есть ли данные пользователя
        const storedUser = localStorage.getItem('userData');
        const currentUser = userData || (storedUser ? JSON.parse(storedUser) : null);
        
        if (!currentUser) {
            // Если нет данных, перенаправляем на логин
            navigate('/login');
            return;
        }
        
        setUserProfile(currentUser);
        setIsLoading(false);
    }, [userData, navigate]);
    //поместить в кэш, танстак
    const handleLogout = () => {
        localStorage.removeItem('userData');
        localStorage.removeItem('userEmail');
        localStorage.removeItem('userRole');
        localStorage.removeItem('selectedRole');
        navigate('/login');
    };
    
    const disorderTypeMap: { [key: string]: string } = {
        anxiety: 'Тревожное расстройство',
        depression: 'Депрессия',
        bipolar: 'Биполярное расстройство',
        ocd: 'Обсессивно-компульсивное расстройство (ОКР)',
        ptsd: 'Посттравматическое стрессовое расстройство (ПТСР)',
        eating: 'Расстройство пищевого поведения',
        other: 'Другое'
    };
    
    const specializationMap: { [key: string]: string } = {
        clinical_psychologist: 'Клинический психолог',
        psychotherapist: 'Психотерапевт',
        psychiatrist: 'Психиатр',
        child_psychologist: 'Детский психолог',
        family_psychologist: 'Семейный психолог',
        cbt_therapist: 'КПТ терапевт',
        gestalt_therapist: 'Гештальт-терапевт'
    };
    
    if (isLoading) {
        return <div className={styles.loading}>Загрузка...</div>;
    }
    
    if (!userProfile) {
        return <div className={styles.error}>Пользователь не найден</div>;
    }
    
    const formatDate = (dateString: string) => {
        if (!dateString) return 'Не указано';
        return new Date(dateString).toLocaleDateString('ru-RU');
    };
    
    return (
        <div className={styles.container}>
            <div className={styles.profileCard}>
                <div className={styles.header}>
                    <div className={styles.avatar}>
                        {userProfile.name.charAt(0).toUpperCase()}
                    </div>
                    <h1 className={styles.name}>{userProfile.name}</h1>
                    <p className={styles.email}>{userProfile.email}</p>
                    <div className={styles.role}>
                        {userProfile.role === 'patient' && 'Пациент'}
                        {userProfile.role === 'doctor' && 'Врач/Психолог'}
                        {userProfile.role === 'admin' && 'Администратор'}
                        {userProfile.role === 'user' && 'Пользователь'}
                    </div>
                    <p className={styles.memberSince}>
                        На сайте с {formatDate(userProfile.createdAt)}
                    </p>
                </div>
                
                <div className={styles.content}>
                    {/* Информация для пациента */}
                    {userProfile.role === 'patient' && (
                        <div className={styles.section}>
                            <h2 className={styles.sectionTitle}>Медицинская информация</h2>
                            
                            <div className={styles.infoGrid}>
                                <div className={styles.infoItem}>
                                    <label>Тип расстройства:</label>
                                    <p>{disorderTypeMap[userProfile.disorderType || ''] || userProfile.disorderType || 'Не указано'}</p>
                                </div>
                                
                                {userProfile.disorderDescription && (
                                    <div className={styles.infoItem}>
                                        <label>Описание состояния:</label>
                                        <p>{userProfile.disorderDescription}</p>
                                    </div>
                                )}
                                
                                {userProfile.diagnosisDate && (
                                    <div className={styles.infoItem}>
                                        <label>Дата диагностики:</label>
                                        <p>{formatDate(userProfile.diagnosisDate)}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                    
                    {/* Информация для врача */}
                    {userProfile.role === 'doctor' && (
                        <div className={styles.section}>
                            <h2 className={styles.sectionTitle}>Профессиональная информация</h2>
                            
                            <div className={styles.infoGrid}>
                                <div className={styles.infoItem}>
                                    <label>Специализация:</label>
                                    <p>{specializationMap[userProfile.specialization || ''] || userProfile.specialization || 'Не указана'}</p>
                                </div>
                                
                                {userProfile.education && (
                                    <div className={styles.infoItem}>
                                        <label>Образование:</label>
                                        <p>{userProfile.education}</p>
                                    </div>
                                )}
                                
                                {userProfile.diploma && (
                                    <div className={styles.infoItem}>
                                        <label>Диплом:</label>
                                        <p>
                                            <a href={`/uploads/${userProfile.diploma}`} target="_blank" rel="noopener noreferrer">
                                                Смотреть диплом
                                            </a>
                                        </p>
                                    </div>
                                )}
                                
                                {userProfile.experience && (
                                    <div className={styles.infoItem}>
                                        <label>Опыт работы:</label>
                                        <p>{userProfile.experience} лет</p>
                                    </div>
                                )}
                                
                                {userProfile.licenseNumber && (
                                    <div className={styles.infoItem}>
                                        <label>Номер лицензии:</label>
                                        <p>{userProfile.licenseNumber}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
                
                <div className={styles.actions}>
                    <button onClick={handleLogout} className={styles.logoutButton}>
                        Выйти из аккаунта
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Profile;