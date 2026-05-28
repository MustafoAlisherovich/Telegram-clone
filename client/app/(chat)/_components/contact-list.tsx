'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Input } from '@/components/ui/input'
import { useAuth } from '@/hooks/use-auth'
import { useCurrentContact } from '@/hooks/use-current'
import { cn } from '@/lib/utils'
import { IUser } from '@/types'
import { useRouter } from 'next/navigation'
import { FC, useState } from 'react'
import Settings from './settings'

interface Props {
	contacts: IUser[]
}

const ContactList: FC<Props> = ({ contacts }) => {
	const [query, setQuery] = useState('')

	const { onlineUsers } = useAuth()
	const router = useRouter()
	const { setCurrentContact, currentContact } = useCurrentContact()

	const filteredContacts = contacts.filter(contact =>
		contact.email.toLowerCase().includes(query.toLowerCase()),
	)

	const renderContact = (contact: IUser) => {
		const onChat = () => {
			if (currentContact?._id === contact._id) return
			setCurrentContact(contact)
			router.push(`/?chat=${contact._id}`)
		}

		return (
			<button
				type='button'
				className={cn(
					'group mx-2 flex w-[calc(100%-1rem)] cursor-pointer items-center justify-between rounded-lg border border-transparent p-3 text-left transition-all hover:border-sidebar-border hover:bg-sidebar-accent focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:outline-none',
					currentContact?._id === contact._id &&
						'border-primary/20 bg-primary/10 shadow-sm',
				)}
				onClick={onChat}
				aria-label={`Open chat with ${contact.email}`}
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
						{onlineUsers.some(user => user._id === contact._id) && (
							<div className='absolute right-0 bottom-0 z-50 size-3 rounded-full border-2 border-sidebar bg-emerald-500' />
						)}
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
			</button>
		)
	}

	return (
		<div className='flex h-full min-h-0 flex-col overflow-hidden'>
			{/* Top bar */}
			<div className='sticky top-0 z-10 border-b border-sidebar-border bg-sidebar/95 p-3 backdrop-blur'>
				<div className='mb-3 flex items-center justify-between gap-3'>
					<Settings />
					<div className='min-w-0 flex-1'>
						<h1 className='truncate text-base font-semibold sm:text-lg'>
							Chats
						</h1>
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
						onChange={e => setQuery(e.target.value)}
					/>
				</div>
			</div>

			{filteredContacts.length === 0 ? (
				<div className='flex flex-1 items-center justify-center px-8 text-center'>
					<p className='text-sm leading-6 text-muted-foreground'>
						Contact list is empty
					</p>
				</div>
			) : (
				<div className='min-h-0 flex-1 space-y-1 overflow-y-auto py-2'>
					{filteredContacts.map(contact => (
						<div key={contact._id}>{renderContact(contact)}</div>
					))}
				</div>
			)}

			{/* Contacts */}
		</div>
	)
}

export default ContactList
