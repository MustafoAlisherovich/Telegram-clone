'use client'

import { useCurrentContact } from '@/hooks/use-current'
import { emailSchema } from '@/lib/validation'
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

	useEffect(() => {
		router.replace('/')
	}, [])

	const onCreateContact = (values: z.infer<typeof emailSchema>) => {
		console.log(values)
	}

	return (
		<>
			<div className='w-80 h-screen border-r fixed inset-0 z-50'>
				{/* <div className='w-full h-[95vh] flex justify-center items-center'>
				<Loader2 size={50} className='animate-spin' />
			</div> */}
				{/* Contact list */}
				<ContactList contacts={contacts} />
			</div>

			<div className='pl-80 w-full'>
				{/* Add contact */}
				{!currentContact?._id && (
					<AddContact
						contactForm={contactForm}
						onCreateContact={onCreateContact}
					/>
				)}

				{/* Top chat */}
				<TopChat />

				{/* Chat */}
				{currentContact?._id && <Chat />}
			</div>
		</>
	)
}

const contacts = [
	{ email: 'john@gmail.com', _id: '1' },
	{ email: 'ali@gmail.com', _id: '2' },
	{ email: 'kera@gmail.com', _id: '3' },
	{ email: 'leyla@gmail.com', _id: '4' },
]

export default HomePage
