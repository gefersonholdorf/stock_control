import { timestamp } from "rxjs";
import { TypeMovement } from "src/enum/type-movement.enum";
import { ProductEntity } from "src/product/entity/product.entity";
import { UserEntity } from "src/user/entity/user.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('stock_movements')
export class StockMovementEntity {

    @PrimaryGeneratedColumn()
    id : number

    @ManyToOne(type => ProductEntity, (product) => product.stockMovements)
    product : ProductEntity

    @Column()
    type : TypeMovement

    @Column({
        type: "integer"
    })
    quantity : number

    @Column({
        type: "timestamp"
    })
    date : Date

    @ManyToOne(type => UserEntity, (user) => user.stockMovement)
    user : UserEntity
}