import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm'

@Entity({ name: 'roles' })
export class Role {
    @PrimaryGeneratedColumn({ type: 'bigint' })
    id?: number

    @Column({
        enum: ['user', 'publisher', 'admin'],
        default: 'user',
    })
    role: string

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    created_at?: Date

    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    public updated_at?: Date

    @DeleteDateColumn({ type: "timestamp", nullable: true })
    public deleted_at?: Date
}