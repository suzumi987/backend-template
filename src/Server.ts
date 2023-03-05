import cors from 'cors'
import path from 'path';
import helmet from 'helmet';
import morgan from 'morgan';
// @ts-ignore
import expressAutosanitizer from 'express-autosanitizer'
import logger from 'loglevel';
import BaseRouter from './routes';
import cookieParser from 'cookie-parser';
import 'express-async-errors';
import express, { Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser'
import { BAD_REQUEST, NOT_FOUND } from 'http-status-codes';
const app = express();
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.text())
app.use(cors())
app.use(express.json({ limit: '10MB' }));
app.use(express.urlencoded({ extended: true, limit: '10MB' }));
app.use(cookieParser());

morgan.token('time', (req: any, res: any) => {
    const now = new Date()
    now.setHours(now.getHours() + 7)
    return `\x1b[35m@${now.toISOString()}\x1b[0m`
})
morgan.token('code', (req: any, res: any) => {
    const status = res.statusCode
    const color = status >= 500 ? 31 // red
        : status >= 400 ? 33 // yellow
            : status >= 300 ? 36 // cyan
                : status >= 200 ? 32 // green
                    : 0 // no color

    return req.method.length === 3 ? ` \x1b[${color}m${status}\x1b[0m` : `\x1b[${color}m${status}\x1b[0m`
})

morgan.token('methods', (req: any, res: any) => {
    const methods = req.method
    const color = methods === 'DELETE' ? 'DEL ' : methods
    return `${color}`
})
app.use(morgan((tokens, req, res) => {
    return [
        tokens.time(req, res),
        tokens.methods(req, res),
        tokens.code(req, res),
        tokens.url(req, res),
        tokens['response-time'](req, res) + ' ms',
    ].join(' ');
}))
if (process.env.NODE_ENV === 'production') {
    app.use(helmet());
}

app.use(expressAutosanitizer.all);
app.use('/api/v1', BaseRouter);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    logger.error(err.message, err);
    return res.status(BAD_REQUEST).json({
        error: err.message,
    });
});

const staticDir = path.join(__dirname, 'public');

app.use(express.static(staticDir));
app.get('*', (req: Request, res: Response) => {
    res.status(404).json({ devMessage: 'data not found'})
});

export default app;
