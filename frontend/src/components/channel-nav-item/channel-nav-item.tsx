import { NavLink } from 'react-router-dom'
import { FaUserPlus, FaCog, FaHashtag, FaVolumeUp } from 'react-icons/fa'
import './channel-nav-item.scss'

import { ChannelType } from '@src/models/channel-type'
import { makeBemRoot } from '@src/helpers'

type Props = {
	channelName: string,
	to: string,
	type: ChannelType,
}

const bem = makeBemRoot('channel-nav-item')

function getChannelIcon(type: ChannelType) {
	const iconClass: string = bem('icon')
	switch (type) {
		case ChannelType.Text:
			return <span className={iconClass} aria-label='text channel'><FaHashtag /></span>
		case ChannelType.Voice:
			return <span className={iconClass} aria-label='voice channel'><FaVolumeUp /></span>
		default:
			// TODO how to handle this case
			return <span className={iconClass} ><FaHashtag /></span>
	}
}

// TODO try to fix name alignment with icons
export function ChannelNavItem({ channelName, to, type }: Props) {
	return <NavLink to={to} className={bem()}>
		{getChannelIcon(type)}
		<span className={bem('name')}>{ channelName }</span>
		<div className={bem('right')}>
			<button aria-label='create channel invite'><FaUserPlus /></button>
			<button aria-label='edit channel settings'><FaCog /></button>
		</div>
	</NavLink>
}
