import './globals.css'
import { metadata } from './metadata'
import { Suspense } from 'react'
import Loading from './loading'
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"

export { metadata }

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-cupertino-600 text-cupertino-50" suppressHydrationWarning>
        <Suspense fallback={<Loading />}>
          {children}
        </Suspense>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
} 