const WU_ADDRESS = 'Welthandelsplatz 1, 1020 Wien';
const UNI_INF_ADDRESS = 'Währinger Straße 29, 1090 Wien';

type TravelMode = 'transit' | 'bicycling' | 'walking';

type LocationTravelTimes = {
  transit: number;
  bike: number;
  walk: number;
};

export type TravelTimes = {
  wu: LocationTravelTimes;
  uni: LocationTravelTimes;
};

const MOCK_TIMES: TravelTimes = {
  wu: { transit: 25, bike: 19, walk: 53 },
  uni: { transit: 31, bike: 24, walk: 67 },
};

async function getModeDurationInMinutes(origin: string, destination: string, mode: TravelMode, apiKey: string): Promise<number> {
  const params = new URLSearchParams({
    origins: origin,
    destinations: destination,
    mode,
    key: apiKey,
  });

  const response = await fetch(`https://maps.googleapis.com/maps/api/distancematrix/json?${params.toString()}`, {
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error(`Distance Matrix API request failed: ${response.status}`);
  }

  const data = (await response.json()) as {
    rows?: Array<{ elements?: Array<{ duration?: { value?: number }; status?: string }> }>;
    status?: string;
  };

  const element = data.rows?.[0]?.elements?.[0];
  if (data.status !== 'OK' || !element || element.status !== 'OK' || !element.duration?.value) {
    throw new Error('Unable to parse Distance Matrix response.');
  }

  return Math.round(element.duration.value / 60);
}

async function getLocationTravelTimes(origin: string, destination: string, apiKey: string): Promise<LocationTravelTimes> {
  const [transit, bike, walk] = await Promise.all([
    getModeDurationInMinutes(origin, destination, 'transit', apiKey),
    getModeDurationInMinutes(origin, destination, 'bicycling', apiKey),
    getModeDurationInMinutes(origin, destination, 'walking', apiKey),
  ]);

  return { transit, bike, walk };
}

export async function calculateTravelTimes(origin: string): Promise<TravelTimes> {
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;

  if (!apiKey) {
    return MOCK_TIMES;
  }

  try {
    const [wu, uni] = await Promise.all([
      getLocationTravelTimes(origin, WU_ADDRESS, apiKey),
      getLocationTravelTimes(origin, UNI_INF_ADDRESS, apiKey),
    ]);

    return { wu, uni };
  } catch {
    return MOCK_TIMES;
  }
}
