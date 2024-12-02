import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [
        `.env.${process.env.NODE_ENV || 'development'}`,
      ],
      isGlobal: true
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.BD_HOST,
      port: parseInt(process.env.BD_PORT),
      username: process.env.BD_USER,
      password: process.env.BD_PASSWORD,
      database: process.env.BD_DATABASE,
      entities: [],
      synchronize: process.env.NODE_ENV == 'development'
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}
