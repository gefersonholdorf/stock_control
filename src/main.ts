import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { UsePipes, ValidationPipe } from '@nestjs/common';
import { RoleGuard } from './guards/role.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
                        .setTitle('API')
                        .setDescription('Documentação da API')
                        .setVersion('1.0.0')
                        .addTag('api')
                        .build()

  const documentFactory = () => SwaggerModule.createDocument(app, config)

  SwaggerModule.setup('api', app, documentFactory)

  UsePipes(new ValidationPipe())

  await app.listen(process.env.PORT ?? 3000);
  console.log(`Application running in ${process.env.NODE_ENV} mode on port ${process.env.PORT}`)
}
bootstrap();
