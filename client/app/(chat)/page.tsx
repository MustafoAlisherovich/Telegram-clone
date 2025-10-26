import ContactList from './_components/contact-list'

const HomePage = () => {
	return (
		<div className='w-80 h-screen border-r fixed inset-0 z-50'>
			{/* <div className='w-full h-[95vh] flex justify-center items-center'>
				<Loader2 size={50} className='animate-spin' />
			</div> */}
			{/* Contact list */}
			<ContactList contacts={contacts} />
		</div>
	)
}

const contacts = [
	{ email: 'john@gmail.com', _id: '1' },
	{ email: 'ali@gmail.com', _id: '2' },
	{ email: 'kera@gmail.com', _id: '3' },
	{ email: 'leyla@gmail.com', _id: '4' },
]

export default HomePage
