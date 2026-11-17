import { Suspense } from 'react';
import ProfileClient from './profile-client';
import '@/app/homepage.css';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: _id } = await params;
  return {
    title: 'साधक प्रोफाइल | डिजिटल पंढरपूर',
    description: `वारकरी साधक प्रोफाइल आणि वाङ्मयीन योगदाने - डिजिटल पंढरपूर`,
    openGraph: {
      title: 'साधक प्रोफाइल',
      locale: 'mr_IN',
    },
  };
}

export default async function ProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className="vitthalaya-shell min-h-screen py-10">
      <div className="vitthalaya-container max-w-4xl">
        <Suspense
          fallback={
            <div className="text-center py-16 text-[var(--dp-muted)] font-marathi">लोड होत आहे...</div>
          }
        >
          <ProfileClient userId={id} />
        </Suspense>
      </div>
    </div>
  );
}
