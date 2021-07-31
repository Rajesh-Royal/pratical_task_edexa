import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserProfileCreateMutationService } from './service/userProfile-create.service';
import { UserProfileDeleteMutationService } from './service/userProfile-delete-mutation.service';
import { UserProfileReadQueryService } from './service/userProfile-read-query.service';
import { UserProfileUpdateMutationService } from './service/userProfile-update-mutation.service';
import { UserProfileRepositoryService } from './userProfile-repository.service';
import { UserProfileResolver } from './userProfile.resolver';
import { UserProfileModuleSchema } from './userProfile.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'UserProfileType',
        schema: UserProfileModuleSchema,
        collection: "user-profile"
      },
    ]),
  ],
  providers: [
    UserProfileCreateMutationService,
    UserProfileRepositoryService,
    UserProfileReadQueryService,
    UserProfileResolver,
    UserProfileDeleteMutationService,
    UserProfileUpdateMutationService
  ],
  exports: [
    MongooseModule,
    UserProfileRepositoryService
  ]
})
export class UserProfileModule {}
