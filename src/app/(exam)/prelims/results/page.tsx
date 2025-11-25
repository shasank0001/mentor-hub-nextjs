'use client';

import { useEffect, useMemo } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Trophy, Target, TrendingUp } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function PrelimsResultsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const metrics = useMemo(() => {
    const score = Number.parseInt(searchParams.get("score") ?? "", 10);
    const total = Number.parseInt(searchParams.get("total") ?? "", 10);
    const percentage = Number.parseFloat(searchParams.get("percentage") ?? "");

    const isValid =
      Number.isFinite(score) &&
      Number.isFinite(total) &&
      Number.isFinite(percentage) &&
      total > 0;

    return {
      score: Number.isFinite(score) ? score : 0,
      total: Number.isFinite(total) ? total : 0,
      percentage: Number.isFinite(percentage) ? percentage : 0,
      isValid,
    };
  }, [searchParams]);

  useEffect(() => {
    if (!metrics.isValid) {
      router.replace("/dashboard");
    }
  }, [metrics.isValid, router]);

  if (!metrics.isValid) {
    return null;
  }

  const getPerformanceMessage = (percentage: number) => {
    if (percentage >= 80) {
      return { message: "Excellent!", color: "text-accent" };
    }
    if (percentage >= 60) {
      return { message: "Good Job!", color: "text-primary" };
    }
    if (percentage >= 40) {
      return { message: "Keep Practicing!", color: "text-secondary" };
    }
    return { message: "Need More Practice", color: "text-destructive" };
  };

  const performance = getPerformanceMessage(metrics.percentage);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/5">
      <div className="container mx-auto px-4 py-12">
        <div className="mx-auto max-w-3xl">
          <Card className="p-8 text-center">
            <div className="mb-6 flex justify-center">
              <div className="rounded-full bg-primary/10 p-6">
                <Trophy className="h-16 w-16 text-primary" />
              </div>
            </div>

            <h1 className="mb-2 text-4xl font-bold">Test Complete!</h1>
            <p className={`mb-8 text-2xl font-semibold ${performance.color}`}>{performance.message}</p>

            <div className="mb-8 grid gap-6 md:grid-cols-3">
              <div className="rounded-lg bg-primary/5 p-6">
                <Target className="mx-auto mb-2 h-8 w-8 text-primary" />
                <p className="text-sm text-muted-foreground">Score</p>
                <p className="text-3xl font-bold text-primary">
                  {metrics.score}/{metrics.total}
                </p>
              </div>

              <div className="rounded-lg bg-secondary/5 p-6">
                <TrendingUp className="mx-auto mb-2 h-8 w-8 text-secondary" />
                <p className="text-sm text-muted-foreground">Percentage</p>
                <p className="text-3xl font-bold text-secondary">{metrics.percentage.toFixed(1)}%</p>
              </div>

              <div className="rounded-lg bg-accent/5 p-6">
                <Trophy className="mx-auto mb-2 h-8 w-8 text-accent" />
                <p className="text-sm text-muted-foreground">Correct Answers</p>
                <p className="text-3xl font-bold text-accent">{metrics.score}</p>
              </div>
            </div>

            <Card className="mb-8 bg-muted/50 p-6 text-left">
              <h3 className="mb-4 text-xl font-bold">Performance Analysis</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Questions</span>
                  <span className="font-semibold">{metrics.total}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Correct Answers</span>
                  <span className="font-semibold text-accent">{metrics.score}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Incorrect Answers</span>
                  <span className="font-semibold text-destructive">{metrics.total - metrics.score}</span>
                </div>
                <div className="flex justify-between border-t pt-3">
                  <span className="font-semibold">Final Score</span>
                  <span className="text-xl font-bold text-primary">{metrics.percentage.toFixed(1)}%</span>
                </div>
              </div>
            </Card>

            <div className="flex flex-col gap-4 sm:flex-row">
              <Button variant="outline" className="w-full" size="lg" asChild>
                <Link href="/dashboard">Back to Dashboard</Link>
              </Button>
              <Button className="w-full" size="lg" asChild>
                <Link href="/prelims/test">Take Another Test</Link>
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
