import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Apartment Compare Vienna',
  description: 'Compare apartments by price, size, and commute times',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-theme="cupcake">
      <body>{children}</body>
    </html>
  );
}
