import { TypeOrmModuleOptions } from "@nestjs/typeorm"

import { Role } from "src/entities/role.entity"
import { User } from "src/entities/user.entity"

export const config: TypeOrmModuleOptions = {
    type: process.env.DB_CONNECTION as any || 'mysql',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT, 10) || 3306,
    username: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'bootcampmanagementsystem',
    entities: [User, Role], // maybe you should also consider chage it to something like:  [__dirname + '/**/*.entity.ts', __dirname + '/src/**/*.entity.js']
    migrations: ['src/migrations/*{.ts,.js}'],
    cli: {
        migrationsDir: 'src/migrations'
    },
    synchronize: true,
}