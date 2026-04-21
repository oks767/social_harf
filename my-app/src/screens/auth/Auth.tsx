import { useDispatch } from 'react-redux'
import ButtonRegister from "../../UI/ButtonRegister"
import InputForRegister from "../../UI/Input"
import { registerUser } from '../../store/slices/AuthSlice/register_slice'
import type { AppDispatch } from '../../store/store'
import type { IUser } from '../../types/types'


function AuthAndRegister ({email, password, name}: IUser) {
    const dispatch = useDispatch<AppDispatch>(); 
    const handleClick = () => {
        dispatch(registerUser({email, password, name}))
    }
    return(
    <>
    <InputForRegister email={email} password={password}name={name}/>
    <ButtonRegister onClick={handleClick}/>
    </>)

}
export default AuthAndRegister