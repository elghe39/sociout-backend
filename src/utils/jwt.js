import jwt from 'jsonwebtoken'
import * as fs from 'fs'
import * as path from 'path'
import {fileURLToPath} from 'url'
import 'dotenv/config'

const passphrase = process.env.PASSPHRASE

export function generateToken(payload) {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename)

    const privateKey = {
        key: fs.readFileSync(path.join(__dirname, './../../private.key')),
        passphrase: passphrase
    } 

    const signInOptions = {
        algorithm: 'RS256',
        expiresIn: '12h'
    }

    return jwt.sign(payload, privateKey, signInOptions)
}

export function verifyToken(token) {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename)

    const publicKey = fs.readFileSync(path.join(__dirname, './../../public.key'))

    const verifyOptions = {
        algorithms: ['RS256'],
    }

    return jwt.verify(token, publicKey, verifyOptions, (err, decoded) => { 
        if (err) {
            return err
        }

        return decoded
    })
}