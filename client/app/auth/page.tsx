import { FaTelegram } from 'react-icons/fa'
import Social from './_components/social'
import StateAuth from './_components/state'

const Page = () => {
	return (
		<div className='container w-full max-w-md h-screen flex justify-center items-center flex-col space-y-4'>
			<FaTelegram size={120} className='text-blue-500' />
			<div>
				<h1 className='text-4xl font-bold'>Telegram</h1>
			</div>

			<StateAuth />
			<Social />
		</div>
	)
}

export default Page
