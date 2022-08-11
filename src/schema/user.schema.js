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

export const changePasswordSchema = joi.object({
    old_password: joiPassword.string()
        .min(8)
        .required()
        .minOfLowercase(1)
        .minOfUppercase(1)
        .minOfNumeric(1)
        .noWhiteSpaces(),
    password: joiPassword.string()
        .min(8)
        .required()
        .minOfLowercase(1)
        .minOfUppercase(1)
        .minOfNumeric(1)
        .noWhiteSpaces(),
    password_confirm: joi.ref('password')
})

export const changeAvatarSchema = joi.object({
    avatar: joi.string()
        .required()
})

export const changeProfileSchema = joi.object({
    firstName: joi.string(),
    lastName: joi.string(),
    gender: joi.string(),
    dayOfBirth: joi.date()
})

export const forgetPasswordSchema = joi.object({
    email: joi.string()
        .min(3)
        .required()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
})

export const resetPasswordSchema = joi.object({
    email: joi.string()
        .min(3)
        .required()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    resetCode: joi.string()
        .required()
        .min(6)
        .max(6),
    password: joiPassword.string()
        .min(8)
        .required()
        .minOfLowercase(1)
        .minOfUppercase(1)
        .minOfNumeric(1)
        .noWhiteSpaces(),
    password_confirm: joi.ref('password')
})