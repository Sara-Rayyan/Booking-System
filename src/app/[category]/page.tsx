'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Card } from '../../components/ui/Card';
import { Navigation } from '../../components/Navigation';
import { fetchAPI } from '../../utils/api';

export default function CategoryPage() {
  const params = useParams();
  const category = params.category as string;
  const [places, setPlaces] = useState<any[]>([]);

  useEffect(() => {
    fetchAPI(`/places?category=${category}`)
      .then(data => setPlaces(data))
      .catch(console.error);
  }, [category]);

  return (
    <>
      <Navigation />
      <div style={{ padding: '4rem 2rem', maxWidth: '1200px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '2rem', textTransform: 'capitalize' }}>
          {category}s Available
        </h1>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
          {places.map((place) => (
            <Link href={`/${category}/${place._id}`} key={place._id}>
              <Card className="hover-lift">
                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>{place.name}</h3>
                <p style={{ color: 'var(--text-muted)', marginBottom: '0.5rem' }}>{place.description}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                  <span>⭐ {place.rating} ({place.numReviews} reviews)</span>
                  <span>🕒 {place.workingHours}</span>
                </div>
              </Card>
            </Link>
          ))}
          {places.length === 0 && <p>No places found in this category yet.</p>}
        </div>
      </div>
    </>
  );
}
