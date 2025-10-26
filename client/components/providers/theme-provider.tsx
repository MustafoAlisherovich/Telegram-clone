'use client'

import { ThemeProvider as NextThemesProvider } from 'next-themes'
import * as React from 'react'

export function ThemeProvider({
	children,
	...props
}: React.ComponentProps<typeof NextThemesProvider>) {
	const [mount, setMount] = React.useState(false)

	React.useEffect(() => {
		setMount(true)
	}, [])

	return <NextThemesProvider {...props}>{mount && children}</NextThemesProvider>
}
