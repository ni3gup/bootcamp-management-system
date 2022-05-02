import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createBootcampsTable1651385369453 implements MigrationInterface {
    tableName = 'bootcamps'

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
                    name: 'slug',
                    type: 'varchar',
                    isNullable: false,
                },
                {
                    name: 'description',
                    type: 'text',
                    isNullable: false,
                },
                {
                    name: 'website',
                    type: 'varchar',
                    isNullable: true,
                },
                {
                    name: 'mobile',
                    type: 'varchar',
                    isNullable: false
                },
                {
                    name: 'email',
                    type: 'varchar',
                    isNullable: false
                },
                {
                    name: 'address',
                    type: 'varchar',
                    length: '500',
                    isNullable: false
                },
                {
                    name: 'address_type',
                    type: 'enum',
                    enum: ['Point'],
                    isNullable: true
                },
                {
                    name: 'latitude',
                    type: 'decimal',
                    length: '10,2',
                    isNullable: true,
                },
                {
                    name: 'longitude',
                    type: 'decimal',
                    length: '10,2',
                    isNullable: true,
                },
                {
                    name: 'formatted_address',
                    type: 'varchar',
                    length: '500',
                    isNullable: true
                },
                {
                    name: 'street',
                    type: 'varchar',
                    isNullable: true
                },
                {
                    name: 'city',
                    type: 'varchar',
                    isNullable: true
                },
                {
                    name: 'state',
                    type: 'varchar',
                    isNullable: true
                },
                {
                    name: 'pincode',
                    type: 'varchar',
                    isNullable: true
                },
                {
                    name: 'country',
                    type: 'varchar',
                    isNullable: true
                },
                {
                    name: 'average_rating',
                    type: 'int',
                    isNullable: false,
                },
                {
                    name: 'average_cost',
                    type: 'int',
                    isNullable: false,
                },
                {
                    name: 'photo',
                    type: 'varchar',
                    isNullable: true
                },
                {
                    name: 'housing',
                    type: 'tinyint',
                    default: 0
                },
                {
                    name: 'job_guarantee',
                    type: 'tinyint',
                    default: 0
                },
                {
                    name: 'accept_gi',
                    type: 'tinyint',
                    default: 0
                },
                {
                    name: 'user_id',
                    type: 'bigint',
                    isNullable: false,
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
