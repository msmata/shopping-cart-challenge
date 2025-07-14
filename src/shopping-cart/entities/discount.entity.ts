import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Discount {
    @PrimaryGeneratedColumn()
    id: string;
    @Column()
    category: string;
    @Column('float')
    percent: number;
}