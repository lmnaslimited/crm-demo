import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { Oswald } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'


export const metadata: Metadata = {
  title: 'v0 App',
  description: 'Created with v0',
  generator: 'v0.app',
}
const oswald = Oswald({
  subsets: ['latin'],
})
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={oswald.className}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
