'use client'

import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <h2 className="mb-4 text-2xl font-bold text-cupertino-50">Something went wrong</h2>
      <button
        onClick={() => reset()}
        className="glass-button text-cupertino-50"
      >
        Try again
      </button>
    </div>
  )
} 