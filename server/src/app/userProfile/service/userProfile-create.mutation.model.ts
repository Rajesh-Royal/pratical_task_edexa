import {
    ArgsType, Field, ID, ObjectType
} from '@nestjs/graphql';
import { IsNotEmpty } from "class-validator";

@ArgsType()
@ObjectType()
export class UserProfileCreateMutationModel {

    @Field(() => ID, {
        nullable: true
    })
    public readonly _id?: string = undefined;

    @IsNotEmpty()
    @Field(() => String)
    public readonly name: string = undefined;

    @IsNotEmpty()
    @Field(() => String)
    public readonly profilePic: string = undefined;

    @IsNotEmpty()
    @Field(() => String)
    public readonly address: string = undefined;

    @IsNotEmpty()
    @Field(() => Number)
    public readonly age: number = undefined;


    constructor(initialValue?: any){
        this._id = initialValue?._id;
        this.name = initialValue?.name;
        this.address = initialValue?.address;
        this.age = initialValue?.age;
        this.profilePic = initialValue?.profilePic;

    }
}
