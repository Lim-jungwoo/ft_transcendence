
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  const config = new DocumentBuilder()
  .setTitle("TS APIS")
  .setDescription("APIs currently available")
  .setVersion("0.0.2")
  .addBearerAuth({
    type: "http",
    scheme: "bearer",
    bearerFormat: "JWT",
    name: "JWT",
    description: "JWT Bearer Token",
    in: "header"
  }, "token")
  .addBearerAuth({
    type: "http",
    scheme: "bearer",
    bearerFormat: "JWT Refresh",
    name: "JWT Refresh",
    description: "JWT Refresh Bearer Token",
    in: "header"
  }, "rtoken")
  .build();
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document);

  app.enableCors({
    origin: true,
    methods: "GET,PUT,PATCH,POST,DELETE,OPTIONS",
    credentials: true,
  });

  await app.listen(4000);
} 
bootstrap();
