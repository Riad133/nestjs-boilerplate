import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppConfiguration } from 'read-appsettings-json';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './utility/http-exception.filter';
import { ParseObjectIdPipe } from './utility/validation.pipe';

async function bootstrap() {
  let listenPort =AppConfiguration.Setting().appindPort;
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(listenPort);
}
bootstrap();
