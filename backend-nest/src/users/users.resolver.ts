import { Args, Int, Resolver, Query } from "@nestjs/graphql";
import { User } from "./models/user.model";
import { UsersService } from "./users.service";

@Resolver(of => User)
export class UsersResolver {
	constructor(
		private usersService: UsersService,
	) {}

	@Query(returns => User)
	user(@Args('id', { type: () => Int }) id: number) {
		return this.usersService.findOneById(id)
	}

}
