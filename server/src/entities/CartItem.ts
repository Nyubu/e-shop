import { Field, Int, ObjectType } from "type-graphql";
import { Entity, BaseEntity, Column, PrimaryGeneratedColumn, CreateDateColumn, OneToMany, ManyToOne } from "typeorm";
import { Cart } from "./Cart";
import { ProductCategory } from "./ProductCategory";


@ObjectType()
@Entity()
export class CartItem extends BaseEntity {

    @Field( () => Int)
    @PrimaryGeneratedColumn()
    id!: number;

    @Field()
    @Column()
    name!: string;

    @ManyToOne(() => Cart, (cart) => cart.cartItems)
    cart: Cart;

    // Dates when the object was created (doesn't work with nativeInsert because an object isn't instantiated)
    @Field(() => String)
    @CreateDateColumn()
    createdAt: Date;

    @Field(() => String)
    @CreateDateColumn() // Hook that creates a new date every update
    updatedAt: Date;
}