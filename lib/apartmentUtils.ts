import { Apartment, Filters, SortOption } from './types';

export function getTotalCommute(apartment: Apartment): number {
  return apartment.wu_transit + apartment.uni_transit;
}

export function sortApartments(apartments: Apartment[], sortOption: SortOption): Apartment[] {
  const sorted = [...apartments];

  sorted.sort((a, b) => {
    switch (sortOption) {
      case 'price_asc':
        return a.price - b.price;
      case 'price_desc':
        return b.price - a.price;
      case 'size_asc':
        return a.size - b.size;
      case 'size_desc':
        return b.size - a.size;
      case 'wu_transit_asc':
        return a.wu_transit - b.wu_transit;
      case 'uni_transit_asc':
        return a.uni_transit - b.uni_transit;
      case 'total_asc':
      default:
        return getTotalCommute(a) - getTotalCommute(b);
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
