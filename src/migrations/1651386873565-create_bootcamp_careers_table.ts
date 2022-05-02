import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createBootcampCareersTable1651386873565 implements MigrationInterface {
    tableName = 'bootcamp_careers'

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
                    name: 'bootcamp_id',
                    type: 'bigint',
                    isNullable: false,
                },
                {
                    name: 'career',
                    type: 'enum',
                    enum: ['Web Development', 'Mobile Development', 'UI/UX', 'Data Science', 'Business', 'Other'],
                    isNullable: false
                },
                {
                    name: 'other_career_name',
                    type: 'varchar',
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
