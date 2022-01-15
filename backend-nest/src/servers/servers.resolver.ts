import { UseGuards } from '@nestjs/common'
import { Args, Resolver, Query, Mutation } from '@nestjs/graphql'
import { CurrentUser, GqlAuthGuard } from 'src/auth/gql-jwt-auth.guard'
import { Server } from './models'
import { ServersService } from './servers.service'

@Resolver(of => Server)
export class ServersResolver {
	constructor(
		private serversService: ServersService,
	) {}

	@Query(returns => [Server])
	@UseGuards(GqlAuthGuard)
	servers(@CurrentUser() user: Express.User) {
		return this.serversService.findAllByUserId(user.id)
	}

	@Mutation(returns => Server, { nullable: true })
	@UseGuards(GqlAuthGuard)
	async createServer(@Args('name') serverName: string, @CurrentUser() user: Express.User) {
		return this.serversService.createServer(user.id, serverName)
	}

}
