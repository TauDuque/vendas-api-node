import { NextFunction, Request, Response } from 'express';
import AppError from '@shared/errors/AppError';
import { verify } from 'jsonwebtoken';
import authConfig from '@config/auth';

interface IToken {
    iat: number;
    exp: number;
    sub: string;
}

export default function checkAuth(
    request: Request,
    response: Response,
    next: NextFunction,
): void {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
        throw new AppError('JWT Token is missing.');
    }

    const [, token] = authHeader.split(' ');

    try {
        const decodedToken = verify(token, authConfig.jwt.secret);
        const { sub } = decodedToken as IToken;

        request.user = {
            id: sub,
        };
        return next();
    } catch {
        throw new AppError('Invalid JWT Token.');
    }
}
