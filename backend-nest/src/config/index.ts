import { localConfig } from './local'

export type Config = {
	jwtSecret: string
	jwtExpiration: string
}

// TODO check what environment is to dynamically pick config
export const appConfig: Config = localConfig
