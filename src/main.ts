import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1');
  // const options = new DocumentBuilder()
  //   .setTitle('Crawler')
  //   .setDescription('The Crawler API description')
  //   .setVersion('1.0')
  //   .addTag('crawler')
  //   .build();
  // const crawlerDocument = SwaggerModule.createDocument(app, options);
  // SwaggerModule.setup('api/v1/swagger', app, crawlerDocument);
  const options = {
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true,
  };
  app.enableCors(options);
  await app.listen(3002);
}
bootstrap();
