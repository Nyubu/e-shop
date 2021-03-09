import 'reflect-metadata';

import express from 'express';
import { ApolloServer } from 'apollo-server-express'
import { buildSchema } from 'type-graphql';
import { HelloResolver } from './resolvers/hello';
import { createConnection } from 'typeorm';
import connectRedis from 'connect-redis'
import path from 'path';
import Redis from 'ioredis';
import { Product } from './entities/Product';
import { Category } from './entities/Category';
import session from 'express-session';
import cors from 'cors';
import { COOKIE_NAME, __prod__ } from './constants';
import { ProductCategory } from './entities/ProductCategory';
import { UserResolver } from './resolvers/user';
import { ProductResolver } from './resolvers/product';
import { User } from './entities/User';
import { CategoryResolver } from './resolvers/category';



const main = async () => {

    const conn = await createConnection({
        url: 'http://localhost:5433',  
        host: 'localhost',  
        type: 'postgres',
        database: 'shop',
        logging: true,
        synchronize: true,
        migrations: [path.join(__dirname, "./migrations/*")], // concatenate absolute path
        entities: [User, Product, Category, ProductCategory],    
    })

    await conn.runMigrations();

    const app = express();

    const RedisStore = connectRedis(session);
    const redis = new Redis()
    app.set("trust proxy", 1); // tell express we have a proxy sitting in front so cookies/sessions work
    app.use(
      cors({
        origin: "http://localhost:3000",
        credentials: true,
      })
    );
    app.use(
        session({
            name: COOKIE_NAME,
            store: new RedisStore({ 
                client: redis,
                disableTouch: true,
            }),
            
            cookie: {
                maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // 10 years
                httpOnly: true, // Good for security - can't access cookie from frontend js
                sameSite: "lax", // csrf
                secure: false,
                // domain: __prod__ ? ".sermohub.com" : undefined,
                // secure: __prod__, // cookie only works in https
            },
            saveUninitialized: false,
            secret: '9348hj9eajdf9a8rfre', // You want to hide this make env variable
            resave: false,
        })
    )

    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [HelloResolver, UserResolver, ProductResolver, CategoryResolver],
            validate: false
        }),
        context: ({ req, res} ) => ({
            req,
            res,
            redis
        })
    })

    apolloServer.applyMiddleware({
        app,
        cors: false
    })


    app.listen(5000, 'localhost', () => {
        console.log("Server started on port 5000")
    })
}

main().catch( (error) => {
    console.error(error);
});