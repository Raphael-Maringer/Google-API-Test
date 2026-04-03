create extension if not exists "uuid-ossp";

create table if not exists apartments (
  id uuid primary key default uuid_generate_v4(),
  address text not null,
  link text not null,
  price numeric not null,
  size numeric not null,
  wu_transit integer not null,
  wu_bike integer not null,
  wu_walk integer not null,
  uni_transit integer not null,
  uni_bike integer not null,
  uni_walk integer not null,
  created_at timestamp with time zone default now()
);
