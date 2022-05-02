import { Body, Controller, HttpException, HttpStatus, Param, Post, Put, Req, Version } from '@nestjs/common'
import * as moment from 'moment'
import { Request } from 'express'

import { User } from 'src/entities/user.entity'
import { AuthService } from 'src/services/auth.service'
import { RoleService } from 'src/services/role.service'
import { UserService } from 'src/services/user.service'
import { ForgotPasswordValidator } from 'src/validators/user/forgot-password.validator'
import { LoginValidator } from 'src/validators/user/login.validator'
import { RegisterUserValidator } from 'src/validators/user/register-user.validator'
import { MoreThan } from 'typeorm'
import { ResetPasswordValidator } from 'src/validators/user/reset-password.validator'
import { UpdateProfileValidator } from 'src/validators/user/update-profile.validator copy'
import { UpdatePasswordValidator } from 'src/validators/user/update-password.validator'

@Controller('auth')
export class AuthController {
    constructor(
        private readonly userService: UserService,
        private readonly roleService: RoleService,
        private readonly authService: AuthService
    ) {}

    @Version('1')
    @Post('/register')
    async register(
        @Body() requestBody: RegisterUserValidator
    ) {
        try {
            const password = await this.authService.generatePassword(requestBody.password)
    
            const role = await this.roleService.findOne(requestBody.role_id)
    
            if (!role) {
                throw new HttpException('Invalid Role', HttpStatus.UNPROCESSABLE_ENTITY)
            }
    
            const user: User = {
                name: requestBody.name,
                email: requestBody.email,
                role_id: role.id,
                password
            }
    
            await this.userService.createUser(user)
    
            return {
                success: true,
                message: 'User Created Successfully'
            }
        } catch (error) {
            if (error.code === 'ER_DUP_ENTRY') {
                throw new HttpException('Email already exists', HttpStatus.UNPROCESSABLE_ENTITY)
            }

            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    @Version('1')
    @Post('/login')
    async login(
        @Body() requestBody: LoginValidator
    ) {
        try {
            // Check for user
            const user = await this.userService.findByEmail(requestBody.email)

            if (!user) {
                throw new HttpException('Invalid Credentials', HttpStatus.UNPROCESSABLE_ENTITY)
            }

            // Check if password matches
            const isMatch = await this.authService.comparePassword(requestBody.password, user.password)

            if (!isMatch) {
                throw new HttpException('Invalid Credentials', HttpStatus.UNPROCESSABLE_ENTITY)
            }

            // Generate token
            const token = await this.authService.generateToken(user)

            return {
                success: true,
                message: 'User Created Successfully',
                token,
                expiresIn: moment().add(process.env.JWT_EXPIRES_IN, 'seconds').format('YYYY-MM-DD HH:mm:ss')
            }
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    @Version('1')
    @Put('/resetpassword/:reset_token')
    async resetPassword(
        @Param('reset_token') reset_token: string,
        @Body() requestBody: ResetPasswordValidator,
    ) {
        try {
            // Get hashed token
            const resetPasswordToken = await this.authService.getHashedToken(reset_token)
    
            const user = await this.userService.getUser({
                reset_password_token: resetPasswordToken,
                reset_password_expiry: MoreThan(moment().format('YYYY-MM-DD HH:mm:ss'))
            })
    
            if (!user) {
                throw new HttpException('Invalid reset token', HttpStatus.UNPROCESSABLE_ENTITY)
            }
    
            // Set new password
            const password = await this.authService.generatePassword(requestBody.password)

            await this.userService.updateUser(user.id, {
                password,
                reset_password_token: null,
                reset_password_expiry: null
            })

            return {
                success: true,
                message: 'Password reset successfull'
            }
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    @Version('1')
    @Post('/forgotpassword')
    async forgotPassword(
        @Body() requestBody: ForgotPasswordValidator,
        @Req() req: Request
    ) {
        try {
            const user = await this.userService.findByEmail(requestBody.email)

            if (!user) {
                throw new HttpException('User Not Found', HttpStatus.UNPROCESSABLE_ENTITY)
            }

            // Get Reset Token
            const { resetToken, resetPasswordToken, resetPasswordExpire } = await this.authService.getResetPasswordToken()

            await this.userService.updateUser(user.id, {
                reset_password_token: resetPasswordToken,
                reset_password_expiry: resetPasswordExpire
            })

            // Create reset url
            const resetUrl = `${req.protocol}://${req.get('host')}/api/v1/auth/resetpassword/${resetToken}`

            const message = `You are receiving this email because you (or someone else) has requested the reset of a password. Please make a PUT request to: \n\n ${resetUrl}`;

            // @TODO - send email
            return {
                success: true,
                resetToken,
                message: 'Email Sent'
            }
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    @Version('1')
    @Post('/profile')
    async profile(
        @Req() req: Request
    ) {
        try {
            const user = await this.userService.findById((<User>req.user).id, ['id', 'name', 'email', 'role_id'], ['role'])

            if (!user) {
                throw new HttpException('User Not Found', HttpStatus.UNPROCESSABLE_ENTITY)
            }

            return {
                success: true, 
                data: user
            }
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    @Version('1')
    @Put('/updatedetails')
    async updateDetails(
        @Req() req: Request,
        @Body() requestBody: UpdateProfileValidator,
    ) {
        try {
            const user = await this.userService.updateUser((<User>req.user).id, requestBody)
    
            return {
                success: true, 
                data: user
            }
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    @Version('1')
    @Put('/updatepassword')
    async updatePassword(
        @Req() req: Request,
        @Body() requestBody: UpdatePasswordValidator,
    ) {
        try {
            const user = await this.userService.findById((<User>req.user).id, ['password'])

            // Check current password
            if (!(await this.authService.comparePassword(requestBody.current_password, user.password))) {
                throw new HttpException('Current Password is incorrect', HttpStatus.INTERNAL_SERVER_ERROR)
            }

            const password = await this.authService.generatePassword(requestBody.new_password)

            await this.userService.updateUser((<User>req.user).id, {
                password
            })

            return {
                success: true,
                message: 'Password updated successfully'
            }
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}
