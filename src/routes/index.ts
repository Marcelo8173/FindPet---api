import { Router, request, response } from 'express';
import UserModel from '../modules/user/routes';

const routes = Router();

routes.use('/users', UserModel);
  

export default routes;