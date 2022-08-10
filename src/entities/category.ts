import {Column, Entity, ManyToMany, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn} from "typeorm";
import { product } from "./product";

@Entity()
export class category {
    @PrimaryColumn()
    id!: number
    @Column()
    title!: string
    @Column()
    status!: string
    @Column()
    order!: number
    @Column()
    all_stores!: string
    @Column()
    products_order!: string
    @Column()
    kitchen_request!: string

    @ManyToOne(type=> product, pr=> pr.category)
    product!: product

}
