import 'reflect-metadata';

import express, { json, request, response } from 'express';
import routes from './routes/index';
import './database/index';



const app = express();

app.use(json());

app.use(routes);

app.listen(3333, ()=>{
    console.log('Api do findPet online na porta 3333');
})