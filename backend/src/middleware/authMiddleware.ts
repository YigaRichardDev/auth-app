import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';

// Extend the Request interface to include 'user'
interface AuthenticatedRequest extends Request {
    user?: string; // or whatever type the `id` is
}

const authMiddleware = (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
    const token = req.header('Authorization')?.replace('Bearer', '').trim();
    if (!token) {
        res.status(401).json({ msg: 'Authorization denied, no token' });
        return;
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as jwt.JwtPayload;
        req.user = decoded.id;
        next();
    } catch (error) {
        res.status(401).json({ msg: 'Token is not valid' });
    }
};

export default authMiddleware;
