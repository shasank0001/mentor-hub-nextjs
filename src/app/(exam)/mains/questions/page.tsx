'use client';

import Link from "next/link";

export default function MainsQuestionsPage() {
  return (
    <main className="container grid gap-4 py-16">
      <h1 className="text-3xl font-bold">Mains Questions</h1>
      <p className="text-muted-foreground">
        Placeholder route. Port the file-upload workflow from `src/pages/MainsQuestions.tsx`.
      </p>
      <div className="flex flex-wrap gap-3">
        <Link className="text-primary underline" href="/mains/payment">
          Back to payment
        </Link>
        <Link className="text-primary underline" href="/dashboard">
          Return to dashboard
        </Link>
      </div>
    </main>
  );
}
