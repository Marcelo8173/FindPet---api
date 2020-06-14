import User from '../model/UserModel';
import { getRepository } from 'typeorm';
import { Request,Response, urlencoded } from 'express';
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

    public async update(request: Request, response: Response): Promise<Response>{
        const id = request.user.id;
        const { name, email, old_password, password} = request.body;
        
        const ormRepository = getRepository(User);
        const hashProvider = new HashProvider();

        //find user
        const user = await ormRepository.findOne({
            where: {id}
        });

        if(!user){
            return response.json({erro: 'User not found'});
        };
        //find user

        //find email in database, if user change email alredy exist
        const userEmailCheck = await ormRepository.findOne({
            where:{email}
        });

        if(userEmailCheck && userEmailCheck.id !== user.id){
            return response.json({error: 'E-mail already in use'});
        }
        //find email in database, if user change email alredy exist
        user.name = name;
        user.email = email;

        //if user try change password without inform old_passwor
        if(password && !old_password){
            return response.json({erro:'you need to inform the old password to set a new password'});
        };
        //if user try change password without inform old_passwor
        
        if(password){
            const ckeckPassword = await hashProvider.compareHash(old_password,user.password);
            
            if(!ckeckPassword){
                return response.json({error: 'oldPassword does not match'})
            }

            user.password = await hashProvider.generateHash(password);
        }

        await ormRepository.save(user);
        
        delete user.password;
        return response.json(user)
    }

    public async delete(request:Request, response:Response): Promise<Response>{
        try {
            const ormRepository = getRepository(User);

            const hashProvider = new HashProvider();       

            const id = request.user.id;
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