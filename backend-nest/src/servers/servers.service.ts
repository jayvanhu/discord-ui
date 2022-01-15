import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { ServerEntity } from 'src/data/server.entity'
import { UserEntity } from 'src/data/user.entity'
import { DeleteResult, getConnection, Repository } from 'typeorm'

@Injectable()
export class ServersService {
	constructor(@InjectRepository(ServerEntity) private repo: Repository<ServerEntity>) { }

	findAllByUserId(userId: number): Promise<ServerEntity[]> {
		return this.repo.find({ where: { owner: userId }})
	}

	async createServer(userId: number, serverName: string): Promise<void> {
		const newServer = this.repo.create({
			name: serverName,
		})

		// TODO return saved instead of void?
		const saved = await this.repo.save(newServer)

		return getConnection()
			.createQueryBuilder()
			.relation(UserEntity, 'ownedServers')
			.of(userId)
			.add(saved)
	}

	deleteServer(serverId: number): Promise<DeleteResult> {
		return this.repo.delete(serverId)
	}

	/**
	 * Adds user-server many-many relationship entry
	 */
	addUserToServer(userId: number, serverId: number): void {
		getConnection()
			.createQueryBuilder()
			.relation(ServerEntity, 'members')
			.of(serverId)
			.add(userId)
	}

	/**
	 * Removes user-server many-many relationship entry
	 */
	removeUserFromServer(userId: number, serverId: number): void {
		getConnection()
			.createQueryBuilder()
			.relation(ServerEntity, 'members')
			.of(serverId)
			.remove(userId)
	}

}
