'use client';

import Link from "next/link";

export default function PrelimsPaymentPage() {
  return (
    <main className="container grid gap-4 py-16">
      <h1 className="text-3xl font-bold">Prelims Payment</h1>
      <p className="text-muted-foreground">
        Placeholder route. Port the payment flow from `src/pages/PrelimsPayment.tsx`.
      </p>
      <div className="flex flex-wrap gap-3">
        <Link className="text-primary underline" href="/prelims">
          Back to prelims overview
        </Link>
        <Link className="text-primary underline" href="/prelims/test">
          Continue to test
        </Link>
      </div>
    </main>
  );
}
