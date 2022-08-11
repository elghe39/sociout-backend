import { checkCredential, createToken } from '../service/auth.service.js'

export async function loginHandler(req, res) {
    const { email, password } = req.body
    try{
        const user = await checkCredential(email, password)
        
        const token = createToken(user)

        return res.status(200).send({
            success: true,
            message: "Login successfully",
            token: token
        })
    } catch (error) {
        return res.status(404).send({
            success: false,
            message: error.message
        })
    }
}