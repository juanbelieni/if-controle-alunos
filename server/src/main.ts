import { ValidationPipe, BadRequestException } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      dismissDefaultMessages: true,
      exceptionFactory: (errors) => {
        const constraints = errors[0].constraints;
        const error = constraints[Object.keys(constraints)[0]];

        return new BadRequestException(error);
      },
    }),
  );

  app.enableCors();

  await app.listen(process.env.PORT || 3333);
}
bootstrap();
