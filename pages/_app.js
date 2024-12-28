// need to create custom _app.js (this file does not exist by default)
// because we want to import the global styles (needed for tailwind css.
import "../styles/global.css";
import { Meddon } from 'next/font/google';
import { Bodoni_Moda } from "next/font/google";
import { Birthstone_Bounce } from "next/font/google";
import { Parisienne } from "next/font/google";
import { Dancing_Script } from "next/font/google";

export const meddon = Meddon({
    weight: '400',
    subsets: ['latin'],
    display: 'swap',
})

export const birthstoneBounce = Birthstone_Bounce({
    weight: '400',
    subsets: ['latin'],
    display: 'swap',
})

export const bodoniModa = Bodoni_Moda({
    weight: '400',
    subsets: ['latin'],
    display: 'swap',
})

export const parisienne = Parisienne({
    weight: '400',
    subsets: ['latin'],
    display: 'swap',
})

export const dancingScript = Dancing_Script({
    weight: '400',
    subsets: ['latin'],
    display: 'swap',
})

  
export default function MyApp({ Component, pageProps }) {
    return <Component {...pageProps} />
}