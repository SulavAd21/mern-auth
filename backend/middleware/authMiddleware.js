import jwt from 'jsonwebtoken';
import { getUserById } from '../models/users/userModel.js';

const protect = async (req, res, next) => {
    let token;
    token = req.cookies.jwt;

    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await getUserById(decoded.userId).select('-password')
            next()

        } catch (error) {
            res.status(401).json("Not authorized, invalid token")
        }

    } else {
        res.status(401).json("Not authorized, no token")
    }
}

export {protect}