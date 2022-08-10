import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, OneToMany } from "typeorm";
import { product } from "./product";

@Entity()
export class stock {
    @PrimaryGeneratedColumn()
    id!: number

  
    @Column()
    amount!: number

    @Column()
    type!: string

    @Column()
    store_id!: string

    @Column()
    stockAlert!: number

    @Column()
    obs!: string

    @ManyToOne(type=> product, pr => pr.stock)
    productId!: product
    
}
