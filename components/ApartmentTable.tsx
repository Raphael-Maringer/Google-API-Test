'use client';

import Link from 'next/link';
import { Apartment, SortKey, SortState } from '@/lib/types';
import { getTotalCommute } from '@/lib/apartmentUtils';

type ApartmentTableProps = {
  apartments: Apartment[];
  sortState: SortState;
  onSortChange: (key: SortKey) => void;
};

const sortableColumns: Array<{ key: SortKey; label: string }> = [
  { key: 'address', label: 'Address' },
  { key: 'price', label: 'Price (€)' },
  { key: 'size', label: 'Size (m²)' },
  { key: 'wu_transit', label: 'WU (transit)' },
  { key: 'uni_transit', label: 'Uni (transit)' },
  { key: 'total_commute', label: 'Total commute' },
];

function SortIndicator({ active, direction }: { active: boolean; direction: SortState['direction'] }) {
  if (!active) {
    return <span className="opacity-40">↕</span>;
  }

  return <span>{direction === 'asc' ? '↑' : '↓'}</span>;
}

export default function ApartmentTable({ apartments, sortState, onSortChange }: ApartmentTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="table table-zebra">
        <thead>
          <tr>
            {sortableColumns.map((column) => (
              <th key={column.key}>
                <button
                  className="btn btn-ghost btn-xs normal-case"
                  type="button"
                  onClick={() => onSortChange(column.key)}
                >
                  {column.label}
                  <SortIndicator active={sortState.key === column.key} direction={sortState.direction} />
                </button>
              </th>
            ))}
            <th>Link</th>
          </tr>
        </thead>
        <tbody>
          {apartments.map((apartment) => (
            <tr key={apartment.id} className="hover cursor-pointer">
              <td>
                <Link className="link link-hover" href={`/apartments/${apartment.id}`}>
                  {apartment.address}
                </Link>
              </td>
              <td>{apartment.price}</td>
              <td>{apartment.size}</td>
              <td>{apartment.wu_transit} min</td>
              <td>{apartment.uni_transit} min</td>
              <td>{getTotalCommute(apartment)} min</td>
              <td>
                <a className="link link-primary" href={apartment.link} target="_blank" rel="noreferrer">
                  Open
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
