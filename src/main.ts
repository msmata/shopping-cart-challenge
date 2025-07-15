import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('API de Carrito de Compras')
    .setDescription('Documentación de la API del Challenge')
    .setVersion('1.0')
    .addBearerAuth() // 👈 importante para JWT
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // acceso en http://localhost:3000/api

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
