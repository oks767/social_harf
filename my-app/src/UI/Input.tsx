// UI/Input.tsx
import React from 'react'
import styles from './Input.module.scss'; // создайте стили для инпута

interface InputProps {
    name: string;
    type: string;
    placeholder: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    error?: string;
}

const Input: React.FC<InputProps> = ({
    name,
    type,
    placeholder,
    value,
    onChange,
    error
}) => {
    return (
        <div className={styles.inputWrapper}>
            <input
                className={`${styles.input} ${error ? styles.inputError : ''}`}
                name={name}
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
            />
            {error && <span className={styles.errorText}>{error}</span>}
        </div>
    );
};

export default Input;