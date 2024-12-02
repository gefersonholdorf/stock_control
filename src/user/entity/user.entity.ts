import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

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
        length: 200
    })
    password : string

    @Column({
        type: "integer",
        default: 1
    })
    isActive : number

    @CreateDateColumn()
    createdAt : Date

    @UpdateDateColumn()
    updatedAt : Date
}