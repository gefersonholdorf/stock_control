import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user/entity/user.entity';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { FileModule } from './file/file.module';
import { ProductEntity } from './product/entity/product.entity';
import { ProductModule } from './product/product.module';
import { SupplierEntity } from './supplier/entity/supplier.entity';
import { SupplierModule } from './supplier/supplier.module';
import { StockMovementEntity } from './stock-movement/entity/stock-movement.entity';
import { StockMovementModule } from './stock-movement/stock-mevement.module';
import { OrderEntity } from './order/entity/order.entity';

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
      entities: [UserEntity, ProductEntity, SupplierEntity, StockMovementEntity, OrderEntity],
      synchronize: process.env.NODE_ENV == 'development'
    }),
    UserModule,
    AuthModule,
    FileModule,
    ProductModule,
    SupplierModule,
    StockMovementModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}
