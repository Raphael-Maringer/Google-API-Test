'use client';

import { Filters as FilterValues } from '@/lib/types';

type FiltersProps = {
  filters: FilterValues;
  onChange: (filters: FilterValues) => void;
};

function parseOptionalNumber(value: string): number | undefined {
  if (!value) {
    return undefined;
  }

  const number = Number(value);
  return Number.isNaN(number) ? undefined : number;
}

export default function Filters({ filters, onChange }: FiltersProps) {
  return (
    <div className="card bg-base-100 shadow-md">
      <div className="card-body">
        <h2 className="card-title">Filtern</h2>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <label className="form-control">
            <span className="label-text mb-3">Preis in € (max)</span>
            <input
              type="number"
              min={0}
              className="input input-bordered"
              value={filters.maxPrice ?? ''}
              onChange={(e) => onChange({ ...filters, maxPrice: parseOptionalNumber(e.target.value) })}
            />
          </label>

          <label className="form-control">
            <span className="label-text mb-3">Größe in m² (min)</span>
            <input
              type="number"
              min={0}
              className="input input-bordered"
              value={filters.minSize ?? ''}
              onChange={(e) => onChange({ ...filters, minSize: parseOptionalNumber(e.target.value) })}
            />
          </label>

          <label className="form-control">
            <span className="label-text mb-3">Zur WU in min (max)</span>
            <input
              type="number"
              min={0}
              className="input input-bordered"
              value={filters.maxWuTime ?? ''}
              onChange={(e) => onChange({ ...filters, maxWuTime: parseOptionalNumber(e.target.value) })}
            />
          </label>

          <label className="form-control">
            <span className="label-text mb-3">Zur Uni in min (max)</span>
            <input
              type="number"
              min={0}
              className="input input-bordered"
              value={filters.maxUniTime ?? ''}
              onChange={(e) => onChange({ ...filters, maxUniTime: parseOptionalNumber(e.target.value) })}
            />
          </label>
        </div>
      </div>
    </div>
  );
}
