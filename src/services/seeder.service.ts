import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { Role } from 'src/entities/role.entity'

@Injectable()
export class SeederService {
    constructor(
        @InjectRepository(Role)
        private roleRepository: Repository<Role>
    ) { }

    createRoles(roles: Role[]) {
        return this.roleRepository.save(roles)
    }

    removeRoles() {
        return this.roleRepository.clear()
    }
}