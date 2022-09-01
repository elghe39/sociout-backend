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
    password: joiPassword.string()
        .min(8)
        .required()
        .minOfLowercase(1)
        .minOfUppercase(1)
        .minOfNumeric(1)
        .noWhiteSpaces(),
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
        .required(),
    password: joiPassword.string()
        .min(8)
        .required()
        .minOfLowercase(1)
        .minOfUppercase(1)
        .minOfNumeric(1)
        .noWhiteSpaces()
})