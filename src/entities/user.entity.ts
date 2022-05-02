import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, OneToOne, JoinColumn } from 'typeorm'
import { Role } from './role.entity'

// @TODO - add indexing
@Entity({ name: 'users' })
export class User {
    @PrimaryGeneratedColumn({ type: 'bigint' })
    id?: number

    @Column()
    name: string

    @Column({
        unique: true
    })
    email: string

    @Column()
    password: string

    @Column()
    role_id: number

    @Column()
    reset_password_token?: string

    @Column()
    reset_password_expiry?: string

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    created_at?: Date

    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    public updated_at?: Date

    @DeleteDateColumn({ type: "timestamp", nullable: true })
    public deleted_at?: Date

    @OneToOne(() => Role, { nullable: true })
    @JoinColumn({ name: 'role_id', referencedColumnName: 'id' })
    role?: Role
}