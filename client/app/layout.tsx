import QueryProvider from '@/components/providers/query-provider'
import SessionProvider from '@/components/providers/session.provider'
import { ThemeProvider } from '@/components/providers/theme-provider'
import { Toaster } from '@/components/ui/sonner'
import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import './globals.css'

const montserrat = Montserrat({
	variable: '--font-montserrat',
	subsets: ['latin'],
	weight: ['300', '400', '500', '600', '700'],
})

export const metadata: Metadata = {
	title: 'Telegram web',
	description: 'Telegram web application clone created by Mustafoalisherovich',
	icons: {
		icon: '/logo.svg',
	},
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<SessionProvider>
			<QueryProvider>
				<html lang='en' suppressHydrationWarning>
					<body
						className={`${montserrat.variable} antialiased`}
						suppressHydrationWarning
					>
						<ThemeProvider
							attribute='class'
							defaultTheme='system'
							enableSystem
							disableTransitionOnChange
						>
							<main>{children}</main>
							<Toaster />
						</ThemeProvider>
					</body>
				</html>
			</QueryProvider>
		</SessionProvider>
	)
}
