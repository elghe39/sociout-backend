import { verifyToken } from "../utils/jwt.js"

export async function authorize(req, res, next) {
    try{
        let jwt = req.headers.authorization

        if (!jwt) {
            return res.status(401).json({ message: 'Invalid token' })
        }

        const token = jwt.replace('Bearer ','')

        const decodedToken = verifyToken(token)

        req.body.userId = decodedToken.id
        next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).send({ message: 'Expired token' })
        }

        res.status(500).send({ message: 'Failed to authenticate user' })
    }   
}