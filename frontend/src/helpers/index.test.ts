import { className, makeBemRoot } from '.';

describe('BEM', () => {
	const bem = makeBemRoot('root')

	it('creates root class', () => {
		expect(bem()).toBe('root')
	})

	it('adds child element', () => {
		expect(bem('child')).toBe('root__child')
	})

})

describe('className', () => {

	it('makes correct class string', () => {
		const expected = 'in'
		const classes = {
			in: true,
			out: false,
		}
		const actual = className(classes)

		expect(actual).toBe(expected)
	})

})
