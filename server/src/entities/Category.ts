import { Field, Int, ObjectType } from "type-graphql";
import { Entity, BaseEntity, Column, PrimaryGeneratedColumn, CreateDateColumn, OneToMany } from "typeorm";
import { ProductCategory } from "./ProductCategory";


@ObjectType()
@Entity()
export class Category extends BaseEntity {

    @Field( () => Int)
    @PrimaryGeneratedColumn()
    id!: number;

    @Field()
    @Column()
    name!: string;

    @OneToMany(() => ProductCategory, (productCategory) => productCategory.category)
    productCategories: ProductCategory[];

    // Dates when the object was created (doesn't work with nativeInsert because an object isn't instantiated)
    @Field(() => String)
    @CreateDateColumn()
    createdAt: Date;

    @Field(() => String)
    @CreateDateColumn() // Hook that creates a new date every update
    updatedAt: Date;
}