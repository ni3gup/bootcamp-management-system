import { Body, Controller, HttpException, HttpStatus, Post, Req, Version } from '@nestjs/common'
import { Request } from 'express'
import { User } from 'src/entities/user.entity'

import { BootcampService } from 'src/services/bootcamp.service'
import { CreateBootcampValidator } from 'src/validators/bootcamp/create-bootcamp.validator'

@Controller('bootcamp')
export class BootcampController {
    constructor(
        private readonly bootcampService: BootcampService
    ) { }

    @Version('1')
    @Post('/')
    async create(
        @Req() req: Request,
        @Body() requestBody: CreateBootcampValidator
    ) {
        try {
            const user_id = (<User>req.user).id

            const careers = requestBody.careers
            delete requestBody.careers

            // Check for published bootcamp
            const publishedBootcamp = await this.bootcampService.getUserBootcamp(user_id)

            // If the user is not an admin, they can only add one bootcamp
            if (publishedBootcamp && (<User>req.user).role.role !== 'admin') {
                throw new HttpException(`User with id ${user_id} has already published bootcamp`, HttpStatus.BAD_REQUEST)
            }

            const bootcamp = await this.bootcampService.createBootcamp({
                ...requestBody,
                user_id,
            }, careers)

            return {
                success: true,
                data: bootcamp
            }
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}
