import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
dotenv.config();
import initializeDB from './src/config/db';
const app = express();

// Declare PORT
const PORT: number | string = process.env.PORT ?? 5000;

app.get('/', (req: Request, res: Response): void => {
    res.send('Welcome To The Ecommerce App!');
})

// Initialize DB And Server
const initializeDBAndServer = async()=>{
    try{
        await initializeDB()
        app.listen(PORT,()=>{
            console.log(`Server is started listening on PORT: ${PORT}`);
        })
    }
    catch(e){
        console.log(e);
    }
}
initializeDBAndServer();
