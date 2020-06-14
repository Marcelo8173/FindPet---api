import 'reflect-metadata';

import express, { json } from 'express';
import './database/index';
import uploadConfig from './config/uploadConfig';
import routes from './routes/index';



const app = express();

app.use(json());

app.use('/files', express.static(uploadConfig.directory));
app.use(routes);

app.listen(3333, ()=>{
    console.log('Api do findPet online na porta 3333');
})