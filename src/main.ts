import { ValidationPipe, BadRequestException, Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from '@/src/app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

const signalsNames: NodeJS.Signals[] = ['SIGTERM', 'SIGINT', 'SIGHUP'];

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('Bootstrap');

  signalsNames.forEach((signalName) =>
    process.on(signalName, (signal) => {
      logger.log(`Retrieved signal: ${signal}, application terminated`);
      process.exit(0);
    }),
  );

  process.on('uncaughtException', (error: Error) => {
    logger.error({ err: error });
    process.exit(1);
  });

  process.on('unhandledRejection', (reason, promise) => {
    logger.error(`Unhandled Promise Rejection, reason: ${reason}`);
    promise.catch((err: Error) => {
      logger.error({ err });
      process.exit(1);
    });
  });

  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (errors) => {
        logger.error('exceptionFactory validation errors: ', errors);
        const result = errors.map((error) => ({
          property: error.property,
          message: error.constraints[Object.keys(error.constraints)[0]],
        }));
        return new BadRequestException(result);
      },
      stopAtFirstError: true,
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  app.setGlobalPrefix('api');
  app.enableCors();

  const docOptions = new DocumentBuilder()
    .setTitle('Sercret Santa API')
    .setDescription(
      'Secret Santa API for special christmas event what is brings us together',
    )
    .setVersion('0.1')
    .build();

  const document = SwaggerModule.createDocument(app, docOptions);
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(3000);
  logger.log(`Application is running on: ${await app.getUrl()}`);
};

bootstrap();