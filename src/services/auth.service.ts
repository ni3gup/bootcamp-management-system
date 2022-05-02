import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt'
import * as crypto from 'crypto'
import * as moment from 'moment'

import { User } from 'src/entities/user.entity'

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService
    ) { }

    async generatePassword(password: string) {
        const salt = await bcrypt.genSalt()
        password = await bcrypt.hash(password, salt)

        return password
    }

    async comparePassword(password: string, hash: string) {
        return await bcrypt.compare(password, hash)
    }

    async generateToken(user: User) {
        const payload = {
            id: user.id
        }

        return this.jwtService.sign(payload, {
            secret: process.env.JWT_SECRET,
            // expiresIn: process.env.JWT_EXPIRES_IN
        })
    }

    async getResetPasswordToken() {
        const resetToken = crypto.randomBytes(20).toString('hex')

        return {
            resetToken,
            resetPasswordToken: crypto.createHash('sha256').update(resetToken).digest('hex'),
            resetPasswordExpire: moment().add(10, 'minutes').format('YYYY-MM-DD HH:mm:ss') 
        }
    }

    async getHashedToken(resetToken: string) {
        return crypto.createHash('sha256').update(resetToken).digest('hex')
    }

    verifyToken(token: string) {
        return this.jwtService.verify(token)
    }
}