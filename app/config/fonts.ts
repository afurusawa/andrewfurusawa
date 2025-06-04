import { Contrail_One, DM_Serif_Display, Spectral, VT323, Pixelify_Sans } from 'next/font/google';

// Initialize each font at module scope
const dmSerif = DM_Serif_Display({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-dm-serif',
});

const vt323 = VT323({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-vt323',
});

const spectral = Spectral({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-spectral',
});

const contrailOne = Contrail_One({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-contrail-one',
});

const pixelifySans = Pixelify_Sans({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-pixelify-sans',
});

// Export all fonts in a single object
export const fonts = {
  dmSerif,
  vt323,
  spectral,
  contrailOne,
  pixelifySans,
}; 