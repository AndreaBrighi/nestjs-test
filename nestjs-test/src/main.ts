import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { AppModule } from './app.module';
import { z } from 'zod';

async function bootstrap() {
  const envSchema = z.object({
    PORT: z.coerce.number().default(3000),
    HOSTNAME: z.string().default('127.0.0.1'),
  });
  const envServerSchema = envSchema.parse(process.env);
  const app = await NestFactory.create(AppModule);
  await app.listen(envServerSchema.PORT, envServerSchema.HOSTNAME);
  app.getUrl().then((url) => {
    Logger.log('Server listening: ' + url, 'Server');
  });
}
bootstrap();
