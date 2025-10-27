'use client';

import Link from "next/link";

export default function NotFound() {
  return (
    <main className="container grid gap-4 py-16 text-center sm:text-left">
      <h1 className="text-3xl font-bold">Page not found</h1>
      <p className="text-muted-foreground">
        We could not find the page you were looking for. Verify the URL or return to a known route.
      </p>
      <div className="flex flex-wrap gap-3 justify-center sm:justify-start">
        <Link className="text-primary underline" href="/">
          Go to landing
        </Link>
        <Link className="text-primary underline" href="/dashboard">
          Open dashboard
        </Link>
      </div>
    </main>
  );
}
