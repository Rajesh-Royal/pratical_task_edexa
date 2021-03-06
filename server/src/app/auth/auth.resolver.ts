import { UseGuards, ValidationPipe } from "@nestjs/common";
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { AuthModuleType } from "../shared/authModule.type";
import { GraphQLResolverResult } from "../shared/graphQL-Resolver-Result.type";
import { AuthRepositoryService } from "./auth-repository-service";
import { UserLoginDto } from "./dto/user-login.dto";
import { UserRegisterDto } from "./dto/user-register.dto";
import { GqlAuthGuard } from "./guards/auth.guard";
import { RegisterNewUserMutationModel } from "./service/register-new-user-mutation.model";
import { RegisterNewUserMutationService } from "./service/register-new-user.mutation.service";
import { UserLoginMutationModel } from "./service/user-login-mutation.model";
import { UserLoginMutationService } from "./service/user-login-mutation.service";

@Resolver()
export class AuthResolver {
    constructor(
        private readonly registerNewUserMutationService: RegisterNewUserMutationService,
        private readonly userLoginMutationService: UserLoginMutationService,
        private readonly authRepositoryService: AuthRepositoryService,
    ){}

    @Mutation(() => UserRegisterDto)
    public RegisterUser(@Args(ValidationPipe) arguments_: RegisterNewUserMutationModel): GraphQLResolverResult<AuthModuleType> {
        const operation = new RegisterNewUserMutationModel(arguments_);

        return this.registerNewUserMutationService.serve(operation).then(data => {
            return data;
        });
    }

    @Mutation(() => UserLoginDto)
    public LoginUser(@Args() arguments_: UserLoginMutationModel): GraphQLResolverResult<AuthModuleType> {
        const operation = new UserLoginMutationModel(arguments_);

        return this.userLoginMutationService.serve(operation).then(data => {
            return data;
        })
    }

    // this dummy enpoint is just to check if user token is valid or not
    @UseGuards(GqlAuthGuard)
    @Mutation(() => Boolean)
    public async isUserLogin(@Args('userId') userId: string): Promise<GraphQLResolverResult<boolean>> {
        return await this.authRepositoryService.fineOne(userId).then(data => true);
    }

    @Query(() => String)
    sayHello(): string {
      return 'Hello World!';
    }

}