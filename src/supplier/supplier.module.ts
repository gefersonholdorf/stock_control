import { forwardRef, Module } from "@nestjs/common";
import { SupplierService } from "./supplier.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SupplierEntity } from "./entity/supplier.entity";
import { SupplierController } from "./suppler.controller";
import { ProductModule } from "src/product/product.module";

@Module({
    imports: [TypeOrmModule.forFeature([SupplierEntity]), forwardRef(() => ProductModule)],
    providers: [SupplierService],
    controllers: [SupplierController],
    exports: [SupplierService]
})
export class SupplierModule{}