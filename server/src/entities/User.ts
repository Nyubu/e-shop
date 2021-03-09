import { ObjectType, Field, Int } from "type-graphql";
import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";


@ObjectType()
@Entity()
export class User extends BaseEntity {

    @Field( () => Int)
    @PrimaryGeneratedColumn()
    id!: number;

    @Field()
    @Column({unique: true}) // unique username
    username!: string;
    
    @Field()
    @Column({unique: true}) // unique email
    email!: string;
    
    @Column()
    password: string;

    @Field(() => String)
    @CreateDateColumn()
    createdAt: Date;

    @Field(() => String)
    @UpdateDateColumn()
    updatedAt: Date;
}