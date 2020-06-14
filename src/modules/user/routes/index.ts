import { Router, request, response} from 'express';
import UserCreateController from '../controller/CreateUserController';


const routes = Router();
const userCreateController = new UserCreateController();

routes.post('/', userCreateController.create);

export default routes;