import { SidenavNotification } from '@src/models/sidenav.model';

export interface ISidenavService {
	getNotifications(): SidenavNotification[]

	/**
	 * Marks a notification as read and returns a new array of notifications with the read one removed
	 * @param notif notification to be marked as read
	 */
	markNotificationAsRead(notif: SidenavNotification): SidenavNotification[]

	subscribeToNotifications(handler: (newNotif: SidenavNotification) => void): void

	unsubscribeToNotifications(): void

}

export class MockSidenavService implements ISidenavService {
	private handler: (newNotif: SidenavNotification) => void = () => {}

	constructor(private notifications: SidenavNotification[] = []) { }

	getNotifications(): SidenavNotification[] {
		return this.notifications
	}

	markNotificationAsRead(toMark: SidenavNotification): SidenavNotification[] {
		this.notifications = this.notifications.filter(notif => notif.id !== toMark.id)
		return this.notifications
	}

	// TODO should the handler process an array of new notifications?
	subscribeToNotifications(handler: (newNotif: SidenavNotification) => void) {
		this.handler = handler
	}

	unsubscribeToNotifications() {
		//
	}

	pushNotification(newNotif: SidenavNotification) {
		this.handler(newNotif)
	}

	/**
	 * Sets an interval that periodically sends notifications.
	 * Called by Sidenav's parent (App.tsx).
	 * Probably don't need to worry about unsusbcribing since Sidenav.tsx shouldn't unmount.
	 */
	startNotifications(msInterval?: number) {
		let id = 0
		setInterval(() => {
			id++
			this.pushNotification({
				id,
				name: 'todo',
			})
		}, msInterval)
	}

}
