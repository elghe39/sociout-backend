import userModel from '../model/user.model.js'
import resetCodeModel from '../model/resetPassword.model.js'
import crypto from 'crypto'
import { customAlphabet } from 'nanoid'
import transporter from '../utils/sendEmail.js'

const nanoid = customAlphabet('1234567890', 6)

export async function findUserByEmail(email) {
    const user = await userModel.findOne({email: email})
    if (!user) {
        throw new Error('User does not exist')
    }

    return user
}

export async function findUserById(userId) {
    const user = await userModel.findById(userId)
    if (!user) {
        throw new Error('User does not exist')
    }

    return user
}

export async function createUser(input) {
    const { email, firstName, lastName, password } = input

    const existUser = await userModel.findOne({ email: email })
    if(existUser) {
        throw new Error('Email is already taken')
    }

    const newUser = new userModel({ email, firstName, lastName })

    newUser.salt = crypto.randomBytes(16).toString('hex')
    newUser.hash = crypto.pbkdf2Sync(password, newUser.salt, 10000,  512, 'sha512').toString('hex')

    await newUser.save()
}

export async function changePassword(input) {
    const { userId, old_password, password } = input
    const user = await findUserById(userId)
    if(!user.validatePassword(old_password)) {
        throw new Error('Old password is incorrect')
    }

    user.hash = crypto.pbkdf2Sync(password, user.salt, 10000,  512, 'sha512').toString('hex')
    await user.save()
}

export async function changeAvatar(input) {
    const { userId, avatar } = input
    const user = await findUserById(userId)

    user.avatar = avatar
    await user.save()
}

export async function changeProfile(input) {
    const { userId, firstName, lastName, gender, dayOfBirth } = input
    await userModel.findOneAndUpdate({ userId: userId }, {
        firstName: firstName,
        lastName: lastName,
        gender: gender,
        dayOfBirth: dayOfBirth
    })
    
    return findUserById(userId)
}

export async function createResetCode(email) {
    const code = nanoid()

    const user = await findUserByEmail(email)

    if (user.resetCode) {
        await resetCodeModel.findByIdAndDelete(user.resetCode)
    }

    const resetCode = new resetCodeModel({
        code: code
    })
    user.resetCode = resetCode

    await user.save()
    await resetCode.save()

    return code
}

export function sendResetCode(email, resetCode) {
    const mailOptions = {
        from: process.env.MAIL_USERNAME,
        to: email,
        subject: 'Reset Password - Sociout',
        text: `Reset password code: ${resetCode}`
    };

    transporter.sendMail(mailOptions, (error, data) => {
        if (error) {
            throw error
        } else {
            console.log(data)
        }
    })
}

export async function resetPassword(input) {
    const { email, resetCode, password } = input

    const user = await findUserByEmail(email)
    
    const code = await resetCodeModel.findById(user.resetCode)
    if (!code) {
        throw new Error('Reset code expired')
    }

    if (code.code != resetCode) {
        throw new Error('Invalid reset code')
    }

    await resetCodeModel.findByIdAndDelete(user.resetCode)

    user.hash = crypto.pbkdf2Sync(password, user.salt, 10000,  512, 'sha512').toString('hex')
    await user.save()
}