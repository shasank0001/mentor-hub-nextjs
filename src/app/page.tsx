'use client';

import Link from "next/link";
import { BookOpen, Trophy, Users, CheckCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-secondary py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center text-primary-foreground">
            <h1 className="mb-6 text-5xl font-bold tracking-tight md:text-6xl">Master Your Exam Journey</h1>
            <p className="mb-8 text-xl opacity-90 md:text-2xl">Professional mentorship for Preliminary and Main examinations</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild size="lg" variant="secondary" className="text-lg font-semibold">
                <Link href="/auth">Get Started</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-2 border-primary-foreground bg-transparent text-lg font-semibold text-primary-foreground hover:bg-primary-foreground hover:text-primary"
              >
                <Link href="/auth">Sign In</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="mb-12 text-center text-4xl font-bold">Why Choose Us?</h2>
          <div className="grid gap-8 md:grid-cols-3">
            <Card className="p-6 text-center transition-transform hover:scale-105">
              <div className="mb-4 flex justify-center">
                <div className="rounded-full bg-primary/10 p-4">
                  <BookOpen className="h-8 w-8 text-primary" />
                </div>
              </div>
              <h3 className="mb-2 text-xl font-bold">Comprehensive Tests</h3>
              <p className="text-muted-foreground">Practice with MCQ-based tests designed to mirror actual exam patterns</p>
            </Card>

            <Card className="p-6 text-center transition-transform hover:scale-105">
              <div className="mb-4 flex justify-center">
                <div className="rounded-full bg-secondary/10 p-4">
                  <Users className="h-8 w-8 text-secondary" />
                </div>
              </div>
              <h3 className="mb-2 text-xl font-bold">Expert Mentorship</h3>
              <p className="text-muted-foreground">Get your answers evaluated by experienced mentors</p>
            </Card>

            <Card className="p-6 text-center transition-transform hover:scale-105">
              <div className="mb-4 flex justify-center">
                <div className="rounded-full bg-accent/10 p-4">
                  <Trophy className="h-8 w-8 text-accent" />
                </div>
              </div>
              <h3 className="mb-2 text-xl font-bold">Track Progress</h3>
              <p className="text-muted-foreground">Monitor your performance and improve with detailed analytics</p>
            </Card>
          </div>
        </div>
      </section>

      <section className="bg-muted py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="mb-12 text-center text-4xl font-bold">Choose Your Path</h2>
          <div className="grid gap-8 md:grid-cols-2">
            <Card className="p-8">
              <h3 className="mb-4 text-2xl font-bold text-primary">Preliminary Examination</h3>
              <ul className="mb-6 space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="mt-1 h-5 w-5 text-accent" />
                  <span>Multiple Choice Questions (MCQs)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="mt-1 h-5 w-5 text-accent" />
                  <span>Instant auto-evaluation</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="mt-1 h-5 w-5 text-accent" />
                  <span>Detailed score analysis</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="mt-1 h-5 w-5 text-accent" />
                  <span>Timed test environment</span>
                </li>
              </ul>
              <Button asChild className="w-full" size="lg">
                <Link href="/auth">Start Prelims Prep</Link>
              </Button>
            </Card>

            <Card className="p-8">
              <h3 className="mb-4 text-2xl font-bold text-primary">Main Examination</h3>
              <ul className="mb-6 space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="mt-1 h-5 w-5 text-accent" />
                  <span>Descriptive answer writing</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="mt-1 h-5 w-5 text-accent" />
                  <span>Upload handwritten answers</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="mt-1 h-5 w-5 text-accent" />
                  <span>Expert mentor evaluation</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="mt-1 h-5 w-5 text-accent" />
                  <span>Detailed feedback</span>
                </li>
              </ul>
              <Button asChild className="w-full" size="lg" variant="secondary">
                <Link href="/auth">Start Mains Prep</Link>
              </Button>
            </Card>
          </div>
        </div>
      </section>

      <footer className="border-t py-8 px-4">
        <div className="container mx-auto max-w-6xl text-center text-muted-foreground">
          <p>© 2025 Exam Mentorship Platform. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
