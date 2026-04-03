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

export type SortKey =
  | 'address'
  | 'price'
  | 'size'
  | 'wu_transit'
  | 'uni_transit'
  | 'total_commute'
  | 'created_at';

export type SortDirection = 'asc' | 'desc';

export type SortState = {
  key: SortKey;
  direction: SortDirection;
};

export type Filters = {
  maxPrice?: number;
  minSize?: number;
  maxWuTime?: number;
  maxUniTime?: number;
};
