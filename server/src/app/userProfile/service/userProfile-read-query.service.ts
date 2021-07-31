import { Injectable } from "@nestjs/common";
import { UserProfileRepositoryService } from "../userProfile-repository.service";
import { UserProfileCreateMutationModel } from "./userProfile-create.mutation.model";
import { UserProfileReadQueryModel } from "./userProfile-read.query.model";

@Injectable()
export class UserProfileReadQueryService {
    constructor(
        private readonly userProfileRepositoryService: UserProfileRepositoryService
    ){}

    public async serve(operation: UserProfileReadQueryModel) {
        const userProfile = await this.userProfileRepositoryService.readUserProfile(operation);

        if(userProfile?.id){
            return new UserProfileCreateMutationModel(userProfile);
        }else {
            return "Cannot read this user's profile";
        }
    }
}