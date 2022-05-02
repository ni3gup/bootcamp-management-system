import {Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { BootcampController } from 'src/controllers/v1/bootcamp/bootcamp.controller'
import { BootcampCareer } from 'src/entities/bootcamp-career.entity'
import { Bootcamp } from 'src/entities/bootcamp.entity'
import { BootcampService } from 'src/services/bootcamp.service'

@Module({
    imports: [
        TypeOrmModule.forFeature([
            Bootcamp, 
            BootcampCareer
        ]),
    ],
    providers: [
        BootcampService
    ],
    controllers: [BootcampController]
})
export class BootcampModule {
    
}
