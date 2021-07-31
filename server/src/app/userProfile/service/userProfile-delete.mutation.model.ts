import { ArgsType, Field } from "@nestjs/graphql";

@ArgsType()
export class UserProfileDeleteMutationModel {
    @Field(() => String)
    public userId: string = undefined;

    constructor(initialValue: any){
        this.userId = initialValue?.userId;
    }
}