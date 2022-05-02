import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { Bootcamp } from 'src/entities/bootcamp.entity'
import { BootcampCareer } from 'src/entities/bootcamp-career.entity'

@Injectable()
export class BootcampService {
    constructor(
        @InjectRepository(Bootcamp)
        private bootcampRepository: Repository<Bootcamp>,
        @InjectRepository(BootcampCareer)
        private bootcampCareerRepository: Repository<BootcampCareer>,
    ) { }

    async getUserBootcamp(user_id: number) {
        return await this.bootcampRepository.findOne({ user_id })
    }

    async createBootcamp(bootcamp: Partial<Bootcamp>, careers: ['Web Development', 'Mobile Development', 'UI/UX', 'Data Science', 'Business', 'Other']) {
        // const createdBootcamp = await this.bootcampRepository.save(bootcamp)
    }
}