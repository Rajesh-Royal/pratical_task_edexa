import { BadRequestException, Injectable } from "@nestjs/common";
import { UserProfileRepositoryService } from "../userProfile-repository.service";
import { UserProfileDeleteMutationModel } from "./userProfile-delete.mutation.model";

@Injectable()
export class UserProfileDeleteMutationService {
    constructor(
        private readonly userProfileRepositoryService: UserProfileRepositoryService
    ){}

    public async serve(operation: UserProfileDeleteMutationModel) {
        const userProfileDelete = await this.userProfileRepositoryService.deleteUserProfile(operation);

        if(userProfileDelete.deletedCount > 0){
            return "user deleted successfully"
        }else {
            throw new BadRequestException("This user didn't exist")
        }
    }
}