import { ChannelNavItem } from '@components/channel-nav-item/channel-nav-item'
import { makeBemRoot } from '@src/helpers'
import { ChannelType } from '@src/models/channel-type'
import './channel-nav.scss'

let channel = {
	channelName: 'main-channel',
	to: 'asd',
	type: ChannelType.Text,
}

const bem = makeBemRoot('channel-nav')

export function ChannelNav() {
	return <nav className={bem()} aria-label='channel navigation'>
		<header className={bem('header')}>
			<h1>Server Name</h1>
		</header>
		<ChannelNavItem {...channel} />
		<footer className={bem('footer')}></footer>
	</nav>
}
