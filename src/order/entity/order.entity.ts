import { ProductEntity } from "src/product/entity/product.entity";
import { SupplierEntity } from "src/supplier/entity/supplier.entity";
import { UserEntity } from "src/user/entity/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('orders')
export class OrderEntity {

    @PrimaryGeneratedColumn()
    id : number

    @ManyToOne(type => ProductEntity, (product) => product.orders)
    product : ProductEntity

    @ManyToOne(type => UserEntity, (user) => user.orders)
    user : UserEntity

    @ManyToOne(type => SupplierEntity, (supplier) => supplier.orders)
    supplier : SupplierEntity

    @Column({
        type: "integer"
    })
    quantity : number

    @Column({
        type: "timestamp"
    })
    creationDate : Date

    @Column({
        type: "timestamp"
    })
    endDate : Date
}