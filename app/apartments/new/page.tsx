import Link from 'next/link';
import ApartmentForm from '@/components/ApartmentForm';

export default function NewApartmentPage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-3xl flex-col gap-6 p-4 md:p-8">
      <header className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Neue Wohnung anlegen</h1>
          <p className="text-base-content/70">Hier kannst du nur eine neue Wohnung hinzufügen.</p>
        </div>
        <Link className="btn btn-outline" href="/">
          Zur Übersicht
        </Link>
      </header>

      <ApartmentForm redirectTo="/" />
    </main>
  );
}
