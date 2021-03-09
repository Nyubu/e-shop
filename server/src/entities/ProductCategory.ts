import { BaseEntity, Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { Category } from './Category';
import { Product } from './Product';

// m to n relationship 
// user <-> posts
// user -> join table <- posts
// user -> updoot <- posts

@Entity()
export class ProductCategory extends BaseEntity {

    @PrimaryColumn()
    productId: number;

    @ManyToOne(() => Product, (product) => product.productCategories)
    product: Product;

    @PrimaryColumn()
    categoryId: number;

    @ManyToOne(() => Category, (category) => category.productCategories)
    category: Category;
 
}