import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover'
import { messageSchema } from '@/lib/validation'
import EmojiPicker, { Theme } from 'emoji-picker-react'
import { Paperclip, Send, Smile } from 'lucide-react'
import { useTheme } from 'next-themes'
import { FC, useRef } from 'react'
import { UseFormReturn } from 'react-hook-form'
import z from 'zod'

interface Props {
	onSendMessage: (values: z.infer<typeof messageSchema>) => void
	messageForm: UseFormReturn<z.infer<typeof messageSchema>>
}

const Chat: FC<Props> = ({ onSendMessage, messageForm }) => {
	const { resolvedTheme } = useTheme()
	const inputRef = useRef<HTMLInputElement | null>(null)

	const handleEmojiSelect = (emoji: string) => {
		const input = inputRef.current
		if (!input) return

		const text = messageForm.getValues('text')
		const start = input.selectionStart || 0
		const end = input.selectionEnd || 0

		const newText = text.slice(0, start) + emoji + text.slice(end)
		messageForm.setValue('text', newText)

		setTimeout(() => {
			input.setSelectionRange(start + emoji.length, start + emoji.length)
		}, 0)
	}

	return (
		<div className='chat-surface z-40 flex min-h-[calc(100vh-4rem)] flex-col justify-end'>
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
			<Form {...messageForm}>
				<form
					onSubmit={messageForm.handleSubmit(onSendMessage)}
					className='sticky bottom-0 flex w-full items-center gap-2 border-t border-border bg-background/90 p-3 shadow-[0_-8px_24px_rgba(15,23,42,0.06)] backdrop-blur'
				>
					<Button
						size={'icon'}
						type='button'
						variant={'secondary'}
						className='shrink-0 shadow-none'
					>
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
										className='h-11 rounded-lg border-border bg-secondary/80 px-4 shadow-none'
										value={field.value}
										onBlur={() => field.onBlur()}
										onChange={e => field.onChange(e.target.value)}
										ref={inputRef}
									/>
								</FormControl>
							</FormItem>
						)}
					/>
					<Popover>
						<PopoverTrigger asChild>
							<Button
								size={'icon'}
								type='button'
								variant={'secondary'}
								className='shrink-0 shadow-none'
							>
								<Smile />
							</Button>
						</PopoverTrigger>
						<PopoverContent className='absolute right-3 bottom-0 rounded-lg border-none p-0 shadow-xl'>
							<EmojiPicker
								theme={resolvedTheme === 'dark' ? Theme.DARK : Theme.LIGHT}
								onEmojiClick={emoji => {
									handleEmojiSelect(emoji.emoji)
								}}
							/>
						</PopoverContent>
					</Popover>

					<Button type='submit' size={'icon'} className='shrink-0 shadow-none'>
						<Send />
					</Button>
				</form>
			</Form>
		</div>
	)
}

export default Chat
