import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { Logger } from '@nestjs/common';
import { AppModule } from './app.module';
import * as config from 'config';

async function bootstrap() {
  const serverConfig = config.get('server');
  const logger = new Logger('Reboot-BE');
  const app = await NestFactory.create(AppModule);
  if (process.env.NODE_ENV === 'development') {
    app.enableCors();
  } else {
    app.enableCors({ origin: '*' });
  }

  const options = new DocumentBuilder()
    .setTitle('Reboot-BE')
    .setDescription('Reboot-BE')
    .setVersion('1.0')
    .addTag('Backend')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);

  const port = process.env.PORT || serverConfig.port;
  SwaggerModule.setup('doc', app, document);
  await app.listen(port);
  logger.log(`Application Listening on Port ${port} `);
  logger.log(`Api documentation avaliable at "/doc/`);
}
bootstrap();