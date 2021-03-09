import { Field, Int, ObjectType } from "type-graphql";
import { Entity, BaseEntity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, OneToMany } from "typeorm";
import { ProductCategory } from "./ProductCategory";


@ObjectType()
@Entity()
export class Product extends BaseEntity {

    @Field( () => Int)
    @PrimaryGeneratedColumn()
    id!: number;

    @Field()
    @Column()
    name!: string;

    @Field()
    @Column()
    price!: number;
    
    @Field()
    @Column()
    quantity!: number;
 
    @Field()
    @Column()
    description!: string;

    // @Field()
    // @ManyToOne(() => Category, category => category.products)
    // category: Category;

    @OneToMany(() => ProductCategory, (productCategory) => productCategory.product)
    productCategories: ProductCategory[];

    // Dates when the object was created (doesn't work with nativeInsert because an object isn't instantiated)
    @Field(() => String)
    @CreateDateColumn()
    createdAt: Date;

    @Field(() => String)
    @CreateDateColumn() // Hook that creates a new date every update
    updatedAt: Date;
}