"use client"; // This line is ESSENTIAL. It marks this as a Client Component.

import dynamic from 'next/dynamic';

// We move the dynamic import with ssr: false into this client component.
const WhatsAppButton = dynamic(() => import('./WhatsAppButton'), {
  ssr: false, // This is now allowed because we are in a "use client" file.
});

// This component's only job is to render our client-side components.
export default function ClientComponents() {
  return (
    <>
      <WhatsAppButton />
      {/* If you add other client-only gadgets in the future, add them here. */}
    </>
  );
}