import { Apartment, Filters, SortState } from './types';

export function sortApartments(apartments: Apartment[], sortState: SortState): Apartment[] {
  const sorted = [...apartments];

  sorted.sort((a, b) => {
    const factor = sortState.direction === 'asc' ? 1 : -1;

    switch (sortState.key) {
      case 'address':
        return a.address.localeCompare(b.address) * factor;
      case 'price':
        return (a.price - b.price) * factor;
      case 'size':
        return (a.size - b.size) * factor;
      case 'wu_transit':
        return (a.wu_transit - b.wu_transit) * factor;
      case 'wu_bike':
        return (a.wu_bike - b.wu_bike) * factor;
      case 'wu_walk':
        return (a.wu_walk - b.wu_walk) * factor;
      case 'uni_transit':
        return (a.uni_transit - b.uni_transit) * factor;
      case 'uni_bike':
        return (a.uni_bike - b.uni_bike) * factor;
      case 'uni_walk':
        return (a.uni_walk - b.uni_walk) * factor;
      case 'created_at':
        return (
          (new Date(a.created_at).getTime() -
            new Date(b.created_at).getTime()) * factor
        );
      default:
        return 0; 
    }
  });

  return sorted;
}

export function filterApartments(apartments: Apartment[], filters: Filters): Apartment[] {
  return apartments.filter((apartment) => {
    if (filters.maxPrice !== undefined && apartment.price > filters.maxPrice) {
      return false;
    }

    if (filters.minSize !== undefined && apartment.size < filters.minSize) {
      return false;
    }

    if (filters.maxWuTime !== undefined && apartment.wu_transit > filters.maxWuTime) {
      return false;
    }

    if (filters.maxUniTime !== undefined && apartment.uni_transit > filters.maxUniTime) {
      return false;
    }

    return true;
  });
}
