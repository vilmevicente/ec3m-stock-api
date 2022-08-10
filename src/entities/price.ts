import {Column, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn} from "typeorm";
import { product } from "./product";

@Entity()
export class price {
    @PrimaryGeneratedColumn()
    id!: number
    @Column()
    price!: number
    @Column()
    price_without_tax!: number

    @OneToMany(type=> product, pr => pr.prices)
    product!: number

}
