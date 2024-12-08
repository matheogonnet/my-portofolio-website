import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Mathéo Gonnet',
  description: 'Welcome on my website! Here you can find more about me and my projects. \nMathéo Gonnet.',
  icons: {
    icon: [
      {
        url: '/favicon/favicon-16x16.png',
        sizes: '16x16',
        type: 'image/png',
      },
      {
        url: '/favicon/favicon-32x32.png',
        sizes: '32x32',
        type: 'image/png',
      },
      {
        url: '/favicon/favicon.ico',
        sizes: 'any',
      },
    ],
    apple: {
      url: '/favicon/apple-touch-icon.png',
      sizes: '180x180',
      type: 'image/png',
    },
  },
  manifest: '/favicon/site.webmanifest',
} 