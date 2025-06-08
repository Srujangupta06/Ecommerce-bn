import express, { NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
dotenv.config();
import initializeDB from './src/config/db';
import authRoutes from './src/routes/authRouter';
const app = express();

// PORT
const PORT: number | string = process.env.PORT ?? 5000;

// Middlewares
app.use(express.json());

// Routes

app.use('/api/auth', authRoutes);


app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!');
})

// Initialize DB And Server
const initializeDBAndServer = async (): Promise<void> => {
    try {
        await initializeDB()
        app.listen(PORT, () => {
            console.log(`Server is started listening on PORT: ${PORT}`);
        })
    }
    catch (e) {
        console.log(e);
    }
}
initializeDBAndServer();
