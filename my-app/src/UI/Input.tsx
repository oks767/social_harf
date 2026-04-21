import type { JSX } from "react";
import type { IInput } from "../types/types";

function InputForRegister({ name, email, password }: IInput): JSX.Element {
  return (
    <>
      <input 
        type="text" 
        name="name" 
        placeholder="Ваше имя" 
        value={name} 
      />
      <input 
        type="email" 
        name="email" 
        placeholder="Email" 
        value={email} 
      />
      <input 
        type="password" 
        name="password" 
        placeholder="Пароль" 
        value={password} 
      />
    </>
  );
}

export default InputForRegister;