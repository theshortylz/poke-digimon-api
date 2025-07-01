import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import configuration from './config/app.config';

const appConfig = configuration();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configuración de Swagger
  const config = new DocumentBuilder()
    .setTitle(appConfig.swagger.title)
    .setDescription(appConfig.swagger.description)
    .setVersion(appConfig.swagger.version)
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  await app.listen(appConfig.port);

  Logger.log(`Server is running on port ${appConfig.port}`);
  Logger.log(
    `Swagger docs: http://localhost:${appConfig.port}/${appConfig.swagger.path}`,
  );
}

bootstrap();
