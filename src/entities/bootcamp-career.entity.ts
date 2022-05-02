import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm'

@Entity({ name: 'bootcamp_careers' })
export class BootcampCareer {
    @PrimaryGeneratedColumn({ type: 'bigint' })
    id?: number

    @Column()
    bootcamp_id: number

    @Column({
        enum: ['Web Development', 'Mobile Development', 'UI/UX', 'Data Science', 'Business', 'Other']
    })
    career: string

    @Column()
    other_career_name?: string

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    created_at?: Date

    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    public updated_at?: Date

    @DeleteDateColumn({ type: "timestamp", nullable: true })
    public deleted_at?: Date
}