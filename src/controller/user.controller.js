import { findUserByEmail, findUserById, createUser, changePassword, changeAvatar, changeProfile, createResetCode, sendResetCode, resetPassword} from '../service/user.service.js'

export async function createUserHandler(req, res) {
    try {
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

export async function changePasswordHandler(req, res) {
    try {
        await changePassword(req.body)

        return res.status(200).send({
            success: true,
            message: "Change password successfully"
        })
    } catch (error) {
        return res.status(404).send({
            success: false,
            message: error.message
        })
    }
}

export async function getMeHandler(req, res) {
    const userId = req.body.userId
    try{
        const user = await findUserById(userId)
        if(!user) {
            throw new Error('User does not exist')
        }

        return res.status(200).send({
            success: true,
            message: "Get profile successfully",
            data: {
                firstName: user.firstName,
                lastName: user.lastName,
                gender: user.gender,
                dayOfBirth: user.dayOfBirth,
                avatar: user.avatar
            }
        })
    } catch (error) {
        return res.status(404).send({
            success: false,
            message: error.message
        })
    }
}

export async function getProfileHandler(req, res) {
    const userId = req.params.userId
    try{
        const user = await findUserById(userId)
        if(!user) {
            throw new Error('User does not exist')
        }

        return res.status(200).send({
            success: true,
            message: "Get profile successfully",
            data: {
                firstName: user.firstName,
                lastName: user.lastName,
                gender: user.gender,
                dayOfBirth: user.dayOfBirth,
                avatar: user.avatar
            }
        })
    } catch (error) {
        return res.status(404).send({
            success: false,
            message: error.message
        })
    }
}

export async function changeAvatarHandler(req, res) {
    try {
        await changeAvatar(req.body)

        return res.status(200).send({
            success: true,
            message: "Change avatar successfully"
        })
    } catch (error) {
        return res.status(404).send({
            success: false,
            message: error.message
        })
    }
}

export async function changeProfileHandler(req, res) {
    try {
        const user = await changeProfile(req.body)

        return res.status(200).send({
            success: true,
            message: "Update profile successfully",
            data: {
                firstName: user.firstName,
                lastName: user.lastName,
                gender: user.gender,
                dayOfBirth: user.dayOfBirth,
                avatar: user.avatar
            }
        })
    } catch (error) {
        return res.status(404).send({
            success: false,
            message: error.message
        })
    }
}

export async function forgetPasswordHandler(req, res) {
    const { email } = req.body
    try {
        const resetCode = await createResetCode(email)

        sendResetCode(email, resetCode)
        return res.status(200).send({
            success: true,
            message: "Forget password sucessfully"
        })
    } catch (error) {
        return res.status(404).send({
            success: false,
            message: error.message
        })
    }
}

export async function resetPasswordHandler(req, res) {
    try {
        await resetPassword(req.body)

        return res.status(200).send({
            success: true,
            message: "Reset password successfully"
        })
    } catch (error) {
        return res.status(404).send({
            success: false,
            message: error.message
        })
    }
}