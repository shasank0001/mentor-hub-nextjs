'use client';

import { useEffect, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { BookOpen, FileText, LogOut, CheckCircle, Lock } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";

export default function DashboardPage() {
  const { user, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.replace("/auth");
    }
  }, [router, user]);

  const overviewCards = useMemo(
    () => (
      <div className="grid gap-8 md:grid-cols-2">
        <Card className="p-8">
          <div className="mb-4 flex justify-center">
            <div className="rounded-full bg-primary/10 p-4">
              <BookOpen className="h-10 w-10 text-primary" />
            </div>
          </div>
          <h2 className="mb-2 text-center text-2xl font-bold">Preliminary Examination</h2>
          <p className="mb-6 text-center text-muted-foreground">Multiple choice questions with instant evaluation</p>
          <div className="mb-6 space-y-2 text-sm">
            <p>✓ 100 MCQ questions</p>
            <p>✓ 2 hours duration</p>
            <p>✓ Auto-evaluation</p>
            <p>✓ Detailed results</p>
          </div>
          <div className="mb-4 rounded-lg bg-primary/5 p-4">
            <p className="text-2xl font-bold text-primary">₹499</p>
            <p className="text-sm text-muted-foreground">One-time payment</p>
          </div>
          <Button asChild className="w-full" size="lg">
            <Link href="/prelims">{user?.paymentStatus.prelims ? "Start Test" : "Unlock Prelims"}</Link>
          </Button>
        </Card>

        <Card className="p-8">
          <div className="mb-4 flex justify-center">
            <div className="rounded-full bg-secondary/10 p-4">
              <FileText className="h-10 w-10 text-secondary" />
            </div>
          </div>
          <h2 className="mb-2 text-center text-2xl font-bold">Main Examination</h2>
          <p className="mb-6 text-center text-muted-foreground">Descriptive answers with expert evaluation</p>
          <div className="mb-6 space-y-2 text-sm">
            <p>✓ Descriptive questions</p>
            <p>✓ Upload handwritten answers</p>
            <p>✓ Expert mentor review</p>
            <p>✓ Detailed feedback</p>
          </div>
          <div className="mb-4 rounded-lg bg-secondary/5 p-4">
            <p className="text-2xl font-bold text-secondary">₹799</p>
            <p className="text-sm text-muted-foreground">One-time payment</p>
          </div>
          <Button asChild className="w-full" size="lg" variant="secondary">
            <Link href="/mains">{user?.paymentStatus.mains ? "Start Test" : "Unlock Mains"}</Link>
          </Button>
        </Card>
      </div>
    ),
    [user?.paymentStatus.mains, user?.paymentStatus.prelims],
  );

  if (!user) {
    return null;
  }

  const handleLogout = () => {
    logout();
    router.push("/auth");
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <div className="flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">Exam Mentorship</span>
          </div>
          <Button variant="outline" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold">Welcome back, {user.name}!</h1>
          <p className="mt-2 text-muted-foreground">Choose an exam type to begin your preparation journey</p>
        </div>

        <Card className="mb-8 p-6">
          <h2 className="mb-4 text-xl font-bold">Your Profile</h2>
          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <p className="text-sm text-muted-foreground">Email</p>
              <p className="font-medium">{user.email}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Prelims Access</p>
              <div className="flex items-center gap-2">
                {user.paymentStatus.prelims ? (
                  <>
                    <CheckCircle className="h-5 w-5 text-accent" />
                    <span className="font-medium text-accent">Active</span>
                  </>
                ) : (
                  <>
                    <Lock className="h-5 w-5 text-muted-foreground" />
                    <span className="font-medium text-muted-foreground">Locked</span>
                  </>
                )}
              </div>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Mains Access</p>
              <div className="flex items-center gap-2">
                {user.paymentStatus.mains ? (
                  <>
                    <CheckCircle className="h-5 w-5 text-accent" />
                    <span className="font-medium text-accent">Active</span>
                  </>
                ) : (
                  <>
                    <Lock className="h-5 w-5 text-muted-foreground" />
                    <span className="font-medium text-muted-foreground">Locked</span>
                  </>
                )}
              </div>
            </div>
          </div>
        </Card>

        {overviewCards}
      </main>
    </div>
  );
}
