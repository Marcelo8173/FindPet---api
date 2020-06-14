import { Router, request, response} from 'express';
import UserController from '../controller/UserController';
import AuthenticationController from '../controller/AuthenticationController';
import SecurityAuthenticationMiddleware from '../middlewares/SecurityAuthenticationMiddleware';
import UserAvatarController from '../controller/userAvatarController';
import uploadconfig from '../../../config/uploadConfig';
import multer from 'multer';

const routes = Router();
const upload = multer(uploadconfig);

const userController = new UserController();
const authenticationController = new AuthenticationController();
const userAvatarController = new UserAvatarController();


routes.post('/create', userController.create);
routes.post('/sessions', authenticationController.create);

routes.use(SecurityAuthenticationMiddleware);
routes.put('/update', userController.update);
routes.delete('/delete', userController.delete);
routes.patch('/avatar', upload.single('avatar'), userAvatarController.update)


export default routes;