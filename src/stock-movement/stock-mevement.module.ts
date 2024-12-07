import { forwardRef, Module } from "@nestjs/common";
import { StockMovementService } from "./stock-mevement.service";
import { StockMovementController } from "./stock-mevement.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { StockMovementEntity } from "./entity/stock-movement.entity";
import { UserModule } from "src/user/user.module";
import { ProductModule } from "src/product/product.module";

@Module({
    imports: [TypeOrmModule.forFeature([StockMovementEntity]), forwardRef(()=> UserModule), forwardRef(() => ProductModule)],
    providers: [StockMovementService],
    controllers: [StockMovementController]
})
export class StockMovementModule {}