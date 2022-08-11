import { findUserByEmail, findUserById, createUser } from '../service/user.service.js'

export async function createUserHandler(req, res) {
    try {
        const existUser = await findUserByEmail()
        if (existUser) {
            return res.status(404).send({
                success: false,
                message: 'Email is already taken'
            })
        }

        await createUser(req.body)
        
        return res.status(200).send({
            success: true,
            message: 'Create user successfully'
        })
    } catch (error) {
        return res.status(404).send({
            success: false,
            message: error.message
        })
    }
}