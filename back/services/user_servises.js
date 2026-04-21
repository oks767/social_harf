//нужно передать тело запроса, будем использовать руструктуризацию
export const registerUser = async (req, res) => {
    try {
        const {email, password } = req.body
        console.log(res.json())
    } 
    catch (Error) {
        `Error`
    }  
     
}
