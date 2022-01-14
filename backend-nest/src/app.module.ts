import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { join, resolve } from 'path'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthModule } from './auth/auth.module'
import { UsersModule } from './users/users.module'
import { ServersModule } from './servers/servers.module';

@Module({
	imports: [
		GraphQLModule.forRoot({
			autoSchemaFile: true,
			// autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
			debug: true,
			playground: true,
		}),
		TypeOrmModule.forRoot({
			type: 'better-sqlite3',
			synchronize: true,
			database: resolve(__dirname, 'data/db.sqlite3'),
			autoLoadEntities: true,
		}),
		UsersModule,
		AuthModule,
		ServersModule,
	],
	controllers: [AppController],
	providers: [
		AppService,
	],
})
export class AppModule { }
