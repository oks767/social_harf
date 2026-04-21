import ButtonRegister from "../../UI/ButtonRegister"
import InputForRegister from "../../UI/Input"

function AuthAndRegister () {
    return(
    <>
    <InputForRegister email="test@test.ru" password="password" name="name"/>
    <ButtonRegister />
    </>)

}
export default AuthAndRegister