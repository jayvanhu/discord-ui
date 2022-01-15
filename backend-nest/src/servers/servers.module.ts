import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ServerEntity } from 'src/data/server.entity'
import { ServersResolver } from './servers.resolver'
import { ServersService } from './servers.service'

@Module({
	imports: [
		TypeOrmModule.forFeature([ServerEntity]),
	],
	providers: [ServersService, ServersResolver],
})
export class ServersModule {}
