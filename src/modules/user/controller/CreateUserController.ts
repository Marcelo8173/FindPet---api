import User from '../model/UserModel';
import { getRepository } from 'typeorm';
import { Request,Response } from 'express';
import HashProvider from '../providers/HashProvider/implementations/BCryptHashProvider';

class UserCreateController{
    
    public async create(request: Request, response: Response ): Promise<Response>{
        
        try {
            const userRepository = getRepository(User) 
            const hashProvider = new HashProvider();       
        
            const {name, email, password} = request.body;

            //Checking email already exist
            const CheckingEmailalreadyExist = await userRepository.findOne({
                where: {email}
            });

            if(CheckingEmailalreadyExist){
                return response.status(406).json({erro: 'E-mail already registered'});
            };
            //Checking email already exist

            //passwor hash
            const hashPasswor = await hashProvider.generateHash(password);
            //passwor hash


            const user = userRepository.create({
                name,
                email,
                password: hashPasswor,
                status: true,
            })
        
            await userRepository.save(user);

            return response.json(user);

        } catch (error) {
            return response.status(400).json({error: error.message})
        }
        
    };

    
}

export default UserCreateController;