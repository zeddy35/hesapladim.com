import type { Metadata } from 'next';
import UykuForm from './Form';

export const metadata: Metadata = {
  title: 'Uyku Saati Hesaplama 2026 | Ne Zaman Uyumalıyım?',
  description:
    'Sabah kalmak istediğiniz saati girerek uyku döngüsüne göre ideal yatma saatlerini bulun. 90 dakikalık uyku döngüsü hesaplama.',
  alternates: { canonical: 'https://hesapladim.com/uyku-saati-hesaplama' },
};

export default function Page() {
  return <UykuForm />;
}
