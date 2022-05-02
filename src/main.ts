import { VersioningType, ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'

import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  const PORT = process.env.PORT || 3000

  app.enableVersioning({
    type: VersioningType.URI,
    prefix: 'api/v'
  })

  app.useGlobalPipes(new ValidationPipe())

  await app.listen(PORT).then(() => console.log(`Server running on port ${PORT}`))
}

bootstrap()
