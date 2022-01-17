import { extension } from './extensions';

declare global {
	interface Set<T> {
		map<T, R>(set: Set<T>, func: (item: T, index?: number) => R): Array<R>
	}
}

export class SetExtensions {
	@extension(Set)
	static map<T, R>(set: Set<T>, func: (item: T, index?: number) => R): Array<R> {
		if (!set || set.size === 0) return
		let result = new Array(set.size)
		let index = 0
		set.forEach(item => {
			result[index] = func(item, index)
			index++
		})
		return result
	}

	@extension(Set)
	static foo() {
		//
	}
}

export function setMap<T, R>(set: Set<T>, func: (item: T, i?: number) => R): Array<R> {
	if (!set || set.size === 0) return
	let result = new Array(set.size)
	let index = 0
	set.forEach(item => {
		result[index] = func(item, index)
		index++
	})
	return result
}
