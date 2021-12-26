import { scryptSync } from 'crypto'

// TODO move to config json
const salt = 'dev salt'
const keylen = 64

export function hash(value: string): string {
	return scryptSync(value, salt, keylen).toString()
}
