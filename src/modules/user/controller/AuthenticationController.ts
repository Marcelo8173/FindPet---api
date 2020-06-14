import { Request, Response } from 'express';
import { sign } from 'jsonwebtoken';
import AuthConfig from '../../../config/Auth';
import User from '../model/UserModel';
import { getRepository } from 'typeorm'; 
import HashProvider from '../providers/HashProvider/implementations/BCryptHashProvider';

class AuthenticationController{
    
    public async create(request:Request, response:Response): Promise<Response>{
        const { email, password } = request.body;
        const ormRepository = getRepository(User);
        const hashProvider = new HashProvider();

        // find user
        const user = await ormRepository.findOne({
            where: {email}
        });

        if(!user){
            return response.status(401).json({erro: 'Incorrect email/password combination'});
        };
        // find user

        //check the password
        const userPassword = await hashProvider.compareHash(password, user.password);

        if(!userPassword){
            return response.status(401).json({erro: 'Incorrect email/password combination'});
        }
        //check the password

        //generated token
        const token = sign({},AuthConfig.jwt.secret,{
            subject: user.id,
            expiresIn: AuthConfig.jwt.expiresIn
        });

        delete user.password;

        return response.json({
            user,
            token
        });
    };
}

export default AuthenticationController;