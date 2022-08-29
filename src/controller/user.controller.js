import { findUserById, createUser, changePassword, changeAvatar, changeProfile, createResetCode, sendResetCode, resetPassword, checkEmail, checkOldPassword, findUserByEmail, changeCover} from '../service/user.service.js'

export async function createUserHandler(req, res) {
    const { email } = req.body
    try {
        await checkEmail(email)
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
    const { userId, old_password } = req.body
    try {
        await checkOldPassword(userId, old_password)
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
        await findUserByEmail(email)

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

export async function changeCoverHandler(req, res) {
    const userId = req.body.userId
    const newCover = req.body.cover
    try {
        const user = await findUserById(userId)
        
        await changeCover(user, newCover)
        return res.status(200).send({
            success: true,
            message: "Change cover successfully"
        })
    } catch (error) {
        return res.status(404).send({
            success: false,
            message: error.message
        })
    }
}