import { forwardRef, Module } from "@nestjs/common";
import { ProductService } from "./product.service";
import { ProductController } from "./product.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProductEntity } from "./entity/product.entity";
import { SupplierModule } from "src/supplier/supplier.module";

@Module({
    imports: [TypeOrmModule.forFeature([ProductEntity]), forwardRef(() => SupplierModule)],
    providers: [ProductService],
    controllers: [ProductController],
    exports: [ProductService]
})
export class ProductModule {}