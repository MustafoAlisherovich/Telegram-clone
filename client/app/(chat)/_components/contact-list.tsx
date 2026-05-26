'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Input } from '@/components/ui/input'
import { useCurrentContact } from '@/hooks/use-current'
import { cn } from '@/lib/utils'
import { IUser } from '@/types'
import { useRouter } from 'next/navigation'
import { FC } from 'react'
import Settings from './settings'

interface Props {
	contacts: IUser[]
}

const ContactList: FC<Props> = ({ contacts }) => {
	const router = useRouter()
	const { setCurrentContact, currentContact } = useCurrentContact()

	const renderContact = (contact: IUser) => {
		const onChat = () => {
			if (currentContact?._id === contact._id) return
			setCurrentContact(contact)
			router.push(`/?chat=${contact._id}`)
		}

		return (
			<div
				className={cn(
					'group mx-2 flex cursor-pointer items-center justify-between rounded-lg border border-transparent p-3 transition-all hover:border-sidebar-border hover:bg-sidebar-accent',
					currentContact?._id === contact._id &&
						'border-primary/20 bg-primary/10 shadow-sm',
				)}
				onClick={onChat}
			>
				<div className='flex min-w-0 items-center gap-3'>
					<div className='relative'>
						<Avatar className='z-40 size-11 ring-2 ring-background'>
							<AvatarImage
								src={contact.avatar}
								alt={contact.email}
								className='object-cover'
							/>
							<AvatarFallback className='uppercase'>
								{contact.email[0]}
							</AvatarFallback>
						</Avatar>
						<div className='absolute right-0 bottom-0 z-50 size-3 rounded-full border-2 border-sidebar bg-emerald-500' />
					</div>
					<div className='min-w-0'>
						<h2 className='line-clamp-1 text-sm font-semibold capitalize'>
							{contact.email.split('@')[0]}
						</h2>
						<p className='text-xs line-clamp-1 text-muted-foreground'>
							No message yet
						</p>
					</div>
				</div>

				<div className='self-start pl-2'>
					<p className='text-[11px] font-medium text-muted-foreground'>19:20</p>
				</div>
			</div>
		)
	}

	return (
		<div className='flex h-full flex-col'>
			{/* Top bar */}
			<div className='sticky top-0 z-10 border-b border-sidebar-border bg-sidebar/95 p-3 backdrop-blur'>
				<div className='mb-3 flex items-center justify-between gap-3'>
					<Settings />
					<div className='min-w-0 flex-1'>
						<h1 className='truncate text-base font-semibold'>Chats</h1>
						<p className='text-xs text-muted-foreground'>
							{contacts.length} contacts
						</p>
					</div>
				</div>
				<div className='w-full'>
					<Input
						className='h-10 border-sidebar-border bg-background/80 shadow-none'
						type='text'
						placeholder='Search messages or people'
					/>
				</div>
			</div>

			{/* Contacts */}
			{contacts.length === 0 && (
				<div className='flex h-[80vh] w-full items-center justify-center px-8 text-center'>
					<p className='text-sm leading-6 text-muted-foreground'>
						Contact list is empty
					</p>
				</div>
			)}

			<div className='space-y-1 py-2'>
				{contacts.map(contact => (
					<div key={contact._id}>{renderContact(contact)}</div>
				))}
			</div>
		</div>
	)
}

export default ContactList
