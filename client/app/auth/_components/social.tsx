import { Button } from '@/components/ui/button'
import { FaGithub, FaGoogle } from 'react-icons/fa'

const Social = () => {
	return (
		<div className='mt-4 grid w-full grid-cols-2 gap-2'>
			<Button variant={'outline'} className='shadow-none'>
				<span>Sign up with google</span>
				<FaGoogle />
			</Button>
			<Button variant={'secondary'} className='shadow-none'>
				<span>Sign up with github</span>
				<FaGithub />
			</Button>
		</div>
	)
}

export default Social
