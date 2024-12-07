import { OrderEntity } from "src/order/entity/order.entity";
import { StockMovementEntity } from "src/stock-movement/entity/stock-movement.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('users')
export class UserEntity {

    @PrimaryGeneratedColumn()
    id : number

    @Column({
        type: "varchar",
        length: 30
    })
    name : string

    @Column({
        type: "varchar",
        unique: true,
        length: 40
    })
    email : string

    @Column({
        type: "varchar",
        length: 200,
        select: false
    })
    password : string

    @Column({
        type: "integer",
        default: 1
    })
    isActive : number

    @Column({
        default: 'user'
    })
    role : string

    @Column()
    photo : string

    @CreateDateColumn()
    createdAt : Date

    @UpdateDateColumn()
    updatedAt : Date

    @OneToMany(type => StockMovementEntity, (stockMovement) => stockMovement.user)
    stockMovement : StockMovementEntity[]

    @OneToMany(type => OrderEntity, (order) => order.user)
    orders : OrderEntity[]
}