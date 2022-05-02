import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { Role } from 'src/entities/role.entity'
import { Seeder } from 'src/seeders/seeder'
import { SeederService } from 'src/services/seeder.service'

@Module({
    imports: [
        TypeOrmModule.forFeature([
            Role
        ])
    ],
    providers: [
        SeederService
    ],
    controllers: [Seeder]
})
export class SeederModule {}
