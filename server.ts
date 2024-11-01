import express from 'express'
import connectDB from './config/db'
import dotenv from 'dotenv'
import logger from 'morgan'
import cors from 'cors'
import routes from './routes'
import onError from './middleware/errors'

dotenv.config();

const app = express();
const PORT = 4000;

connectDB()

app.use(express.json());
app.use(logger("dev"));
app.use(cors());

app.use('/', routes);

// error handler middleware.. catches all errors thrown
app.use((err: any, req: any, res: any, next: any) => {
    console.log(err);
    err.controller = err.ctrl?.name;
    onError(err, req, res, next);
});

app.listen(PORT, () => console.log('Server running on ' + PORT));

export default app;