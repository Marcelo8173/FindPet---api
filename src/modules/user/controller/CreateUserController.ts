import User from '../model/UserModel';
import { getRepository } from 'typeorm';
import { Request,Response } from 'express';

class UserCreateController{
    
    public async create(request: Request, response: Response ): Promise<Response>{
        
        try {
            const userRepository = getRepository(User)        
        
            const {name, email, password} = request.body;

            //Checking email already exist
            const CheckingEmailalreadyExist = await userRepository.findOne({
                where: {email}
            });

            if(CheckingEmailalreadyExist){
                return response.status(406).json({erro: 'E-mail already registered'});
            };
            //Checking email already exist



            const user = userRepository.create({
                name,
                email,
                password,
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