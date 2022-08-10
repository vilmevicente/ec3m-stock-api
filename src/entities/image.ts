import {Column, Entity, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn} from "typeorm";
import { product } from "./product";

@Entity()
export class image {
    @PrimaryColumn()
    id!: number
    @Column()
    xs!: string
    @Column()
    m!: string
    
    @OneToMany(type=>  product, tr =>tr.image)
    product!:product
}
