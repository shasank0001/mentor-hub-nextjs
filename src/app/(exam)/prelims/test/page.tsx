'use client';

import Link from "next/link";

export default function PrelimsTestPage() {
  return (
    <main className="container grid gap-4 py-16">
      <h1 className="text-3xl font-bold">Prelims Test</h1>
      <p className="text-muted-foreground">
        Placeholder route. Port the timer-driven prelims assessment from `src/pages/PrelimsTest.tsx`.
      </p>
      <div className="flex flex-wrap gap-3">
        <Link className="text-primary underline" href="/prelims/payment">
          Back to payment
        </Link>
        <Link className="text-primary underline" href="/prelims/results">
          View results (placeholder)
        </Link>
      </div>
    </main>
  );
}
