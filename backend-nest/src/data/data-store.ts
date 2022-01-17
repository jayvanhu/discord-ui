import { Server } from 'src/servers/models'
import { User } from 'src/users/models/user.model'

export function makeDataStore<T>(name: string) {
	return {
		store: new Map<number, T>(),
		token: `${name}StoreToken`,
	}
}

export type UserData = User & {
	servers: Set<number>
}

export type ServerData = Server & {
	users: Set<number>
}

export type ChannelData = {
	messages: Set<number>
}

///
const UserDataStore = makeDataStore<UserData>('user')

// export const userStore = new Map<number, UserData>()
// export type UserStore = typeof userStore

export const userStore = UserDataStore.store
export const UserStoreToken = UserDataStore.token
export type UserStore = typeof userStore
///

export const serverStore = new Map<number, ServerData>()
export type ServerStore = typeof serverStore
export const ServerStoreToken = 'serverStore'
