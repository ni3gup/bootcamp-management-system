import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { Role } from 'src/entities/role.entity'

@Injectable()
export class RoleService {
    constructor(
        @InjectRepository(Role)
        private roleRepository: Repository<Role>
    ) { }

    createMany(roles: Role[]) {
        return this.roleRepository.save(roles)
    }

    findOne(id: number) {
        return this.roleRepository.findOne(id)
    }
}