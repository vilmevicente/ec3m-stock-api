import { Entity, PrimaryGeneratedColumn, Column, PrimaryColumn, OneToMany } from "typeorm";
import { product } from "./product";

@Entity()
export class store {
    @PrimaryColumn()
    id!: number
    @Column()
    title!: string
    @Column()
    type!: string
    @Column()
    tax_id!: string
    @Column()
    tax_exemption!: string
    @Column()
    tax_exemption_law!: string
    @Column()
    status!: string
    @Column()
    sync_pos!: string
    @Column()
    sync_pos_ping!: string

    @OneToMany(type => product, pr => pr.store)
    product!: product

}
