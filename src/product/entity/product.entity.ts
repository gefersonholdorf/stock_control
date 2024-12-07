import { OrderEntity } from "src/order/entity/order.entity";
import { StockMovementEntity } from "src/stock-movement/entity/stock-movement.entity";
import { SupplierEntity } from "src/supplier/entity/supplier.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('products')
export class ProductEntity {

    @PrimaryGeneratedColumn()
    id : number

    @Column({
        type: "varchar",
        length: 40
    })
    name : string

    @Column({
        type: "varchar",
        length: 150
    })
    description : string

    @Column({
        type: "integer",
        unsigned: true
    })
    stockQuantity : number

    @Column({
        type: "decimal",
        precision: 10,
        scale: 2
    })
    price : number

    @ManyToOne(type => SupplierEntity, supplier => supplier.products)
    supplier : SupplierEntity

    @OneToMany(type => StockMovementEntity, (stockMovement) => stockMovement.product)
    stockMovements: StockMovementEntity[]

    @OneToMany(type => OrderEntity, (order) => order.product)
    orders : OrderEntity[]
}