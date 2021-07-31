import { Injectable } from "@nestjs/common";
import { UserProfileRepositoryService } from "../userProfile-repository.service";
import { UserProfileCreateMutationModel } from "./userProfile-create.mutation.model";

@Injectable()
export class UserProfileCreateMutationService {

    constructor(
        private readonly userProfileRepositoryService: UserProfileRepositoryService
    ){}

    public async serve(operation: UserProfileCreateMutationModel) {
        const userProfile = await this.userProfileRepositoryService.createUserProfile(operation);

        if(userProfile?.id){
            return new UserProfileCreateMutationModel(userProfile);
        }else{
            return "Cannot create this user's profile"
        }
    }
}