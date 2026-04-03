import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';
import { calculateTravelTimes } from '@/lib/calculateTravelTimes';

export async function GET() {
  const { data, error } = await supabase
    .from('apartments')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data ?? []);
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      address?: string;
      link?: string;
      price?: number;
      size?: number;
    };

    if (!body.address || !body.link || body.price === undefined || body.size === undefined) {
      return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 });
    }

    const travelTimes = await calculateTravelTimes(body.address);

    const { data, error } = await supabase
      .from('apartments')
      .insert({
        address: body.address,
        link: body.link,
        price: body.price,
        size: body.size,
        wu_transit: travelTimes.wu.transit,
        wu_bike: travelTimes.wu.bike,
        wu_walk: travelTimes.wu.walk,
        uni_transit: travelTimes.uni.transit,
        uni_bike: travelTimes.uni.bike,
        uni_walk: travelTimes.uni.walk,
      })
      .select('*')
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Invalid request payload.' }, { status: 400 });
  }
}
