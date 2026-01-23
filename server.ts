import express from 'express'
import connectDB from './config/db'
import dotenv from 'dotenv'
import logger from 'morgan'
import cors from 'cors'
import cookieSession from 'cookie-session'
import routes from './routes'
import onError from './middleware/errors'

import { migrateReqdoc } from './projects/reqdoc/utils/migration'
import { migrateFalseIdol } from './projects/falseidol/utils/migration'

// migrateReqdoc();
// migrateFalseIdol();

dotenv.config();

const app = express();
const PORT = 4000;

connectDB();

app.use(express.json());
app.use(logger("dev"));

const isDevelopment = process.env.NODE_ENV !== 'production';
const allowedOrigins = process.env.CORS_ORIGIN?.split(',') || (isDevelopment ? ['http://localhost:3000'] : []);

app.use(cors({
    origin: allowedOrigins.length > 0 ? allowedOrigins : true,
    credentials: true
}));

app.use(cookieSession({
    name: 'session',
    keys: [process.env.SECRET!],
    maxAge: 30 * 24 * 60 * 60 * 1000,
    path: '/',
    // For cross-origin requests (localhost:3000 -> localhost:4000), we need 'none'
    // Note: Browsers require secure: true with sameSite: 'none', but for localhost
    // some browsers may accept secure: false. If it doesn't work, use HTTPS or Next.js rewrites.
    sameSite: 'none',
    secure: false, // Set to true in production (requires HTTPS)
    httpOnly: true
}));

app.use((req, res, next) => {
    if (req.session) {
        req.session.nowInMinutes = Math.floor(Date.now() / 60e3);
    }
    next();
});

app.use('/', routes);

app.use((err: any, req: any, res: any, next: any) => {
    console.log(err);
    err.controller = err.ctrl?.name;
    onError(err, req, res, next);
});

app.listen(PORT, () => console.log('Server running on ' + PORT));

export default app;