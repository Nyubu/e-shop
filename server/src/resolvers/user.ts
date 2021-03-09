import { MyContext } from "../types";
import { Arg, Ctx, Field, FieldResolver, Mutation, ObjectType, Query, Resolver, Root } from "type-graphql";
import { User } from "../entities/User";
import { CredentialsInput } from "./CredentialsInput";
import argon2 from "argon2";
import { validateRegister } from "../utils/validateRegister";
import { getConnection } from "typeorm";
import { COOKIE_NAME, FORGET_PASSWORD_PREFIX } from "../constants";
import { v4 } from "uuid";
import { sendEmail } from "../utils/sendEmail";

@ObjectType()
class FieldError {
    
    @Field()
    field: string

    @Field()
    message: string
}

@ObjectType()
class UserResponse {

    @Field( () => [FieldError], {nullable: true})
    errors?: FieldError[]

    @Field(() => User, {nullable: true})
    user?: User;
}


@Resolver(User)
export class UserResolver {

    @FieldResolver(() => String)
    email(
        @Root() user: User, 
        @Ctx() { req }: MyContext
    ) {
        // This is the current user and its okay to show them their own email
        if (req.session.userId == user.id) {
            return user.email;
        }

        // Current user wants to see someone elses email
        return "";
    } 

    @Mutation(() => UserResponse)
    async changePassword(
        @Arg('token') token: string,
        @Arg('newPassword') newPassword: string,
        @Ctx() { redis, req }: MyContext
    ): Promise<UserResponse> {
        if (newPassword.length <= 2) {
            return { errors: [
                    {
                        field: 'newPassword',
                        message: 'Password must be greater than 2 characters'
                    },
                ]
            }
        }

        // Check if token is good
        const key = FORGET_PASSWORD_PREFIX + token
        const userId = await redis.get(key);

        if (!userId) {
            return {
                errors: [
                    {
                        field: 'token',
                        message: 'Token expired'
                    },
                ]
            }
        }

        // Update user
        const userIdNum = parseInt(userId);
        const user = await User.findOne(userIdNum);

        if (!user) {
            return {
                errors: [
                    {
                        field: 'token',
                        message: 'User no longer exists'
                    },
                ]
            }
        }

        // Remember to hash new password!
        await User.update({id: userIdNum}, {password: await argon2.hash(newPassword)});

        redis.del(key);
        // login user after changing password
        req.session.userId = user.id;

        return { user }; // errors would be null
    }
    

    @Mutation(() => Boolean)
    async forgotPassword(
        @Arg('email') email: string,
        @Ctx() { redis }: MyContext
    ) {
        const user = await User.findOne({ where: {email} })

        if (!user) { // email not in database
            return false
        }

        const token = v4();

        await redis.set(
            FORGET_PASSWORD_PREFIX,
            user.id,
            "ex",
             1000 * 60 * 60 * 24 * 3
        ) // three days reset pass

        // Change local host to domain name
        await sendEmail(email, `<a href="localhost:3000:/change-password/${token}">Reset Password</a>`)

        return email;
    }

    @Query(() => User, {nullable: true})
    async me(
        @Ctx() { req }: MyContext
    ) {
        
        if (!req.session.userId)
            return null;

        return await User.findOne(req.session.userId);
    }

    @Mutation(() => UserResponse)
    async login(
        @Arg('usernameOrEmail') usernameOrEmail: string,
        @Arg('password') password: string,
        @Ctx() {req}: MyContext
    ): Promise<UserResponse> {   
        const user = await User.findOne(            
            usernameOrEmail.includes("@") 
                ? { where: { email: usernameOrEmail } }
                : { where: { username: usernameOrEmail } }         
        );
        if (!user) {
            return {
                errors: [
                    {
                        field: 'usernameOrEmail',
                        message: "That username doesn't exist",
                    },
                ]
            }
        }
        const valid = await argon2.verify(user.password, password); // Compare hashed password with plain text pass
        
        if (!valid) {
            return {

                errors: [
                    {
                        field: 'password',
                        message: "Incorrect Password",
                    },
                ]
            };
        }

        req.session.userId = user.id;

        return {
            user
        };
    }


    @Mutation(() => UserResponse)
    async register(
        @Arg('options') options: CredentialsInput,
        @Ctx() {req}: MyContext
    ) {

        const errors = validateRegister(options);

        if (errors) {
            return { errors }
        }

        const hashedPassword = await argon2.hash(options.password)

        let user;
        try { // insert user and return it back
            const result = await getConnection()
            .createQueryBuilder()
            .insert()
            .into(User)
            .values({
                username: options.username,
                email: options.email,
                password: hashedPassword,
            })
            .returning("*") // return all from user 
            .execute(); 
            user = result.raw[0]; // key that has the value
        } catch(err) {

            if (err.detail.includes('already exists')) {
                return {
                    errors: [{
                        field: 'username',
                        message: "Username already taken",
                    }]
                };
            }
            console.log("Message ", err.message);
        }

        
        req.session.userId = user.id;

        return { user } 
    }

    

    @Mutation(() => Boolean)
    logout(@Ctx() {req, res}: MyContext) {

        // wait for promise to resolve
        return new Promise( (resolve) => // Wait for destroy to happen with promise
            req.session.destroy(err => {  // Remove session from redis and callback
                res.clearCookie(COOKIE_NAME)
                if (err) {
                    console.log(err)
                    resolve(false)
                    return;
                }
                resolve(true)
            })
        )     
    }
}