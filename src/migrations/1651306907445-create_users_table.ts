import {MigrationInterface, QueryRunner, Table} from "typeorm"

export class createUsersTable1651306907445 implements MigrationInterface {
    tableName = 'users'

    public async up(queryRunner: QueryRunner): Promise<void> {
        // create table
        await queryRunner.createTable(new Table({
            name: this.tableName,
            columns: [
                {
                    name: 'id',
                    type: 'bigint',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
                },
                {
                    name: 'name',
                    type: 'varchar',
                    isNullable: false,
                },
                {
                    name: 'email',
                    type: 'varchar',
                    isNullable: false,
                    isUnique: true
                },
                {
                    name: 'role_id',
                    type: 'bigint',
                    isNullable: false,
                },
                {
                    name: 'password',
                    type: 'varchar',
                    isNullable: false,
                },
                {
                    name: 'reset_password_token',
                    type: 'varchar',
                    isNullable: true,
                },
                {
                    name: 'reset_password_expiry',
                    type: 'timestamp',
                    isNullable: true
                },
                {
                    name: 'created_at',
                    type: 'timestamp',
                    default: 'CURRENT_TIMESTAMP(6)',
                },
                {
                    name: 'updated_at',
                    type: 'timestamp',
                    default: 'CURRENT_TIMESTAMP(6)',
                    onUpdate: 'CURRENT_TIMESTAMP(6)',
                },
                {
                    name: 'deleted_at',
                    type: 'timestamp',
                    isNullable: true,
                }
            ]
        }), true, false, true)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable(this.tableName)
    }

}
