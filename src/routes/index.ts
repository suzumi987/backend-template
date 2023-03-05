import { Router, Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken'

import Signin from './signin.route'

const router = Router();

const AuthenToken = (req: Request, res: Response, next: NextFunction) => {
    const header: { token: string } = req.headers as { token: string }
    if (header.token === '')
        return res.status(400)
            .json({
                data: 'require token',
                code: 400000,
                devMessage: 'Bad Request'
            })

    jwt.verify(header.token, 'JWT_SECRET_KEY', (err: any, decoded: any) => {
        if (err) {
            return res.status(401)
                .json({
                    data: null,
                    code: 401000,
                    devMessage: 'Unauthorized'
                })
        }
        next();
    });
};

router.use('/auth/sign-in', Signin)

// Aurthen token
// router.use('/simple2', AuthenToken, InternalGame)

export default router;
