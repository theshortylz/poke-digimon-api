import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const PORT = process.env.PORT || 3000;
  const app = await NestFactory.create(AppModule);

  // Configuración de Swagger
  const config = new DocumentBuilder()
    .setTitle('API Pokémon y Digimon')
    .setDescription('Documentación de la API REST para Pokémon y Digimon')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  await app.listen(3000);
  Logger.log(`Server is running on port ${PORT}`);
  Logger.log(`Swagger docs: http://localhost:${PORT}/api-docs`);
}
bootstrap();
