import { Body, Controller, Get, Post, Query, UsePipes, ValidationPipe } from "@nestjs/common";
import { CreateStockMovementDTO } from "./dto/create-stock-movement.dto";
import { StockMovementService } from "./stock-mevement.service";
import { FilterMovementDTO } from "./dto/filter-movement.dto";

@UsePipes(new ValidationPipe())
@Controller('stock-movements')
export class StockMovementController {

    constructor(private readonly stockMovementService : StockMovementService) {}
    
    @Post('entry')
    async entry(@Body() createStockMovementDTO : CreateStockMovementDTO) {
        return this.stockMovementService.entry(createStockMovementDTO)
    }

    @Post('exit')
    async exit(@Body() createStockMovementDTO : CreateStockMovementDTO) {
        return this.stockMovementService.exit(createStockMovementDTO)
    }

    @Get()
    async filterMoviments(@Query() filters : FilterMovementDTO) {
        return this.stockMovementService.filterMoviments(filters)
    }
}