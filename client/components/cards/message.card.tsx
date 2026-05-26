import { cn } from '@/lib/utils'
import { FC } from 'react'

interface Props {
	isReceived?: boolean
}

const MessageCard: FC<Props> = ({ isReceived }) => {
	return (
		<div
			className={cn(
				'm-2.5 flex text-xs font-medium',
				isReceived ? 'justify-start' : 'justify-end',
			)}
		>
			<div
				className={cn(
					'relative inline max-w-full rounded-lg px-3 py-2 pr-12 shadow-sm',
					isReceived
						? 'bg-card text-card-foreground'
						: 'bg-primary text-primary-foreground',
				)}
			>
				<p className='text-sm'>Hello world</p>
				<span className='absolute right-2 bottom-1 text-xs opacity-60'>sent</span>
			</div>
		</div>
	)
}

export default MessageCard
