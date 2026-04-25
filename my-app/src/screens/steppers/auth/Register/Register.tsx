// screens/steppers/register/Register.tsx
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../../../store/hooks/hooks'
import { clearSuccess, registerUser } from '../../../../store/slices/AuthSlice/register_slice'
import styles from './Register.module.scss'

function Register() {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { isLoading, error, success } = useAppSelector((state) => state.role);
    // Profile.tsx
const { userData } = useAppSelector((state) => state.auth);
// userData уже содержит всю информацию о пользователе
    // Получаем выбранную роль из localStorage
    const [userRole, setUserRole] = useState<string>('');
    
    // Общие поля для всех форм
    const [commonData, setCommonData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    
    // Поля для пациента
    const [patientData, setPatientData] = useState({
        disorderType: '',
        disorderDescription: '',
        diagnosisDate: ''
    });
    
    // Поля для врача/психолога
    const [doctorData, setDoctorData] = useState({
        diploma: '',
        specialization: '',
        experience: '',
        licenseNumber: '',
        education: ''
    });
    
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    
    // Проверяем выбранную роль при загрузке
    useEffect(() => {
        const role = localStorage.getItem('selectedRole') || localStorage.getItem('userRole');
        if (!role) {
            navigate('/role');
        } else {
            setUserRole(role);
        }
    }, [navigate]);
    
    // Обработчик общих полей
    const handleCommonChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setCommonData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };
    
    // Обработчик полей пациента
    const handlePatientChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setPatientData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };
    
    // Обработчик полей врача
    const handleDoctorChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setDoctorData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };
    
    // Валидация формы
    const validateForm = (): boolean => {
        const newErrors: { [key: string]: string } = {};
        
        // Общая валидация
        if (!commonData.name.trim()) {
            newErrors.name = 'Имя обязательно';
        } else if (commonData.name.length < 2) {
            newErrors.name = 'Имя должно содержать минимум 2 символа';
        }
        
        if (!commonData.email) {
            newErrors.email = 'Email обязателен';
        } else if (!/\S+@\S+\.\S+/.test(commonData.email)) {
            newErrors.email = 'Введите корректный email';
        }
        
        if (!commonData.password) {
            newErrors.password = 'Пароль обязателен';
        } else if (commonData.password.length < 4) {
            newErrors.password = 'Пароль должен содержать минимум 4 символа';
        }
        
        if (commonData.password !== commonData.confirmPassword) {
            newErrors.confirmPassword = 'Пароли не совпадают';
        }
        
        // Валидация для пациента
        if (userRole === 'patient') {
            if (!patientData.disorderType) {
                newErrors.disorderType = 'Выберите тип расстройства';
            }
        }
        
        // Валидация для врача
        if (userRole === 'doctor') {
            if (!doctorData.specialization) {
                newErrors.specialization = 'Укажите специализацию';
            }
            if (!doctorData.diploma) {
                newErrors.diploma = 'Загрузите диплом';
            }
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    
    // Отправка формы
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }
        
        // Формируем данные для отправки
        const registrationData: any = {
            name: commonData.name.trim(),
            email: commonData.email.toLowerCase().trim(),
            password: commonData.password,
            role: userRole,
        };
        
        // Добавляем специфичные данные в зависимости от роли
        if (userRole === 'patient') {
            registrationData.disorderType = patientData.disorderType;
            registrationData.disorderDescription = patientData.disorderDescription;
            registrationData.diagnosisDate = patientData.diagnosisDate;
        } else if (userRole === 'doctor') {
            registrationData.specialization = doctorData.specialization;
            registrationData.diploma = doctorData.diploma;
            registrationData.experience = doctorData.experience;
            registrationData.licenseNumber = doctorData.licenseNumber;
            registrationData.education = doctorData.education;
        }
        
        dispatch(registerUser(registrationData));
    };
    
    // После успешной регистрации
// В Register.tsx измените navigation после успешной регистрации
useEffect(() => {
    if (success && userData) {
        setTimeout(() => {
            navigate('/profile'); // ← Меняем с /login на /profile
            dispatch(clearSuccess());
        }, 2000);
    }
}, [success, userData, navigate, dispatch]);
    
    // Если роль не определена, показываем загрузку
    if (!userRole) {
        return <div className={styles.loading}>Загрузка...</div>;
    }
    
    return (
        <div className={styles.container}>
            <form className={styles.form} onSubmit={handleSubmit}>
                <h2 className={styles.title}>
                    Регистрация {userRole === 'patient' ? 'Пациента' : userRole === 'doctor' ? 'Врача/Психолога' : 'Пользователя'}
                </h2>
                
                {error && <div className={styles.error}>{error}</div>}
                {success && <div className={styles.success}>Регистрация успешна! Перенаправление на вход...</div>}
                
                {/* Общие поля */}
                <div className={styles.section}>
                    <h3>Основная информация</h3>
                    
                    <div className={styles.formGroup}>
                        <label>Имя *</label>
                        <input
                            type="text"
                            name="name"
                            value={commonData.name}
                            onChange={handleCommonChange}
                            placeholder="Введите ваше полное имя"
                        />
                        {errors.name && <span className={styles.errorText}>{errors.name}</span>}
                    </div>
                    
                    <div className={styles.formGroup}>
                        <label>Email *</label>
                        <input
                            type="email"
                            name="email"
                            value={commonData.email}
                            onChange={handleCommonChange}
                            placeholder="example@mail.com"
                        />
                        {errors.email && <span className={styles.errorText}>{errors.email}</span>}
                    </div>
                    
                    <div className={styles.formGroup}>
                        <label>Пароль *</label>
                        <input
                            type="password"
                            name="password"
                            value={commonData.password}
                            onChange={handleCommonChange}
                            placeholder="Минимум 4 символа"
                        />
                        {errors.password && <span className={styles.errorText}>{errors.password}</span>}
                    </div>
                    
                    <div className={styles.formGroup}>
                        <label>Подтвердите пароль *</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            value={commonData.confirmPassword}
                            onChange={handleCommonChange}
                            placeholder="Повторите пароль"
                        />
                        {errors.confirmPassword && <span className={styles.errorText}>{errors.confirmPassword}</span>}
                    </div>
                </div>
                
                {/* Форма для пациента */}
                {userRole === 'patient' && (
                    <div className={styles.section}>
                        <h3>Медицинская информация</h3>
                        
                        <div className={styles.formGroup}>
                            <label>Тип расстройства *</label>
                            <select
                                name="disorderType"
                                value={patientData.disorderType}
                                onChange={handlePatientChange}
                            >
                                <option value="">Выберите тип расстройства</option>
                                <option value="anxiety">Тревожное расстройство</option>
                                <option value="depression">Депрессия</option>
                                <option value="bipolar">Биполярное расстройство</option>
                                <option value="ocd">ОКР</option>
                                <option value="ptsd">ПТСР</option>
                                <option value="eating">Расстройство пищевого поведения</option>
                                <option value="other">Другое</option>
                            </select>
                            {errors.disorderType && <span className={styles.errorText}>{errors.disorderType}</span>}
                        </div>
                        
                        <div className={styles.formGroup}>
                            <label>Описание состояния</label>
                            <textarea
                                name="disorderDescription"
                                value={patientData.disorderDescription}
                                onChange={handlePatientChange}
                                placeholder="Опишите ваше состояние..."
                                rows={4}
                            />
                        </div>
                        
                        <div className={styles.formGroup}>
                            <label>Дата диагностики</label>
                            <input
                                type="date"
                                name="diagnosisDate"
                                value={patientData.diagnosisDate}
                                onChange={handlePatientChange}
                            />
                        </div>
                    </div>
                )}
                
                {/* Форма для врача/психолога */}
                {userRole === 'doctor' && (
                    <div className={styles.section}>
                        <h3>Профессиональная информация</h3>
                        
                        <div className={styles.formGroup}>
                            <label>Специализация *</label>
                            <select
                                name="specialization"
                                value={doctorData.specialization}
                                onChange={handleDoctorChange}
                            >
                                <option value="">Выберите специализацию</option>
                                <option value="clinical_psychologist">Клинический психолог</option>
                                <option value="psychotherapist">Психотерапевт</option>
                                <option value="psychiatrist">Психиатр</option>
                                <option value="child_psychologist">Детский психолог</option>
                                <option value="family_psychologist">Семейный психолог</option>
                                <option value="cbt_therapist">КПТ терапевт</option>
                                <option value="gestalt_therapist">Гештальт-терапевт</option>
                            </select>
                            {errors.specialization && <span className={styles.errorText}>{errors.specialization}</span>}
                        </div>
                        
                        <div className={styles.formGroup}>
                            <label>Диплом *</label>
                            <input
                                type="file"
                                name="diploma"
                                onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (file) {
                                        setDoctorData(prev => ({ ...prev, diploma: file.name }));
                                    }
                                }}
                                accept=".pdf,.jpg,.png,.jpeg"
                            />
                            <small className={styles.hint}>Загрузите скан диплома (PDF, JPG, PNG)</small>
                            {errors.diploma && <span className={styles.errorText}>{errors.diploma}</span>}
                        </div>
                        
                        <div className={styles.formGroup}>
                            <label>Образование</label>
                            <input
                                type="text"
                                name="education"
                                value={doctorData.education}
                                onChange={handleDoctorChange}
                                placeholder="Например: МГУ им. Ломоносова, факультет психологии"
                            />
                        </div>
                        
                        <div className={styles.formGroup}>
                            <label>Номер лицензии / Сертификаты</label>
                            <input
                                type="text"
                                name="licenseNumber"
                                value={doctorData.licenseNumber}
                                onChange={handleDoctorChange}
                                placeholder="Номер лицензии (если есть)"
                            />
                        </div>
                        
                        <div className={styles.formGroup}>
                            <label>Опыт работы (лет)</label>
                            <input
                                type="number"
                                name="experience"
                                value={doctorData.experience}
                                onChange={handleDoctorChange}
                                placeholder="Например: 5"
                                min="0"
                            />
                        </div>
                    </div>
                )}
                
                <button type="submit" disabled={isLoading} className={styles.submitButton}>
                    {isLoading ? 'Регистрация...' : 'Зарегистрироваться'}
                </button>
                
                <button type="button" onClick={() => navigate('/role')} className={styles.backButton}>
                    ← Назад к выбору роли
                </button>
            </form>
        </div>
    );
}

export default Register;