import User from '../model/UserModel';
import { getRepository } from 'typeorm';
import { Request,Response } from 'express';
import HashProvider from '../providers/HashProvider/implementations/BCryptHashProvider';

class UserCreateController{

    public async create(request: Request, response: Response ): Promise<Response>{
        
        try {
            const ormRepository = getRepository(User);

            const hashProvider = new HashProvider();       
        
            const {name, email, password} = request.body;

            //Checking email already exist
            const CheckingEmailalreadyExist = await ormRepository.findOne({
                where: {email}
            });

            if(CheckingEmailalreadyExist){
                return response.status(406).json({erro: 'E-mail already registered'});
            };
            //Checking email already exist

            //passwor hash
            const hashPasswor = await hashProvider.generateHash(password);
            //passwor hash


            const user = ormRepository.create({
                name,
                email,
                password: hashPasswor,
                status: true,
            })
        
            await ormRepository.save(user);
            
            delete user.password;

            return response.json(user);

        } catch (error) {
            return response.status(400).json({error: error.message})
        }
        
    };

    // public async update(request: Request, response: Response): Promise<Response>{

    // }
    public async delete(request:Request, response:Response): Promise<Response>{
        try {
            const ormRepository = getRepository(User);

            const hashProvider = new HashProvider();       

            const id = request.params.idUser;
            const { password } = request.body; 

            //if user exist 
            const userExistId = await ormRepository.findOne({
                where:{id}
            });

            if(!userExistId){
                return response.status(402).json({erro: 'User not exist'});
            };
            //if user exist 

            //if password is the same of database
           const userComparePassword = await hashProvider.compareHash(password, userExistId.password);
                       
            if(!userComparePassword){
               return response.status(402).json({erro: 'Invalid password'})
           };
            //if password is the same of database

           await ormRepository.delete(userExistId.id);

           return response.json({msg: 'User delete with Sucess'})
        } catch (error) {
            return response.json(error)
        }
    };
}

export default UserCreateController;