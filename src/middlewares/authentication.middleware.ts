import { HttpException, HttpStatus, Injectable, NestMiddleware } from "@nestjs/common"
import { JwtService } from "@nestjs/jwt";
import { Request, Response, NextFunction } from 'express'

import { User } from "src/entities/user.entity";
import { UserService } from "src/services/user.service";
import { Connection, getRepository, Repository } from "typeorm";

@Injectable()
export class AuthenticationMiddleware implements NestMiddleware {
    constructor() { }

    async use(req: Request, res: Response, next: NextFunction) {
        let token = ''

        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }

        if (!token) {
            return res.status(401).send({
                statusCode: 401,
                message: 'Not authorized to access this route'
            })
        }

        // verify token
        try {
            const jwt = new JwtService({
                secret: process.env.JWT_SECRET
            })

            const decoded = jwt.verify(token)

            const user = await getRepository(User).findOne({
                where: {
                    id: decoded.id
                }
            })

            if (!user) {
                return res.status(401).send({
                    statusCode: 401,
                    message: 'Not authorized to access this route'
                })
            }

            req.user = user

            next()
        } catch (error) {
            console.log(error)

            return res.status(500).send({
                statusCode: 500,
                message: error.message
            })
        }
    }
}