import express from 'express';
import bodyParser from "body-parser";
import {AppDataSource} from "./src/data-source";
import fileUpload from "express-fileupload"
import {router} from './src/router/router'
import cors from 'cors'
const app = express();
AppDataSource.initialize().then(()=> {
    console.log('Connect database success! SQL')
})
app.use(fileUpload({
    createParentPath: true
}));
app.use(bodyParser.json());
app.use(cors())
app.use('',router)
app.listen(8080, () => {
    console.log('sever is running')
})