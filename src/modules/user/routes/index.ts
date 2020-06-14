import { Router, request, response} from 'express';
import UserController from '../controller/UserController';


const routes = Router();
const userController = new UserController();

routes.post('/create', userController.create);
routes.delete('/delete/:idUser', userController.delete);

export default routes;