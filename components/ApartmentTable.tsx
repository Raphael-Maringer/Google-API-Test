'use client';

import { Apartment } from '@/lib/types';
import { getTotalCommute } from '@/lib/apartmentUtils';

type ApartmentTableProps = {
  apartments: Apartment[];
};

export default function ApartmentTable({ apartments }: ApartmentTableProps) {
  return (
    <div className="card bg-base-100 shadow-md">
      <div className="card-body">
        <div className="overflow-x-auto">
          <table className="table table-zebra">
            <thead>
              <tr>
                <th>Address</th>
                <th>Price (€)</th>
                <th>Size (m²)</th>
                <th>WU (transit)</th>
                <th>Uni (transit)</th>
                <th>Total commute</th>
                <th>Link</th>
              </tr>
            </thead>
            <tbody>
              {apartments.map((apartment) => (
                <tr key={apartment.id}>
                  <td className="max-w-64 truncate">{apartment.address}</td>
                  <td>{apartment.price}</td>
                  <td>{apartment.size}</td>
                  <td>{apartment.wu_transit} min</td>
                  <td>{apartment.uni_transit} min</td>
                  <td>{getTotalCommute(apartment)} min</td>
                  <td>
                    <a
                      className="link link-primary"
                      href={apartment.link}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Open
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
