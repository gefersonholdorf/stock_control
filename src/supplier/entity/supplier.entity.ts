import { ProductEntity } from "src/product/entity/product.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('suppliers')
export class SupplierEntity {

    @PrimaryGeneratedColumn()
    id : number

    @Column({
        type: "varchar",
        length: 40
    })
    name : string

    @Column({
        type: "varchar",
        length: 40
    })
    email : string

    @Column({
        type: "varchar",
        length: 11
    })
    phone : string
    
    @OneToMany(type => ProductEntity, product => product.supplier)
    products: ProductEntity[]
}