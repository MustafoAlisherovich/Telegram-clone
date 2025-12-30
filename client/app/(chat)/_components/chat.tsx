import { messageSchema } from '@/lib/validation'
import { FC } from 'react'
import { UseFormReturn } from 'react-hook-form'
import z from 'zod'

interface Props {
	onSendMessage: (values: z.infer<typeof messageSchema>) => void
	messageForm: UseFormReturn<z.infer<typeof messageSchema>>
}

const Chat: FC<Props> = ({ onSendMessage, messageForm }) => {
	return (
		<div className='flex flex-col justify-end z-40 min-h-[92vh] '>
			{/* Loading */}
			{/* <ChatLoading /> */}
			{/* Messages */}
			{/* <MessageCard isReceived /> */}

			{/* Start conversation */}
			{/* 	<div className='w-full h-[88vh] flex items-center justify-center'>
				<div
					className='text-[100px] cursor-pointer'
					onClick={() => onSendMessage({ text: '👋' })}
				>
					👋
				</div>
			</div> */}

			{/* Message input */}
			{/* <Form {...messageForm}>
				<form
					onSubmit={messageForm.handleSubmit(onSendMessage)}
					className='w-full flex relative'
				>
					<Button size={'icon'} type='button' variant={'secondary'}>
						<Paperclip />
					</Button>
					<FormField
						control={messageForm.control}
						name='text'
						render={({ field }) => (
							<FormItem className='w-full'>
								<FormControl>
									<Input
										placeholder='Type a message...'
										{...field}
										className='bg-secondary border-1-muted-foreground border-r border-r-muted-foreground h-9 sidebar-custom-scrollbar'
										value={field.value}
										onBlur={() => field.onBlur()}
										onChange={e => field.onChange(e.target.value)}
									/>
								</FormControl>
							</FormItem>
						)}
					/>
					<Button size={'icon'} type='button' variant={'secondary'}>
						<Smile />
					</Button>
					<Button type='submit' size={'icon'}>
						<Send />
					</Button>
				</form>
			</Form> */}
		</div>
	)
}

export default Chat
