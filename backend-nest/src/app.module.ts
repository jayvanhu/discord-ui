import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { join } from 'path'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { UsersController } from './users/users.controller'
import { UsersResolver } from './users/users.resolver'
import { UsersService } from './users/users.service'

@Module({
	imports: [
		GraphQLModule.forRoot({
			autoSchemaFile: true,
			// autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
			debug: true,
			playground: true,
		}),
	],
	controllers: [AppController, UsersController],
	providers: [AppService, UsersService, UsersResolver],
})
export class AppModule {}
