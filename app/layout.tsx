import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Mathéo | Engineering Student',
  description: 'Portfolio of Mathéo, an engineering student passionate about technology and innovation.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-cupertino-600 text-cupertino-50" suppressHydrationWarning>
        {children}
      </body>
    </html>
  )
} 