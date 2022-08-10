import { Entity, Column, PrimaryGeneratedColumn, OneToMany, OneToOne, ManyToOne } from "typeorm";
import { category } from "./category";
import { image } from "./image";
import { price } from "./price";
import { stock } from "./stock";
import { store } from "./store";

@Entity()
export class product {
    @PrimaryGeneratedColumn()
    id!: number
    @Column()
    order!: string

    @Column()
    reference!: string

    @Column()
    barcode!: string

    @Column()
    supplier_code!: string

    @Column()
    title!: string

    @Column()
    description!: string

    @Column()
    include_description!: string

    @Column()
    supply_price!: string

    @Column()
    gross_price!: string

    @Column()
    price_without_tax!:string

    @OneToMany(type=> price, pr=> pr.price)
    prices!: price

    @OneToMany(type=>store, pr =>pr.product)
    store!:store
   
    
    @Column()
    unit_id!: string

    @Column()
    type_id!: string

    @Column()
    class_name!: string

    @Column()
    stock_control!: string

    @Column()
    stock_type!: string

    @Column()
    tax_id!: string

    @Column()
    tax_exemption!: string

    @Column()
    tax_exemption_law!: string

    @OneToMany(type=> category, pr=> pr.product)
    category!: category

    @OneToMany(type=> stock, pr => pr.productId)
    stock!: stock

    @Column()
    brand_id!: string

    @ManyToOne(type=> image, tr =>tr.product)
    image!:image

    @Column()
    status!: string


}
