import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./product.entity";

@Entity()
export class ShoppingCart {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column()
    userId: string;
    @ManyToMany(() => Product, { cascade: true })
    @JoinTable()
    products: Product[];
}