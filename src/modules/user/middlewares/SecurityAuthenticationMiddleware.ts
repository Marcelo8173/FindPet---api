import {Request, Response, NextFunction  } from 'express';
import {verify} from 'jsonwebtoken';
import authConfig from '../../../config/Auth';
import AppError from '../../../err/AppErrors';

interface TokenPayLoad{
    iat: number,
    exp: number,
    sub: string
}

export default function SecurityAuthenticationMiddleware(
    request: Request, response:Response, next:NextFunction){
    
    const authHeader = request.headers.authorization;
    
    if(!authHeader){
       throw new AppError('token is missing')
    }

    const [,token] = authHeader?.split(' ');
    
    try {
        const decoded = verify(token, authConfig.jwt.secret);

        //forçanco o tipo de uma variavel 
        const { sub } = decoded as TokenPayLoad;
        request.user = {
            id: sub,
        };
        
        return next();
    } catch (err) {
        throw new AppError('Invalid token jwt', 401);
    }
};

