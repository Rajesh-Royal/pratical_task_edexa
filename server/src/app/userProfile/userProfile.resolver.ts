import { UseGuards } from "@nestjs/common";
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { GqlAuthGuard } from "../auth/guards/auth.guard";
import { UserProfileCreateMutationModel } from "./service/userProfile-create.mutation.model";
import { UserProfileCreateMutationService } from "./service/userProfile-create.service";
import { UserProfileDeleteMutationService } from "./service/userProfile-delete-mutation.service";
import { UserProfileDeleteMutationModel } from "./service/userProfile-delete.mutation.model";
import { UserProfileReadQueryService } from "./service/userProfile-read-query.service";
import { UserProfileReadQueryModel } from "./service/userProfile-read.query.model";
import { UserProfileUpdateMutationService } from "./service/userProfile-update-mutation.service";
import { UserProfileUpdateMutationModel } from "./service/userProfile-update.mutation.model";
import { UserProfileRepositoryService } from "./userProfile-repository.service";

@Resolver()
export class UserProfileResolver {

    constructor(
        private readonly userProfileCreateMutationService: UserProfileCreateMutationService,
        private readonly userProfileReadQueryService: UserProfileReadQueryService,
        private readonly userProfileRepositoryService: UserProfileRepositoryService,
        private readonly userProfileDeleteMutationService: UserProfileDeleteMutationService,
        private readonly userProfileUpdateMutationService: UserProfileUpdateMutationService
    ){}

    @UseGuards(GqlAuthGuard)
    @Mutation(() => UserProfileCreateMutationModel)
    public async CreateUserProfile(@Args() _arguments: UserProfileCreateMutationModel) {
        const operation = new UserProfileCreateMutationModel(_arguments);
        return await this.userProfileCreateMutationService.serve(operation).then((data) => data);
    }

    @UseGuards(GqlAuthGuard)
    @Mutation(() => String)
    public async DeleteUserProfile(@Args() _arguments: UserProfileDeleteMutationModel){
        const operation = new UserProfileDeleteMutationModel(_arguments);
        return await this.userProfileDeleteMutationService.serve(operation).then((data) => data);
    }

    @UseGuards(GqlAuthGuard)
    @Mutation(() => String)
    public async UpdateUserProfile(@Args() _arguments: UserProfileUpdateMutationModel){
        const operation = new UserProfileUpdateMutationModel(_arguments);
        return await this.userProfileUpdateMutationService.serve(operation).then((data) => data);
    }

    @UseGuards(GqlAuthGuard)
    @Query(() => UserProfileCreateMutationModel)
    public async ReadUserProfile(@Args() _arguments: UserProfileReadQueryModel){
        const operation = new UserProfileReadQueryModel(_arguments);
        return await this.userProfileReadQueryService.serve(operation).then((data) => data);
    }


    @UseGuards(GqlAuthGuard)
    @Query(() => [UserProfileCreateMutationModel])
    public async ReadUserProfiles(){
        return await this.userProfileRepositoryService.readUserProfiles().then((data) => {
            return data;
        });
    }
}