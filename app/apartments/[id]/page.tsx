import Link from 'next/link';
import { headers } from 'next/headers';
import { notFound } from 'next/navigation';
import { Apartment } from '@/lib/types';

type ApartmentDetailPageProps = {
  params: Promise<{ id: string }>;
};

async function getApartment(id: string): Promise<Apartment | null> {
  const headerStore = await headers();
  const host = headerStore.get('host');
  const protocol = process.env.NODE_ENV === 'development' ? 'http' : 'https';

  if (!host) {
    return null;
  }

  const response = await fetch(`${protocol}://${host}/api/apartments/${id}`, { cache: 'no-store' });

  if (!response.ok) {
    return null;
  }

  return (await response.json()) as Apartment;
}

export default async function ApartmentDetailPage({ params }: ApartmentDetailPageProps) {
  const { id } = await params;
  const apartment = await getApartment(id);

  if (!apartment) {
    notFound();
  }

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-3xl flex-col gap-6 p-4 md:p-8">
      <header className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Wohnungsdetails</h1>
          <p className="text-base-content/70">{apartment.address}</p>
        </div>
        <Link className="btn btn-outline" href="/">
          Zur Übersicht
        </Link>
      </header>

      <div className="card bg-base-100 shadow-md">
        <div className="card-body">
          <div className="grid gap-3 sm:grid-cols-2">
            <p><strong>Preis:</strong> € {apartment.price}</p>
            <p><strong>Größe:</strong> {apartment.size} m²</p>
            <p><strong>Priorität:</strong> {apartment.priority}/10</p>
            <p><strong>Angeschrieben:</strong> {apartment.contacted ? 'Ja' : 'Nein'}</p>
            <p><strong>WU Öffi:</strong> {apartment.wu_transit} min</p>
            <p><strong>WU Bike:</strong> {apartment.wu_bike} min</p>
            <p><strong>WU Zu Fuß:</strong> {apartment.wu_walk} min</p>
            <p><strong>Uni Öffi:</strong> {apartment.uni_transit} min</p>
            <p><strong>Uni Bike:</strong> {apartment.uni_bike} min</p>
            <p><strong>Uni Zu Fuß:</strong> {apartment.uni_walk} min</p>
            <p className="sm:col-span-2">
              <a className="link link-primary" href={apartment.link} target="_blank" rel="noreferrer">
                Zum Inserat
              </a>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
