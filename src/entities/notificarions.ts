import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class notification {
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    title!: string

    @Column()
    message!: string

    @Column({default: false})
    read!: boolean
   
}
