'use client'

import { useAuth } from '@/hooks/use-auth'
import { useCurrentContact } from '@/hooks/use-current'
import { useLoading } from '@/hooks/use-loading'
import { axiosClient } from '@/http/axios'
import { generateToken } from '@/lib/generate-token'
import { cn } from '@/lib/utils'
import { emailSchema, messageSchema } from '@/lib/validation'
import { IError, IUser } from '@/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { io } from 'socket.io-client'
import { toast } from 'sonner'
import z from 'zod'
import AddContact from './_components/add-contact'
import Chat from './_components/chat'
import ContactList from './_components/contact-list'
import TopChat from './_components/top-chat'

const HomePage = () => {
	const [contacts, setContacts] = useState<IUser[]>([])

	const { setIsCreating, setIsLoading, isLoading } = useLoading()
	const { currentContact } = useCurrentContact()
	const router = useRouter()
	const { data: session } = useSession()
	const socket = useRef<ReturnType<typeof io> | null>(null)
	const { setOnlineUsers } = useAuth()

	const contactForm = useForm<z.infer<typeof emailSchema>>({
		resolver: zodResolver(emailSchema),
		defaultValues: {
			email: '',
		},
	})

	const messageForm = useForm<z.infer<typeof messageSchema>>({
		resolver: zodResolver(messageSchema),
		defaultValues: {
			text: '',
			image: undefined,
		},
	})

	const getContacts = useCallback(async () => {
		setIsLoading(true)
		const token = await generateToken(session?.currentUser?._id)
		try {
			const { data } = await axiosClient.get<{ contacts: IUser[] }>(
				'/api/user/contacts',
				{ headers: { Authorization: `Bearer ${token}` } },
			)
			setContacts(data.contacts)
		} catch {
			toast.error('Cannot fetch contacts')
		} finally {
			setIsLoading(false)
		}
	}, [session?.currentUser?._id, setIsLoading])

	useEffect(() => {
		router.replace('/')
		socket.current = io('ws://localhost:5000')
		return () => {
			socket.current?.disconnect()
		}
	}, [router])

	useEffect(() => {
		if (session?.currentUser?._id) {
			socket.current?.emit('addOnlineUser', session.currentUser)
			socket.current?.on(
				'getOnlineUsers',
				(data: { socketId: string; user: IUser }[]) => {
					setOnlineUsers(data.map(item => item.user))
				},
			)
			getContacts()
		}
	}, [getContacts, session?.currentUser])

	const onCreateContact = async (values: z.infer<typeof emailSchema>) => {
		setIsCreating(true)
		const token = await generateToken(session?.currentUser?._id)
		try {
			const { data } = await axiosClient.post<{ contact: IUser }>(
				'/api/user/contact',
				values,
				{ headers: { Authorization: `Bearer ${token}` } },
			)
			setContacts(prev => [...prev, data.contact])
			toast.success('Contact added successfully')
		} catch (error: unknown) {
			if ((error as IError).response?.data?.message) {
				return toast.error((error as IError).response.data.message)
			}
			return toast.error('Something went wrong')
		} finally {
			setIsCreating(false)
			contactForm.reset()
		}
	}

	const onSendMessage = (values: z.infer<typeof messageSchema>) => {
		// API call to send message
		console.log(values)
	}

	return (
		<div className='h-dvh overflow-hidden bg-background'>
			{/* Sidebar */}
			<div
				className={cn(
					'fixed inset-y-0 left-0 z-50 h-dvh w-full border-r border-sidebar-border bg-sidebar/95 shadow-sm backdrop-blur transition-transform duration-300 ease-out md:w-[380px] md:translate-x-0',
					currentContact?._id
						? '-translate-x-full md:translate-x-0'
						: 'translate-x-0',
				)}
			>
				{/* Loading */}
				{isLoading && (
					<div className='flex h-full w-full items-center justify-center'>
						<Loader2 size={42} className='animate-spin text-primary' />
					</div>
				)}

				{/* Contact list */}
				{!isLoading && <ContactList contacts={contacts} />}
			</div>
			{/* Chat area */}
			<div
				className={cn(
					'h-dvh min-w-0 overflow-hidden bg-background md:pl-[380px]',
					!currentContact?._id && 'hidden md:block',
				)}
			>
				{/* Add contact */}
				{!currentContact?._id && (
					<AddContact
						contactForm={contactForm}
						onCreateContact={onCreateContact}
					/>
				)}

				{/* Chat */}
				{currentContact?._id && (
					<div className='relative flex h-full w-full min-w-0 flex-col'>
						{/*Top Chat  */}
						<TopChat />
						{/* Chat messages */}
						<Chat messageForm={messageForm} onSendMessage={onSendMessage} />
					</div>
				)}
			</div>
		</div>
	)
}

export default HomePage
