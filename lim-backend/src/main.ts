import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('TS APIS')
    .setDescription('APIs currently available')
    .setVersion('0.0.1')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.enableCors({
    // origin set true is enable CORS
    origin: true,
    // Configures the Access-Control-Allow-Methods CORS header
    methods: 'GET,PUT,PATCH,POST,DELETE,OPTIONS',
    // Configures the Access-Control-Allow-Credentials CORS header
    credentials: true,
  });

  await app.listen(4000);
}
bootstrap();
