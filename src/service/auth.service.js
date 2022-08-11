import userModel from '../model/user.model.js'
import { generateToken } from '../utils/jwt.js'
import { findUserByEmail } from './user.service.js'

export async function checkCredential(email, password){
    const user = await findUserByEmail(email)
    switch(true) {
        case !user: 
            throw new Error('Wrong credentials')
        case !user.validatePassword(password): 
            throw new Error('Wrong credentials password');
    }
    return user
}

export function createToken(user){
    const token = generateToken({
        id: user._id,
        email: user.email
    })
    return token
}