import { Category } from '../entities/Category';
import { ProductCategory } from '../entities/ProductCategory';
import { Arg, Int, Query, Resolver } from 'type-graphql';
import { getConnection } from 'typeorm';
import { Product } from "../entities/Product";


@Resolver(Product)
export class ProductResolver {

    // Get all products
    @Query(() => [Product])
    async productsAll( 
        @Arg('category', () => [String]) category: string[], 
    ): Promise<Product[]> {               
        
        if (category?.length > 0) {
            return await getConnection()
                .getRepository(Product)
                .createQueryBuilder("p")
                .select("p.*")
                .innerJoin(ProductCategory, "pc", "p.id = pc.productId")
                .innerJoin(Category, "c", "c.id = pc.categoryId")
                .where("c.name IN (:...category)", { category: category })
                .groupBy('p.id')
                .getRawMany();

        } else {
            return await getConnection()
                .getRepository(Product)
                .createQueryBuilder("p")
                .select("p.*")
                .getRawMany();

        }
            
        // By one category
        // return await getConnection().query(
        //     `
        //         SELECT p.* FROM product p
        //         ${ category 
        //             ? `JOIN product_category ON p.id = product_category."productId"
        //             JOIN category ON category.id = product_category."categoryId" 
        //             WHERE category.name = ANY(ARRAY[${category}])`
        //             : ""}
        //     `,
        //     category ? category : undefined
        // )                
        
        // return await getConnection().query(
        //     `
        //         SELECT p.* FROM product p
        //         ${ category 
        //             ? `JOIN product_category ON p.id = product_category."productId"
        //             JOIN category ON category.id = product_category."categoryId" 
        //             WHERE category.name = '${category}'`
        //             : ""}
        //     `
        // )                
    }

    // Get all products with limit and offset
    @Query(() => [Product])
    async products( 
        @Arg('limit', () => Int) limit: number, // For pagination
        @Arg('offset', () => Int, { nullable: true }) offset: number,      
        @Arg('category', () => String, {nullable: true}) category: string | null, 
    ): Promise<[Product]> { 
        
        const realLimit = Math.min(50, limit);
        const lowerBound = realLimit * offset;
        const upperBound = realLimit * offset + realLimit;

        const products = await getConnection().query(
            `
                SELECT p.* FROM product p
                ${ category 
                    ? `JOIN product_category ON p.id = product_category."productId"
                    JOIN category ON category.id = product_category."categoryId" 
                    WHERE category.name = '${category}'`
                    : ""}
            `
        )                
       
        return products.slice(lowerBound, upperBound);
        // return products.slice(offset, realLimit);
    
    }

    @Query(() => Int)
    async pageCount( 
        @Arg('category', () => [String]) category: string[], 
        @Arg('limit', () => Int) limit: number  
    ): Promise<number> { 

        const realLimit = Math.min(50, limit);
    
        let productsCount:number;

        if (category?.length > 0) {
            productsCount = await getConnection()
                .getRepository(Product)
                .createQueryBuilder("p")
                .select("p.*")
                .innerJoin(ProductCategory, "pc", "p.id = pc.productId")
                .innerJoin(Category, "c", "c.id = pc.categoryId")
                .where("c.name IN (:...category)", { category: category })
                .groupBy('p.id')
                .getCount();

        } else {
            productsCount = await getConnection()
                .getRepository(Product)
                .createQueryBuilder("p")
                .select("p.*")
                .getCount();

        }
   
        // let productsCount = await getConnection().query(
        //     `
        //         SELECT COUNT(p.*) FROM product p
        //         ${ category 
        //             ? `JOIN product_category ON p.id = product_category."productId"
        //             JOIN category ON category.id = product_category."categoryId" 
        //             WHERE category.name = '${category}'`
        //             : ""}
        //     `
        // )     

        // Change shape of data
        // productsCount = productsCount[0].count;
        
        if (realLimit == 0)
            return 1;
        else if (productsCount % limit == 0)
            return productsCount / realLimit;
        else 
            return Math.floor(productsCount / realLimit) + 1;    
    }    
    

    @Query(() => Product, { nullable: true }) // getting data
    product( @Arg('id', () => Int) id: number): Promise<Product | undefined> { //typescript type
        return Product.findOne(id); // match the manytoone field in Product
    }    
}