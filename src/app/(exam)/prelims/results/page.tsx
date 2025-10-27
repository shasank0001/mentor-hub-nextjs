'use client';

import Link from "next/link";

export default function PrelimsResultsPage() {
  return (
    <main className="container grid gap-4 py-16">
      <h1 className="text-3xl font-bold">Prelims Results</h1>
      <p className="text-muted-foreground">
        Placeholder route. Port the results summary from `src/pages/PrelimsResults.tsx`.
      </p>
      <div className="flex flex-wrap gap-3">
        <Link className="text-primary underline" href="/prelims/test">
          Back to test
        </Link>
        <Link className="text-primary underline" href="/dashboard">
          Return to dashboard
        </Link>
      </div>
    </main>
  );
}
