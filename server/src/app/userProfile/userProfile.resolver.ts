import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { UserProfileCreateMutationModel } from "./service/userProfile-create.mutation.model";
import { UserProfileCreateMutationService } from "./service/userProfile-create.service";
import { UserProfileReadQueryService } from "./service/userProfile-read-query.service";
import { UserProfileReadQueryModel } from "./service/userProfile-read.query.model";
import { UserProfileRepositoryService } from "./userProfile-repository.service";

@Resolver()
export class UserProfileResolver {

    constructor(
        private readonly userProfileCreateMutationService: UserProfileCreateMutationService,
        private readonly userProfileReadQueryService: UserProfileReadQueryService,
        private readonly userProfileRepositoryService: UserProfileRepositoryService
    ){}

    @Mutation(() => UserProfileCreateMutationModel)
    public async CreateUserProfile(@Args() _arguments: UserProfileCreateMutationModel) {
        const operation = new UserProfileCreateMutationModel(_arguments);
        return await this.userProfileCreateMutationService.serve(operation).then((data) => data);
    }

    @Query(() => UserProfileCreateMutationModel)
    public async ReadUserProfile(@Args() _arguments: UserProfileReadQueryModel){
        const operation = new UserProfileReadQueryModel(_arguments);
        return await this.userProfileReadQueryService.serve(operation).then((data) => data);
    }

    @Query(() => [UserProfileCreateMutationModel])
    public async ReadUserProfiles(){
        return await this.userProfileRepositoryService.readUserProfiles().then((data) => {
            return data;
        });
    }
}