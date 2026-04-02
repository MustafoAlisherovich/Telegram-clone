'use client'

import { useCurrentContact } from '@/hooks/use-current'
import { emailSchema, messageSchema } from '@/lib/validation'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import z from 'zod'
import AddContact from './_components/add-contact'
import Chat from './_components/chat'
import ContactList from './_components/contact-list'
import TopChat from './_components/top-chat'

const HomePage = () => {
	const { currentContact } = useCurrentContact()
	const router = useRouter()

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
			image: '',
		},
	})

	useEffect(() => {
		router.replace('/')
	}, [])

	const onCreateContact = (values: z.infer<typeof emailSchema>) => {
		// API call to create contact
		console.log(values)
	}

	const onSendMessage = (values: z.infer<typeof messageSchema>) => {
		// API call to send message
		console.log(values)
	}

	return (
		<>
			{/* Sidebar */}
			<div className='w-80 h-screen border-r fixed inset-0 z-50'>
				{/* Loading */}
				{/* <div className='w-full h-[95vh] flex justify-center items-center'>
					<Loader2 size={50} className='animate-spin' />
				</div> */}

				{/* Contact list */}
				<ContactList contacts={contacts} />
			</div>
			{/* Chat area */}
			<div className='pl-80 w-full'>
				{/* Add contact */}
				{!currentContact?._id && (
					<AddContact
						contactForm={contactForm}
						onCreateContact={onCreateContact}
					/>
				)}

				{/* Chat */}
				{currentContact?._id && (
					<div className='w-full relative'>
						{/*Top Chat  */}
						<TopChat />
						{/* Chat messages */}
						<Chat messageForm={messageForm} onSendMessage={onSendMessage} />
					</div>
				)}
			</div>
		</>
	)
}

const contacts = [
	{
		email: 'john@gmail.com',
		_id: '1',
		avatar: 'https://github.com/shadcn.png',
		firstName: 'John',
		lastName: 'Doe',
		bio: 'Hello, I am John.',
	},
	{ email: 'ali@gmail.com', _id: '2' },
	{ email: 'kera@gmail.com', _id: '3' },
	{ email: 'leyla@gmail.com', _id: '4' },
]

export default HomePage
