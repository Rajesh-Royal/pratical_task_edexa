import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { UserProfileType } from "../shared/employee.type";
import { UserProfileCreateMutationModel } from "./service/userProfile-create.mutation.model";
import { UserProfileDeleteMutationModel } from "./service/userProfile-delete.mutation.model";
import { UserProfileReadQueryModel } from "./service/userProfile-read.query.model";
import { UserProfileUpdateMutationModel } from "./service/userProfile-update.mutation.model";

@Injectable()
export class UserProfileRepositoryService {

    constructor(
        @InjectModel("UserProfileType") private readonly userProfileModel: Model<UserProfileCreateMutationModel>
    ){}

    public createUserProfile(operation: UserProfileCreateMutationModel): Promise<UserProfileType> {
        return new this.userProfileModel({
            ...(operation.name !== undefined && { name: operation.name }),
            ...(operation.age !== undefined && { age: operation.age }),
            ...(operation.address !== undefined && { address: operation.address }),
            ...(operation.profilePic !== undefined && { profilePic: operation.profilePic }),
        }).save();
    }

    public readUserProfile(operation: UserProfileReadQueryModel): Promise<UserProfileType> {
        return this.userProfileModel.findOne({
            _id: operation.userId
        }).exec();
    }

    public readUserProfiles(): Promise<UserProfileType[]> {
        return this.userProfileModel.find({}).exec();
    }

    public deleteUserProfile(operation: UserProfileDeleteMutationModel) {
        return this.userProfileModel.deleteOne({
            _id: operation.userId
        })
    }

    public updateUserProfile(operation: UserProfileUpdateMutationModel) {
        return this.userProfileModel.updateOne(
        {
            _id: operation._id
        },
        {
            ...(operation.name !== undefined && { name: operation.name }),
            ...(operation.age !== undefined && { age: operation.age }),
            ...(operation.address !== undefined && { address: operation.address }),
            ...(operation.profilePic !== undefined && { profilePic: operation.profilePic }),
        })
    }
}