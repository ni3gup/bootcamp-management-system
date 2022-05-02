import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import slugify from 'slugify'

import { Bootcamp } from 'src/entities/bootcamp.entity'
import { BootcampCareer } from 'src/entities/bootcamp-career.entity'
import { GeocoderService } from './geocoder.service'

@Injectable()
export class BootcampService {
    constructor(
        @InjectRepository(Bootcamp)
        private bootcampRepository: Repository<Bootcamp>,
        @InjectRepository(BootcampCareer)
        private bootcampCareerRepository: Repository<BootcampCareer>,
        private readonly geocoderService: GeocoderService
    ) { }

    async getUserBootcamp(user_id: number) {
        return await this.bootcampRepository.findOne({ user_id })
    }

    async createBootcamp(bootcamp: Partial<Bootcamp & BootcampCareer>, careers: ['Web Development', 'Mobile Development', 'UI/UX', 'Data Science', 'Business', 'Other']) {
        const slug = slugify(bootcamp.name, { lower: true })

        const location = await this.geocoderService.getLocation(bootcamp.address)

        const createdBootcamp = await this.bootcampRepository.save({
            ...bootcamp,
            ...location,
            slug
        })

        const careersData: BootcampCareer[] = careers.map(career => {
            if (career === 'Other') {
                return {
                    bootcamp_id: createdBootcamp.id,
                    career,
                    other_career_name: bootcamp.other_career_name
                }
            } else {
                return {
                    bootcamp_id: createdBootcamp.id,
                    career
                }
            }
        })

        const createdCareers = await this.bootcampCareerRepository.save(careersData)

        return { ...createdBootcamp, careers: createdCareers }
    }
}