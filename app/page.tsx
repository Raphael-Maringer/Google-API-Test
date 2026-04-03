'use client';

import { useEffect, useMemo, useState } from 'react';
import ApartmentForm from '@/components/ApartmentForm';
import ApartmentTable from '@/components/ApartmentTable';
import Filters from '@/components/Filters';
import { filterApartments, sortApartments } from '@/lib/apartmentUtils';
import { Apartment, Filters as FilterValues, SortOption } from '@/lib/types';

const sortOptions: Array<{ label: string; value: SortOption }> = [
  { label: 'Total commute (ascending)', value: 'total_asc' },
  { label: 'Price (ascending)', value: 'price_asc' },
  { label: 'Price (descending)', value: 'price_desc' },
  { label: 'Size (ascending)', value: 'size_asc' },
  { label: 'Size (descending)', value: 'size_desc' },
  { label: 'WU transit (ascending)', value: 'wu_transit_asc' },
  { label: 'Uni transit (ascending)', value: 'uni_transit_asc' },
];

export default function HomePage() {
  const [apartments, setApartments] = useState<Apartment[]>([]);
  const [filters, setFilters] = useState<FilterValues>({});
  const [sortOption, setSortOption] = useState<SortOption>('total_asc');
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
      setError('Could not load apartments. Make sure Supabase is configured correctly.');
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    void loadApartments();
  }, []);

  const filteredAndSorted = useMemo(() => {
    const filtered = filterApartments(apartments, filters);
    return sortApartments(filtered, sortOption);
  }, [apartments, filters, sortOption]);

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-6 p-4 md:p-8">
      <header className="space-y-1">
        <h1 className="text-3xl font-bold">Apartment Comparison</h1>
        <p className="text-base-content/70">Compare rent, size, and commute times to WU & Uni Wien.</p>
      </header>

      <ApartmentForm onSaved={loadApartments} />

      <Filters filters={filters} onChange={setFilters} />

      <div className="card bg-base-100 shadow-md">
        <div className="card-body gap-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <p className="font-medium">{filteredAndSorted.length} apartments found</p>

            <label className="form-control w-full max-w-xs">
              <span className="label-text">Sort by</span>
              <select
                className="select select-bordered"
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value as SortOption)}
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>
          </div>

          {isLoading ? <p>Loading apartments...</p> : null}
          {error ? <p className="text-error">{error}</p> : null}

          {!isLoading && !error && filteredAndSorted.length === 0 ? (
            <p className="text-base-content/70">No apartments match your current filters.</p>
          ) : null}

          {!isLoading && !error && filteredAndSorted.length > 0 ? (
            <ApartmentTable apartments={filteredAndSorted} />
          ) : null}
        </div>
      </div>
    </main>
  );
}
