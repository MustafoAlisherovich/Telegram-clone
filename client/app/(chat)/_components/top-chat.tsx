import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/sheet'
import { useCurrentContact } from '@/hooks/use-current'
import { Settings2 } from 'lucide-react'

const TopChat = () => {
	const { currentContact } = useCurrentContact()

	return (
		<div className='w-full flex items-center justify-between sticky top-0 z-50 h-[8vh] p-2 border-b bg-background'>
			<div className='flex items-center'>
				<Avatar className='z-40'>
					<AvatarImage
						src={currentContact?.avatar}
						alt={currentContact?.email}
						className='object-cover'
					/>
					<AvatarFallback className='uppercase'>
						{currentContact?.email[0]}
					</AvatarFallback>
				</Avatar>
				<div className='ml-2'>
					<h2 className='font-medium text-sm'>{currentContact?.email}</h2>
					{/* Is typing */}
					{/* <div className='text-xs flex items-center gap-1 text-muted-foreground'>
						<p className='text-secondary-foreground animate-pulse line-clamp-1'>
							Hello world
						</p>
						<div className='flex justify-center items-center gap-1'>
							<div className='w-1 h-1 bg-secondary-foreground rounded-full animate-bounce [animation-delay:-0.3s]'></div>
							<div className='w-1 h-1 bg-secondary-foreground rounded-full animate-bounce [animation-delay:-0.10s]'></div>
							<div className='w-1 h-1 bg-secondary-foreground rounded-full animate-bounce [animation-delay:-0.15s]'></div>
						</div>
					</div> */}
					{/* Online */}
					{/* <p className='text-xs'>
						<span className='text-green-500'>●</span> Online
					</p> */}
					{/* Offline */}
					<p className='text-xs'>
						<span className='text-muted-foreground'>●</span> Last seen recently
					</p>
				</div>
			</div>

			<Sheet>
				<SheetTrigger asChild>
					<Button size={'icon'} variant={'secondary'}>
						<Settings2 />
					</Button>
				</SheetTrigger>
				<SheetContent>
					<SheetHeader>
						<SheetTitle />
					</SheetHeader>
					<div className='mx-auto w-1/2 h-36 relative'>
						<Avatar>
							<AvatarImage
								src={currentContact?.avatar}
								alt={currentContact?.email}
							/>
						</Avatar>
					</div>
				</SheetContent>
			</Sheet>
		</div>
	)
}

export default TopChat
