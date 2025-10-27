'use client';

import Link from "next/link";

export default function MainsOverviewPage() {
  return (
    <main className="container grid gap-4 py-16">
      <h1 className="text-3xl font-bold">Mains Overview</h1>
      <p className="text-muted-foreground">
        Placeholder route. Port the mains overview from `src/pages/Mains.tsx`.
      </p>
      <div className="flex flex-wrap gap-3">
        <Link className="text-primary underline" href="/">
          Back to landing
        </Link>
        <Link className="text-primary underline" href="/mains/payment">
          Proceed to payment
        </Link>
      </div>
    </main>
  );
}
