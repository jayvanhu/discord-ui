
export function randomInt(num: number): number {
	return Math.floor(Math.random() * num)
}

export function className(classes: Record<string, any>): string {
	return Object.entries(classes)
		.filter(([_key, shouldUse]) => shouldUse)
		.map(([classname, _val]) => classname)
		.join(' ')
}

export function makeBemRoot(root: string) {
	return (child?: string): string => {
		if (child) {
			return `${root}__${child}`
		} else {
			return root
		}
	}
}
