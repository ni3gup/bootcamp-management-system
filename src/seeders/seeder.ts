import { Controller, Get } from '@nestjs/common'
import { Bootcamp } from 'src/entities/bootcamp.entity'
import { Role } from 'src/entities/role.entity'

import { SeederService } from 'src/services/seeder.service'

@Controller('seeders')
export class Seeder {
    constructor(
        private readonly seederService: SeederService
    ) { }

    @Get('/import/roles')
    async importRoles() {
        await this.seederService.removeRoles()

        const data: Role[] = [
            {
                role: 'user',
            },
            {
                role: 'publisher',
            },
            {
                role: 'admin',
            }
        ]

        await this.seederService.createRoles(data)

        return 'Roles imported'
    }
}
