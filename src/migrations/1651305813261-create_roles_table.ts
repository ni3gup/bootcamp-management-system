import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class createRolesTable1651305813261 implements MigrationInterface {
    tableName = 'roles'

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
                    name: 'role',
                    type: 'enum',
                    enum: ['user', 'publisher', 'admin'],
                    default: '"user"'
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
