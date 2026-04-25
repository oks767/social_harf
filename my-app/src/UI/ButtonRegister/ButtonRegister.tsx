// UI/ButtonRegister/ButtonRegister.tsx
import React from 'react'
import styles from './ButtonRegister.module.scss'

interface ButtonRegisterProps {
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
    disabled?: boolean;
    type?: 'button' | 'submit' | 'reset';
}

const ButtonRegister: React.FC<ButtonRegisterProps> = ({ 
    children, 
    className, 
    onClick, 
    disabled = false,
    type = 'button'
}) => {
    return (
        <button
            type={type}
            className={`${styles.button} ${className || ''}`}
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    );
};

export default ButtonRegister;