import { Router, request, response} from 'express';
import UserController from '../controller/UserController';
import AuthenticationController from '../controller/AuthenticationController';

const routes = Router();
const userController = new UserController();
const authenticationController = new AuthenticationController();


routes.post('/create', userController.create);
routes.post('/sessions', authenticationController.create);

routes.delete('/delete/:idUser', userController.delete);

export default routes;