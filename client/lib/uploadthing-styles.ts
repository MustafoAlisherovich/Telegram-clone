/** Matches shadcn `Button` icon + secondary; works with UploadThing progress `after:` bar */
export const utChatAttachmentAppearance = {
	container:
		'w-auto flex-col gap-0 p-0 [&_[data-ut-element=allowed-content]]:hidden',
	button:
		'group relative flex size-9 shrink-0 cursor-pointer items-center justify-center overflow-hidden rounded-md border border-transparent bg-secondary text-secondary-foreground shadow-xs transition-all outline-none hover:bg-secondary/80 focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none data-[state=disabled]:cursor-not-allowed data-[state=disabled]:opacity-50 data-[state=readying]:cursor-not-allowed data-[state=readying]:opacity-60 data-[state=ready]:bg-secondary data-[state=uploading]:bg-secondary data-[state=disabled]:bg-secondary after:absolute after:left-0 after:z-0 after:h-full after:w-[var(--progress-width)] after:rounded-md after:bg-primary/25 after:transition-[width] after:duration-300 after:content-[""]',
	allowedContent: 'hidden',
} as const

export const utAvatarFabAppearance = {
	container:
		'absolute right-0 bottom-0 z-10 w-auto flex-col gap-0 p-0 [&_[data-ut-element=allowed-content]]:hidden',
	button:
		'group relative flex size-10 shrink-0 cursor-pointer items-center justify-center overflow-hidden rounded-full border border-background bg-primary text-primary-foreground shadow-md ring-2 ring-background transition-all outline-none hover:bg-primary/90 focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none data-[state=disabled]:opacity-50 data-[state=readying]:opacity-70 data-[state=ready]:bg-primary data-[state=uploading]:bg-primary after:absolute after:left-0 after:z-0 after:h-full after:w-[var(--progress-width)] after:rounded-full after:bg-primary-foreground/20 after:transition-[width] after:duration-300 after:content-[""]',
	allowedContent: 'hidden',
} as const
