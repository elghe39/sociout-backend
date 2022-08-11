import joi from 'joi'
import { joiPasswordExtendCore } from 'joi-password'

const joiPassword = joi.extend(joiPasswordExtendCore)

export const createUserSchema = joi.object({
    email: joi.string()
        .min(3)
        .required()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    firstName: joi.string()
        .required(),
    lastName: joi.string()
        .required(),
    gender: joi.string()
        .required(),
    dayOfBirth: joi.date()
        .max(Date())
        .required(),
    password: joiPassword.string()
        .min(8)
        .required()
        .minOfLowercase(1)
        .minOfUppercase(1)
        .minOfNumeric(1)
        .noWhiteSpaces(),
    password_confirm: joi.ref('password')
})