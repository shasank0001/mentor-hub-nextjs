'use client';

import Link from "next/link";

export default function PrelimsOverviewPage() {
  return (
    <main className="container grid gap-4 py-16">
      <h1 className="text-3xl font-bold">Prelims Overview</h1>
      <p className="text-muted-foreground">
        Placeholder route. Port the Prelims overview experience from `src/pages/Prelims.tsx`.
      </p>
      <div className="flex flex-wrap gap-3">
        <Link className="text-primary underline" href="/">
          Back to landing
        </Link>
        <Link className="text-primary underline" href="/prelims/payment">
          Proceed to payment
        </Link>
      </div>
    </main>
  );
}
