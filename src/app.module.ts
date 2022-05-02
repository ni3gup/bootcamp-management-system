import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigModule } from '@nestjs/config'

import { Role } from './entities/role.entity'
import { User } from './entities/user.entity'
import { AuthModule } from './modules/auth.module'
import { AppController } from './app.controller'
import { SeederModule } from './modules/seeder.module'
import { AuthenticationMiddleware } from './middlewares/authentication.middleware'
import { BootcampController } from './controllers/v1/bootcamp/bootcamp.controller'
import { BootcampModule } from './modules/bootcamp.module'
import { Bootcamp } from './entities/bootcamp.entity'
import { BootcampCareer } from './entities/bootcamp-career.entity'

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['./.env.local', './.env.staging', './.env.production']
    }),
    TypeOrmModule.forRoot({
      type: process.env.DB_CONNECTION as any || 'mysql',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT, 10) || 3306,
      database: process.env.DB_NAME || 'bootcampmanagementsystem',
      username: process.env.DB_USERNAME || 'root',
      password: process.env.DB_PASSWORD || '',
      entities: [Role, User, Bootcamp, BootcampCareer],
      synchronize: false
    }),
    AuthModule,
    SeederModule,
    BootcampModule
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthenticationMiddleware)
      .forRoutes(
        { path: "/api/v1/auth/profile", method: RequestMethod.POST },
        { path: '/api/v1/auth/updateDetails', method: RequestMethod.PUT },
        { path: '/api/v1/auth/updatepassword', method: RequestMethod.PUT },
        { path: '/api/v1/bootcamp', method: RequestMethod.POST },
      )
  }
}
