import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { TypeOrmModule } from '@nestjs/typeorm'

import { AuthController } from 'src/controllers/v1/auth/auth.controller'
import { Role } from 'src/entities/role.entity'
import { User } from 'src/entities/user.entity'
import { AuthenticationMiddleware } from 'src/middlewares/authentication.middleware'
import { AuthService } from 'src/services/auth.service'
import { RoleService } from 'src/services/role.service'
import { UserService } from 'src/services/user.service'

@Module({
    imports: [
        TypeOrmModule.forFeature([
            User, 
            Role
        ]),
        JwtModule.register({
            secret: process.env.JWT_SECRET || 'secret',
            signOptions: {
                // expiresIn: process.env.JWT_EXPIRES_IN || 7200
            }
        })
    ],
    providers: [
        UserService,
        RoleService,
        AuthService
    ],
    controllers: [AuthController]
})
export class AuthModule {
    
}
