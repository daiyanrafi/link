import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //this prefix will be applied to all routes globally
  app.setGlobalPrefix('api');
  await app.listen(3000);
}
bootstrap();
