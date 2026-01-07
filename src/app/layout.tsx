import type { Metadata } from "next";
import "./globals.css";
import { Libre_Franklin } from 'next/font/google'
import '@rainbow-me/rainbowkit/styles.css'
import { Providers } from './providers'
import { SpeedInsights } from '@vercel/speed-insights/next'

const libreFranklin = Libre_Franklin({
  subsets: ['latin'],
  display: 'swap',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900']
})

export const metadata: Metadata = {
  title: "Kernel Community",
  description: "Cultivating a greater web, together. Applications open.",
  openGraph: {
    title: 'Kernel Community',
    description: 'Cultivating a greater web, together. Applications open.',
    url: 'https://kernel.community',
    siteName: 'Kernel Community',
    images: [
      {
        url: '/cover.png', // Must be an absolute URL
        width: 1800,
        height: 1600,
      }
    ],
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body
        className={`${libreFranklin.className} antialiased`}
      >
        <Providers>
          {children}
        </Providers>
        <SpeedInsights />
      </body>
    </html>
  );
}
