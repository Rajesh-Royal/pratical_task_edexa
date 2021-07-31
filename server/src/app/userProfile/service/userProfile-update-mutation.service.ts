import { BadRequestException, Injectable } from "@nestjs/common";
import { UserProfileRepositoryService } from "../userProfile-repository.service";
import { UserProfileUpdateMutationModel } from "./userProfile-update.mutation.model";

@Injectable()
export class UserProfileUpdateMutationService {

    constructor(
        private readonly userProfileRepositoryService: UserProfileRepositoryService
    ){}

    public async serve(operation: UserProfileUpdateMutationModel) {
        const userProfile = await this.userProfileRepositoryService.updateUserProfile(operation);

        if(userProfile?.nModified > 0){
            return "User Profile Updated successfully";
        }else{
            throw new BadRequestException("Cannot update this user's profile");
        }
    }
}