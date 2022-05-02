import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { User } from 'src/entities/user.entity'

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>
    ) { }

    async createUser(user: User) {
        return await this.userRepository.save(user)
    }

    async findByEmail(email: string) {
        return await this.userRepository.findOne({ email })
    }

    async updateUser(id: number, user: Partial<User>) {
        const [_, updatedUser] = await Promise.all([
            await this.userRepository.update(id, user),
            this.findById(id, ['id', 'name', 'email', 'role_id'], ['role'])
        ]) 

        return updatedUser
    }

    async getUser(conditions: any) {
        return await this.userRepository.findOne({
            where: conditions
        })
    }

    async findById(id: number, select = undefined, relations = undefined) {
        return await this.userRepository.findOne(id, {
            select: select || undefined,
            relations: relations ? relations : undefined
        })
    }
}