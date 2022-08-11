import userModel from '../model/user.model.js'
import crypto from 'crypto'

export function findUserByEmail(email){
    return userModel.findOne({email: email})
}

export function findUserById(userId){
    return userModel.findById(userId)
}

export async function createUser(input){
    const { email, firstName, lastName, gender, dayOfBirth, password } = input

    const newUser = new userModel({ email, firstName, lastName, gender, dayOfBirth })

    newUser.salt = crypto.randomBytes(16).toString('hex')
    newUser.hash = crypto.pbkdf2Sync(password, newUser.salt, 10000,  512, 'sha512').toString('hex')

    await newUser.save()
}
