export type Apartment = {
  id: string;
  address: string;
  link: string;
  price: number;
  size: number;
  wu_transit: number;
  wu_bike: number;
  wu_walk: number;
  uni_transit: number;
  uni_bike: number;
  uni_walk: number;
  created_at: string;
};

export type SortOption =
  | 'total_asc'
  | 'price_asc'
  | 'price_desc'
  | 'size_asc'
  | 'size_desc'
  | 'wu_transit_asc'
  | 'uni_transit_asc';

export type Filters = {
  maxPrice?: number;
  minSize?: number;
  maxWuTime?: number;
  maxUniTime?: number;
};
