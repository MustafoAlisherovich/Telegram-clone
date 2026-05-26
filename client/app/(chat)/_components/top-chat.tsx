import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/sheet'
import { useCurrentContact } from '@/hooks/use-current'
import { Settings2 } from 'lucide-react'
import Image from 'next/image'

const TopChat = () => {
	const { currentContact } = useCurrentContact()

	return (
		<div className='sticky top-0 z-50 flex min-h-16 w-full items-center justify-between border-b border-border bg-background/90 px-4 py-3 shadow-sm backdrop-blur'>
			<div className='flex min-w-0 items-center'>
				<Avatar className='z-40 size-11 ring-2 ring-secondary'>
					<AvatarImage
						src={currentContact?.avatar}
						alt={currentContact?.email}
						className='object-cover'
					/>
					<AvatarFallback className='uppercase'>
						{currentContact?.email[0]}
					</AvatarFallback>
				</Avatar>
				<div className='ml-3 min-w-0'>
					<h2 className='truncate text-sm font-semibold'>
						{currentContact?.email}
					</h2>
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
						<span className='text-green-500'>Online</span>
					</p> */}
					{/* Offline */}
					<p className='flex items-center gap-1.5 text-xs text-muted-foreground'>
						<span className='size-1.5 rounded-full bg-muted-foreground' />
						Last seen recently
					</p>
				</div>
			</div>

			<Sheet>
				<SheetTrigger asChild>
					<Button
						size={'icon'}
						variant={'secondary'}
						className='shrink-0 shadow-none'
					>
						<Settings2 />
					</Button>
				</SheetTrigger>
				<SheetContent className='border-border'>
					<SheetHeader>
						<SheetTitle />
					</SheetHeader>
					<div className='relative mx-auto h-36 w-36'>
						<Avatar className='h-full w-full rounded-full ring-4 ring-secondary'>
							<AvatarImage
								src={currentContact?.avatar}
								alt={currentContact?.email}
								className='object-cover'
							/>
							<AvatarFallback className='text-6xl uppercase'>
								{currentContact?.email[0]}
							</AvatarFallback>
						</Avatar>
					</div>

					<Separator className='my-2' />

					<h1 className='break-words text-center text-xl font-semibold capitalize'>
						{currentContact?.email}
					</h1>

					<div className='ml-4 flex flex-col space-y-1'>
						{currentContact?.firstName && (
							<div className='mt-4 flex items-center gap-1'>
								<p className='font-medium'>First Name: </p>
								<p>{currentContact?.firstName}</p>
							</div>
						)}
						{currentContact?.lastName && (
							<div className='mt-4 flex items-center gap-1'>
								<p className='font-medium'>Last Name: </p>
								<p>{currentContact?.lastName}</p>
							</div>
						)}
						{currentContact?.bio && (
							<div className='mt-4 flex items-center gap-1'>
								<p className='font-medium'>About: </p>
								<p className='text-muted-foreground'>{currentContact?.bio}</p>
							</div>
						)}

						<Separator className='my-2' />

						<h2 className='text-xl font-semibold'>Image</h2>
						<div className='flex flex-col space-y-2'>
							<div className='relative h-36 w-full overflow-hidden rounded-lg'>
								<Image
									src={'https://github.com/shadcn.png'}
									alt='Profile Image'
									fill
									className='object-cover'
								/>
							</div>
						</div>
					</div>
				</SheetContent>
			</Sheet>
		</div>
	)
}

export default TopChat
