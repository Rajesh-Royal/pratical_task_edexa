import {
    ArgsType, Field, ID, ObjectType
} from '@nestjs/graphql';

@ArgsType()
@ObjectType()
export class UserProfileUpdateMutationModel {

    @Field(() => ID)
    public readonly _id: string = undefined;


    @Field(() => String, {
        nullable: true
    })
    public readonly name?: string = undefined;

    @Field(() => String, {
        nullable: true
    })
    public readonly profilePic?: string = undefined;


    @Field(() => String, {
        nullable: true
    })
    public readonly address?: string = undefined;


    @Field(() => Number, {
        nullable: true
    })
    public readonly age?: number = undefined;


    constructor(initialValue?: any){
        this._id = initialValue?._id;
        this.name = initialValue?.name;
        this.address = initialValue?.address;
        this.age = initialValue?.age;
        this.profilePic = initialValue?.profilePic;

    }
}
