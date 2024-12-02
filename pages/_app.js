// need to create custom _app.js (this file does not exist by default)
// because we want to import the global styles (needed for tailwind css.
import "../styles/global.css";
import { Meddon } from 'next/font/google';

export const meddon = Meddon({
    weight: '400',
    subsets: ['latin'],
    display: 'swap',
  })

  
export default function MyApp({ Component, pageProps }) {
    return <Component {...pageProps} />
}