import { Miriam_Libre, Libre_Franklin, Poly } from 'next/font/google';

export const miriam = Miriam_Libre({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '700']
})

export const libreFranklin = Libre_Franklin({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600', '700']
})

export const poly = Poly({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400']
})