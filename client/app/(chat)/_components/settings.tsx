import DangerZoneForm from '@/components/forms/danger.zone.form'
import EmailForm from '@/components/forms/email.form'
import InformationForm from '@/components/forms/information.form'
import NotificationForm from '@/components/forms/notification.form'
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover'
import { Separator } from '@/components/ui/separator'
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
} from '@/components/ui/sheet'
import { Switch } from '@/components/ui/switch'
import { axiosClient } from '@/http/axios'
import { generateToken } from '@/lib/generate-token'
import { UploadButton } from '@/lib/uploadthing'
import { AvatarImage } from '@radix-ui/react-avatar'
import { useMutation } from '@tanstack/react-query'
import {
	LogIn,
	Menu,
	Moon,
	Settings2,
	Sun,
	Upload,
	UserPlus,
	VolumeOff,
} from 'lucide-react'
import { signOut, useSession } from 'next-auth/react'
import { useTheme } from 'next-themes'
import { useState } from 'react'
import { toast } from 'sonner'

const Settings = () => {
	const [isProfileOpen, setIsProfileOpen] = useState(false)
	const { resolvedTheme, setTheme } = useTheme()
	const { data: session, update } = useSession()

	const { mutate, isPending } = useMutation({
		mutationFn: async (payload: IPayload) => {
			const token = await generateToken(session?.currentUser?._id)
			const { data } = await axiosClient.put('/api/user/profile', payload, {
				headers: { Authorization: `Bearer ${token}` },
			})
			return data
		},
		onSuccess: async () => {
			toast.success('Settings updated successfully')
			await update()
		},
	})

	return (
		<>
			<Popover>
				<PopoverTrigger asChild>
					<Button
						variant={'secondary'}
						size={'icon'}
						className='cursor-pointer border border-sidebar-border bg-background/80 shadow-none hover:bg-sidebar-accent'
					>
						<Menu />
					</Button>
				</PopoverTrigger>
				<PopoverContent className='w-80 overflow-hidden border-sidebar-border p-0 shadow-xl'>
					<h2 className='px-3 pt-3 text-xs font-medium text-muted-foreground'>
						Settings:{' '}
						<span className='text-foreground'>
							{session?.currentUser?.email}
						</span>
					</h2>
					<Separator className='my-2' />
					<div className='flex flex-col'>
						<div
							className='flex cursor-pointer items-center justify-between px-3 py-2.5 transition-colors hover:bg-secondary'
							onClick={() => setIsProfileOpen(true)}
						>
							<div className='flex items-center gap-1'>
								<Settings2 size={16} />
								<span className='text-sm'>Profile</span>
							</div>
						</div>

						<div
							className='flex cursor-pointer items-center justify-between px-3 py-2.5 transition-colors hover:bg-secondary'
							onClick={() => window.location.reload()}
						>
							<div className='flex items-center gap-1'>
								<UserPlus size={16} />
								<span className='text-sm'>Create contact</span>
							</div>
						</div>

						<div className='flex cursor-pointer items-center justify-between px-3 py-2.5 transition-colors hover:bg-secondary'>
							<div className='flex items-center gap-1'>
								<VolumeOff size={16} />
								<span className='text-sm'>Mute</span>
							</div>
							<Switch
								checked={!session?.currentUser?.muted}
								onCheckedChange={() =>
									mutate({ muted: !session?.currentUser?.muted })
								}
								disabled={isPending}
							/>
						</div>

						<div className='flex cursor-pointer items-center justify-between px-3 py-2.5 transition-colors hover:bg-secondary'>
							<div className='flex items-center gap-1'>
								{resolvedTheme === 'dark' ? (
									<Sun size={16} />
								) : (
									<Moon size={16} />
								)}
								<span className='text-sm'>
									{resolvedTheme === 'dark' ? 'Light Mode' : 'Dark Mode'}
								</span>
							</div>
							<Switch
								checked={resolvedTheme === 'dark' ? true : false}
								onCheckedChange={() =>
									setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
								}
							/>
						</div>

						<div
							className='flex cursor-pointer items-center justify-between bg-destructive px-3 py-2.5 text-white transition-colors hover:bg-destructive/90'
							onClick={() => signOut()}
						>
							<div className='flex items-center gap-1'>
								<LogIn size={16} />
								<span className='text-sm'>Logout</span>
							</div>
						</div>
					</div>
				</PopoverContent>
			</Popover>

			<Sheet open={isProfileOpen} onOpenChange={setIsProfileOpen}>
				<SheetContent side='left' className='w-80 border-sidebar-border'>
					<SheetHeader>
						<SheetTitle className='text-2xl'>My profile</SheetTitle>
						<SheetDescription>
							Settings up your profile will help you connect with friends and
							family easily.
						</SheetDescription>
					</SheetHeader>

					<Separator className='my-2' />

					<div className='mx-auto w-1/2 h-38 relative'>
						<Avatar className='h-full w-full ring-4 ring-secondary'>
							<AvatarImage
								src={session?.currentUser?.avatar}
								alt={session?.currentUser?.email}
								className='object-cover'
							/>
							<AvatarFallback className='text-6xl uppercase'>sb</AvatarFallback>
						</Avatar>
						<UploadButton
							endpoint='imageUploader'
							onClientUploadComplete={res => {
								mutate({ avatar: res[0].url })
							}}
							config={{ appendOnPaste: true, mode: 'auto' }}
							className='absolute right-0 bottom-0 shadow-lg'
							appearance={{
								allowedContent: { display: 'none' },
								button: { width: 40, height: 40, borderRadius: '100%' },
							}}
							content={{ button: <Upload size={16} /> }}
						/>
					</div>

					<Accordion type='single' collapsible className='mt-4'>
						<AccordionItem value='item-1'>
							<AccordionTrigger className='rounded-md bg-secondary px-3'>
								Basic information
							</AccordionTrigger>
							<AccordionContent className='px-2 mt-2'>
								<InformationForm />
							</AccordionContent>
						</AccordionItem>

						<AccordionItem value='item-2'>
							<AccordionTrigger className='rounded-md bg-secondary px-3'>
								Email
							</AccordionTrigger>
							<AccordionContent className='px-2 mt-2'>
								<EmailForm />
							</AccordionContent>
						</AccordionItem>

						<AccordionItem value='item-3'>
							<AccordionTrigger className='rounded-md bg-secondary px-3'>
								Notification
							</AccordionTrigger>
							<AccordionContent className='px-2 mt-2'>
								<NotificationForm />
							</AccordionContent>
						</AccordionItem>

						<AccordionItem value='item-4'>
							<AccordionTrigger className='rounded-md bg-secondary px-3'>
								Danger zone
							</AccordionTrigger>
							<AccordionContent className='px-2 mt-2'>
								<DangerZoneForm />
							</AccordionContent>
						</AccordionItem>
					</Accordion>
				</SheetContent>
			</Sheet>
		</>
	)
}

export default Settings

interface IPayload {
	muted?: boolean
	avatar?: string
}
