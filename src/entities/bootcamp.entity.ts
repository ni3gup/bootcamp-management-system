import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, OneToOne, JoinColumn, OneToMany } from 'typeorm'
import { BootcampCareer } from './bootcamp-career.entity'

import { User } from './user.entity'

@Entity({ name: 'bootcamps' })
export class Bootcamp {
    @PrimaryGeneratedColumn({ type: 'bigint' })
    id?: number

    @Column()
    name: string

    @Column()
    slug: string

    @Column()
    description: string

    @Column()
    website?: string

    @Column()
    mobile: string

    @Column()
    email: string

    @Column({
        length: '500'
    })
    address: string

    @Column({
        enum: ['Point']
    })
    address_type?: string

    @Column({
        type: 'decimal'
    })
    latitude?: number

    @Column({
        type: 'decimal'
    })
    longitude?: number

    @Column({
        length: '500',
    })
    formatted_address?: string

    @Column()
    street?: string

    @Column()
    city?: string

    @Column()
    state?: string

    @Column()
    pincode?: string

    @Column()
    country?: string

    @Column() 
    average_rating: number

    @Column() 
    average_cost: number

    @Column()
    photo?: string

    @Column({
        default: 0
    })
    housing?: boolean

    @Column({
        default: 0
    })
    job_guarantee?: boolean

    @Column({
        default: 0
    })
    accept_gi?: boolean

    @Column()
    user_id: number

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    created_at?: Date

    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    public updated_at?: Date

    @DeleteDateColumn({ type: "timestamp", nullable: true })
    public deleted_at?: Date

    @OneToOne(() => User, { nullable: true })
    @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
    user?: User

    @OneToMany(() => BootcampCareer, bootcampCareer => bootcampCareer.bootcamp_id)
    @JoinColumn({ name: 'bootcamp_id', referencedColumnName: 'id' })
    bootcamp_carrers?: BootcampCareer[]
}