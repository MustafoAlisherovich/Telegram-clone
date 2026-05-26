import { ModeToggle } from '@/components/shared/mode-toggle'
import { authOptions } from '@/lib/auth-options'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { FaTelegram } from 'react-icons/fa'
import Social from './_components/social'
import StateAuth from './_components/state'

const Page = async () => {
	const session = await getServerSession(authOptions)
	if (session) return redirect('/')
	return (
		<div className='chat-surface flex min-h-screen w-full items-center justify-center px-4'>
			<div className='w-full max-w-md rounded-lg border border-border bg-card/90 p-8 shadow-xl backdrop-blur'>
				<div className='mb-6 flex flex-col items-center space-y-4 text-center'>
					<div className='flex size-24 items-center justify-center rounded-full bg-primary/10 text-primary ring-8 ring-primary/5'>
						<FaTelegram size={58} />
					</div>
					<div className='flex items-center gap-2'>
						<h1 className='text-3xl font-bold'>Telegram</h1>
						<ModeToggle />
					</div>
				</div>

				<StateAuth />
				<Social />
			</div>
		</div>
	)
}

export default Page
