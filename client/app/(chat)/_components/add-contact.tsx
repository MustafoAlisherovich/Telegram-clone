import { Button } from '@/components/ui/button'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useLoading } from '@/hooks/use-loading'
import { emailSchema } from '@/lib/validation'
import { FC } from 'react'
import { UseFormReturn } from 'react-hook-form'
import { FaTelegram } from 'react-icons/fa'
import z from 'zod'

interface Props {
	contactForm: UseFormReturn<z.infer<typeof emailSchema>>
	onCreateContact: (values: z.infer<typeof emailSchema>) => void
}

const AddContact: FC<Props> = ({ contactForm, onCreateContact }) => {
	const { isCreating } = useLoading()

	return (
		<div className='chat-surface relative z-40 flex h-full min-h-0 w-full overflow-y-auto'>
			<div className='z-50 flex min-h-full w-full items-center justify-center px-4 py-6 sm:px-6'>
				<div className='w-full max-w-md rounded-lg border border-border bg-card/90 p-5 shadow-xl backdrop-blur sm:p-8'>
					<div className='mb-6 flex flex-col items-center gap-4 text-center'>
						<div className='flex size-20 items-center justify-center rounded-full bg-primary/10 text-primary ring-8 ring-primary/5 sm:size-24'>
							<FaTelegram className='size-12 sm:size-14' />
						</div>
						<div className='space-y-2'>
							<h1 className='text-xl font-bold sm:text-2xl'>
								Add contacts to start chatting
							</h1>
							<p className='text-sm leading-6 text-muted-foreground'>
								Find someone by email and open a conversation.
							</p>
						</div>
					</div>
					<Form {...contactForm}>
						<form
							onSubmit={contactForm.handleSubmit(onCreateContact)}
							className='w-full space-y-3'
						>
							<FormField
								control={contactForm.control}
								name='email'
								render={({ field }) => (
									<FormItem>
										<Label>Email</Label>
										<FormControl>
											<Input
												placeholder='info@mustafoalisherovich.ru'
												className='h-11 bg-secondary/80 shadow-none'
												{...field}
												disabled={isCreating}
											/>
										</FormControl>
										<FormMessage className='text-xs text-red-500' />
									</FormItem>
								)}
							/>
							<Button
								type='submit'
								className='w-full shadow-none'
								size={'lg'}
								disabled={isCreating}
							>
								Submit
							</Button>
						</form>
					</Form>
				</div>
			</div>
		</div>
	)
}

export default AddContact
