'use client';

import Link from "next/link";

export default function MainsPaymentPage() {
  return (
    <main className="container grid gap-4 py-16">
      <h1 className="text-3xl font-bold">Mains Payment</h1>
      <p className="text-muted-foreground">
        Placeholder route. Port the payment experience from `src/pages/MainsPayment.tsx`.
      </p>
      <div className="flex flex-wrap gap-3">
        <Link className="text-primary underline" href="/mains">
          Back to mains overview
        </Link>
        <Link className="text-primary underline" href="/mains/questions">
          Continue to questions
        </Link>
      </div>
    </main>
  );
}
