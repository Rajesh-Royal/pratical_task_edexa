import { ArgsType, Field, ID } from "@nestjs/graphql";

@ArgsType()
export class UserProfileReadQueryModel {

    @Field(() => ID, {
        nullable: true
    })
    public readonly userId?: string = undefined;

    constructor(initialValues?: any){
        this.userId = initialValues?.userId;
    }
}