import {Request, Response } from 'express';
import User from '../model/UserModel';
import StorageProvider from '../providers/storeProvider/implementations/DiksStorageProvider'
import { getRepository } from 'typeorm';


class userAvatarController{
    public async update(request: Request, response: Response): Promise<Response>{
        const id = request.user.id;
        const file = request.file.filename;
        const ormRepository = getRepository(User);
        const storageProvider = new StorageProvider();
        
    
        const user = await ormRepository.findOne({
            where: {id}
        });

        if(!user){
            return response.json({erro:'user not authenticated, only users authenticated can update avatar'});
        };

        if(user.avatar){
            //deletar um avatar anterior
             await storageProvider.deleteFile(user.avatar);
        };
 
        const fileName = await storageProvider.saveFile(file);
 
        user.avatar = fileName;
        await ormRepository.save(user);
 
        return response.json(user);  
    }
}

export default userAvatarController;