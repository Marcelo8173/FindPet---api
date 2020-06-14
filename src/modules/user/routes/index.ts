import { Router, request, response} from 'express';
import UserController from '../controller/UserController';
import AuthenticationController from '../controller/AuthenticationController';
import SecurityAuthenticationMiddleware from '../middlewares/SecurityAuthenticationMiddleware';

const routes = Router();
const userController = new UserController();
const authenticationController = new AuthenticationController();


routes.post('/create', userController.create);
routes.post('/sessions', authenticationController.create);

routes.delete('/delete/:idUser', SecurityAuthenticationMiddleware, userController.delete);

export default routes;