import { useState, type JSX } from "react"
import type { IInput } from "../types/types"

function InputForRegister({ name, email, password }: IInput): JSX.Element {
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
  return (
    <>
      <input 
        type="text" 
        name="name" 
        placeholder="Ваше имя" 
        value={name} 
        onChange={handleChange}
      />
      <input 
        type="email" 
        name="email" 
        placeholder="Email" 
        value={email} 
        onChange={handleChange}
      />
      <input 
        type="password" 
        name="password" 
        placeholder="Пароль" 
        value={password} 
        onChange={handleChange}
      />
    </>
  );
}

export default InputForRegister;