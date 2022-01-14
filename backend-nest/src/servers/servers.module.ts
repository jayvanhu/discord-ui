import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ServerEntity } from 'src/data/server.entity'

@Module({
	imports: [
		TypeOrmModule.forFeature([ServerEntity]),
	],
})
export class ServersModule {}
