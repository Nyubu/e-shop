import { Category } from "../entities/Category";
import { Query, Resolver } from "type-graphql";
import { getConnection } from "typeorm";


@Resolver(Category)
export class CategoryResolver {
    
    @Query(() => [Category])
    async categories() {

        return await getConnection().query(
            `
                SELECT *                         
                FROM category         
            `
        );
    }
}