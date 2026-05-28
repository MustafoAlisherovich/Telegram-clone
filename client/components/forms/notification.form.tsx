import useAudio from '@/hooks/use-audio'
import { axiosClient } from '@/http/axios'
import { SOUNDS } from '@/lib/constants'
import { generateToken } from '@/lib/generate-token'
import { cn, getSoundLabel } from '@/lib/utils'
import { useMutation } from '@tanstack/react-query'
import { ChevronDown, Ghost, PlayCircle } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { useState } from 'react'
import { toast } from 'sonner'
import { Button } from '../ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Separator } from '../ui/separator'
import { Switch } from '../ui/switch'

const NotificationForm = () => {
	const [isNotification, setIsNotification] = useState(false)
	const [isSounding, setIsSounding] = useState(false)

	const [selectedNotificationSound, setSelectedNotificationSound] = useState('')
	const [selectedSendingSound, setSelectedSendingSound] = useState('')

	const { data: session, update } = useSession()
	const { playSound } = useAudio()

	const { mutate, isPending } = useMutation({
		mutationFn: async (payload: IPayload) => {
			const token = await generateToken(session?.currentUser?._id)
			const { data } = await axiosClient.put('/api/user/profile', payload, {
				headers: { Authorization: `Bearer ${token}` },
			})
			return data
		},
		onSuccess: async () => {
			toast.success('Notification settings updated successfully')
			await update()
			setIsNotification(false)
			setIsSounding(false)
		},
	})

	return (
		<>
			<div className='relative flex items-center justify-between gap-3'>
				<div className='min-w-0 flex flex-col'>
					<p className='font-spaceGrotesk'>Notification Sound</p>
					<p className='font-spaceGrotesk truncate text-xs text-muted-foreground'>
						{getSoundLabel(session?.currentUser?.notificationSound)}
					</p>
				</div>

				<Popover open={isNotification} onOpenChange={setIsNotification}>
					<PopoverTrigger asChild>
						<Button size='sm'>
							Select <ChevronDown />
						</Button>
					</PopoverTrigger>

					<PopoverContent
						align='end'
						className='w-[min(20rem,calc(100vw-1rem))]'
					>
						<div className='flex flex-col space-y-1'>
							{SOUNDS.map(sound => (
								<div
									key={sound.value}
									className={cn(
										'flex cursor-pointer items-center justify-between bg-secondary hover:bg-primary',
										selectedNotificationSound === sound.value && 'bg-primary',
									)}
									onClick={() => {
										setSelectedNotificationSound(sound.value)
										playSound(sound.value)
									}}
								>
									<Button
										size='sm'
										className='cursor-pointer justify-start'
										variant='ghost'
									>
										{sound.label}
									</Button>

									{session?.currentUser?.notificationSound === sound.value ? (
										<Button size={'sm'}>
											<Ghost />
										</Button>
									) : (
										<Button
											size='icon'
											variant='ghost'
											onClick={e => {
												e.stopPropagation()
												playSound(sound.value)
											}}
										>
											<PlayCircle />
										</Button>
									)}
								</div>
							))}
						</div>

						<Button
							className='mt-2 w-full font-bold'
							onClick={() =>
								mutate({ notificatonSound: selectedNotificationSound })
							}
							disabled={isPending}
						>
							Submit
						</Button>
					</PopoverContent>
				</Popover>
			</div>

			<Separator className='my-3' />

			<div className='relative flex items-center justify-between gap-3'>
				<div className='min-w-0 flex flex-col'>
					<p className='font-spaceGrotesk'>Sending Sound</p>
					<p className='font-spaceGrotesk truncate text-xs text-muted-foreground'>
						{getSoundLabel(session?.currentUser?.sendingSound)}
					</p>
				</div>

				<Popover open={isSounding} onOpenChange={setIsSounding}>
					<PopoverTrigger asChild>
						<Button size='sm'>
							Select <ChevronDown />
						</Button>
					</PopoverTrigger>

					<PopoverContent
						align='end'
						className='w-[min(20rem,calc(100vw-1rem))]'
					>
						<div className='flex flex-col space-y-1'>
							{SOUNDS.map(sound => (
								<div
									key={sound.value}
									className={cn(
										'flex cursor-pointer items-center justify-between bg-secondary hover:bg-primary',
										selectedSendingSound === sound.value && 'bg-primary',
									)}
									onClick={() => {
										setSelectedSendingSound(sound.value)
										playSound(sound.value)
									}}
								>
									<Button size='sm' variant='ghost' className='justify-start'>
										{sound.label}
									</Button>
									{session?.currentUser?.sendingSound === sound.value ? (
										<Button size={'sm'}>
											<Ghost />
										</Button>
									) : (
										<Button
											size='icon'
											variant='ghost'
											onClick={e => {
												e.stopPropagation()
												playSound(sound.value)
											}}
										>
											<PlayCircle />
										</Button>
									)}
								</div>
							))}
						</div>

						<Button
							className='mt-2 w-full font-bold'
							onClick={() => mutate({ sendingSound: selectedSendingSound })}
							disabled={isPending}
						>
							Submit
						</Button>
					</PopoverContent>
				</Popover>
			</div>

			<Separator className='my-3' />

			<div className='relative flex items-center justify-between gap-3'>
				<div className='min-w-0 flex flex-col'>
					<p>Mode Mute</p>
					<p className='text-xs text-muted-foreground'>
						{!session?.currentUser?.muted ? 'Muted' : 'Unmuted'}
					</p>
				</div>
				<Switch
					checked={!session?.currentUser?.muted}
					onCheckedChange={() =>
						mutate({ muted: !session?.currentUser?.muted })
					}
					disabled={isPending}
				/>
			</div>
		</>
	)
}

export default NotificationForm

interface IPayload {
	notificatonSound?: string
	sendingSound?: string
	muted?: boolean
}
