import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { AppModule } from './app.module';
import * as config from 'config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as bodyParser from 'body-parser';
import * as morgan from 'morgan';
import * as path from 'path';
import * as fs from 'fs';

async function bootstrap() {
  const serverConfig = config.get('server');
  const logger = new Logger('bootstrap');
  const app = await NestFactory.create(AppModule);

  if (process.env.NODE_ENV === 'development') {
    app.enableCors();
  } else {
    app.enableCors({ origin: serverConfig.origin });
    logger.log(`Accepting requests from origin "${serverConfig.origin}"`);
  }

  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(
    bodyParser.urlencoded({
      limit: '50mb',
      extended: true,
      parameterLimit: 1000000,
    }),
  );

  app.use(
    morgan('combined', {
      stream: fs.createWriteStream(
        path.join(__dirname, `../${config.get('logs').path}/access.log`),
        { flags: 'a' },
      ),
    }),
  );

  /**
   * Swagger setup
   */
  const options = new DocumentBuilder()
    .setTitle('CIO FORUM')
    .setDescription('CIO FORUM REST API')
    .setVersion('1.0')
    .addTag('cio')
    .addBearerAuth('Authorization')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('swagger', app, document);

  const port = process.env.PORT || serverConfig.port;
  await app.listen(port);
  logger.log(`Application listening on port ${port}`);
}
bootstrap();
