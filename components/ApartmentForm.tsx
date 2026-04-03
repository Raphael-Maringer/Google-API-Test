'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';

type ApartmentFormProps = {
  onSaved?: () => Promise<void>;
  redirectTo?: string;
};

export default function ApartmentForm({ onSaved, redirectTo }: ApartmentFormProps) {
  const router = useRouter();

  const [address, setAddress] = useState('');
  const [link, setLink] = useState('');
  const [price, setPrice] = useState('');
  const [size, setSize] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSaving(true);
    setError(null);

    try {
      const response = await fetch('/api/apartments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          address,
          link,
          price: Number(price),
          size: Number(size),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to save apartment.');
      }

      // reset form
      setAddress('');
      setLink('');
      setPrice('');
      setSize('');

      // optional callback
      if (onSaved) {
        await onSaved();
      }

      // redirect if provided
      if (redirectTo) {
        router.push(redirectTo);
      }
    } catch {
      setError('Could not save apartment. Please verify your env vars and Supabase setup.');
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <div className="card bg-base-100 shadow-md">
      <div className="card-body">
        <h2 className="card-title">Add apartment</h2>

        <form className="grid gap-3 md:grid-cols-2" onSubmit={handleSubmit}>
          <label className="form-control w-full">
            <span className="label-text">Address</span>
            <input
              className="input input-bordered"
              required
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </label>

          <label className="form-control w-full">
            <span className="label-text">Apartment Link</span>
            <input
              className="input input-bordered"
              type="url"
              required
              value={link}
              onChange={(e) => setLink(e.target.value)}
            />
          </label>

          <label className="form-control w-full">
            <span className="label-text">Price (€)</span>
            <input
              className="input input-bordered"
              type="number"
              min={0}
              required
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </label>

          <label className="form-control w-full">
            <span className="label-text">Size (m²)</span>
            <input
              className="input input-bordered"
              type="number"
              min={0}
              required
              value={size}
              onChange={(e) => setSize(e.target.value)}
            />
          </label>

          <div className="md:col-span-2">
            <button className="btn btn-primary" type="submit" disabled={isSaving}>
              {isSaving ? 'Saving...' : 'Save Apartment'}
            </button>
          </div>

          {error && <p className="text-error md:col-span-2">{error}</p>}
        </form>
      </div>
    </div>
  );
}