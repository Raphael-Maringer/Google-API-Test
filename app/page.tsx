'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import ApartmentTable from '@/components/ApartmentTable';
import Filters from '@/components/Filters';
import { filterApartments, sortApartments } from '@/lib/apartmentUtils';
import { Apartment, Filters as FilterValues, SortKey, SortState } from '@/lib/types';

export default function HomePage() {
  const [apartments, setApartments] = useState<Apartment[]>([]);
  const [filters, setFilters] = useState<FilterValues>({});
  const [sortState, setSortState] = useState<SortState>({
    key: 'price',
    direction: 'asc',
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function loadApartments() {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/apartments', { cache: 'no-store' });
      if (!response.ok) {
        throw new Error('Failed to fetch apartments');
      }

      const data = (await response.json()) as Apartment[];
      setApartments(data);
    } catch {
      setError('Could not load apartments');
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    void loadApartments();
  }, []);

  function handleSortChange(key: SortKey) {
    setSortState((prev) => {
      if (prev.key === key) {
        return {
          key,
          direction: prev.direction === 'asc' ? 'desc' : 'asc',
        };
      }
      return { key, direction: 'asc' };
    });
  }

  const filteredAndSorted = useMemo(() => {
    const filtered = filterApartments(apartments, filters);
    return sortApartments(filtered, sortState);
  }, [apartments, filters, sortState]);

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-6 p-4 md:p-8">
      <header className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            Wohnung
          </h1>
          <p className="text-base-content/70">
            Vallah sogar
          </p>
        </div>

        <Link className="btn btn-primary" href="/apartments/new">
          Neue Wohnung hinzufügen
        </Link>
      </header>

      <Filters filters={filters} onChange={setFilters} />

      <div className="card bg-base-100 shadow-md">
        <div className="card-body gap-4">
          <p className="font-medium">
            {filteredAndSorted.length} apartments found
          </p>

          {isLoading && <p>Loading apartments...</p>}
          {error && <p className="text-error">{error}</p>}

          {!isLoading && !error && filteredAndSorted.length === 0 && (
            <p className="text-base-content/70">
              No apartments match your current filters.
            </p>
          )}

          {!isLoading && !error && filteredAndSorted.length > 0 && (
            <ApartmentTable
              apartments={filteredAndSorted}
              sortState={sortState}
              onSortChange={handleSortChange}
            />
          )}
        </div>
      </div>
    </main>
  );
}