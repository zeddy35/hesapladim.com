import type { Metadata } from 'next';
import IletisimClient from './_IletisimClient';

export const metadata: Metadata = {
  title: 'İletişim | Hesaplayım',
  description: 'Hesaplayım ekibiyle iletişime geçin. Hata bildirimi, öneri ve sorularınız için.',
  robots: { index: false, follow: false },
};

export default function IletisimPage() {
  return <IletisimClient />;
}
