import { SidenavNotification } from '@src/models/sidenav.model'
import { MockSidenavService } from '@src/services/SidenavService'
import { act, render } from '@testing-library/react'
import { HashRouter as Router } from 'react-router-dom'
import { Sidenav } from './sidenav'

function makeServiceWithMessages() {
	const notifs: SidenavNotification[] = [
		{
			id: 1,
			name: '1'
		}, {
			id: 2,
			name: '2'
		}
	]
	return new MockSidenavService(notifs)
}

describe('Sidenav', () => {
	const newMessageLabel = 'new message'
	const servers = ['AB', 'CD']
	let service: MockSidenavService

	beforeEach(() => {
		service = new MockSidenavService();
	})

	let init = () => render(
		<Router>
			<Sidenav servers={servers} service={service} />
		</Router>
	)

	it('shows 0 new message icons when not given notifications', () => {
		let { queryAllByLabelText } = init()
		let messageNotifications = queryAllByLabelText(newMessageLabel)
		expect(messageNotifications.length).toBe(0)
	})

	it('shows 2 new message icons when rendered with new message', () => {
		service = makeServiceWithMessages()
		let { getAllByLabelText } = init()
		let messageNotifications = getAllByLabelText(newMessageLabel)
		expect(messageNotifications.length).toBe(2)
	})

	it('hides all new message icons when all new message icons are clicked', () => {
		service = makeServiceWithMessages()
		let { queryAllByLabelText } = init()

		let messageNotifications = queryAllByLabelText(newMessageLabel)
		act(() => {
			messageNotifications.forEach(notif => notif.click())
		})
		messageNotifications = queryAllByLabelText(newMessageLabel)

		expect(messageNotifications.length).toBe(0)
	})

	it('hides 1 new message icon on click given 2 conversation notification', () => {
		service = makeServiceWithMessages()
		let { queryAllByLabelText } = init()

		let messageNotifications = queryAllByLabelText(newMessageLabel)
		act(() => {
			messageNotifications[0].click()
		})
		messageNotifications = queryAllByLabelText(newMessageLabel)

		expect(messageNotifications.length).toBe(1)
	})

	it('receives new notification and displays it', () => {
		let { queryAllByLabelText } = init()

		let messageNotifications = queryAllByLabelText(newMessageLabel)
		expect(messageNotifications.length).toBe(0)

		act(() => {
			service.pushNotification({ id: 1, name: 'foo' })
		})

		messageNotifications = queryAllByLabelText(newMessageLabel)
		expect(messageNotifications.length).toBe(1)
	})

})
