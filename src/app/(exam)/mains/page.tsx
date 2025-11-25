'use client';

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, CheckCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";

export default function MainsOverviewPage() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.replace("/auth");
    }
  }, [router, user]);

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <Button variant="ghost" className="mb-6" asChild>
          <Link href="/dashboard">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Link>
        </Button>

        <div className="mx-auto max-w-3xl">
          <h1 className="mb-6 text-4xl font-bold">Main Examination</h1>

          {!user.paymentStatus.mains ? (
            <Card className="p-8">
              <h2 className="mb-6 text-2xl font-bold">Exam Details</h2>
              <div className="mb-8 space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="mt-1 h-5 w-5 text-accent" />
                  <div>
                    <p className="font-semibold">Descriptive Questions</p>
                    <p className="text-sm text-muted-foreground">Essay-type questions requiring detailed answers</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="mt-1 h-5 w-5 text-accent" />
                  <div>
                    <p className="font-semibold">Upload Handwritten Answers</p>
                    <p className="text-sm text-muted-foreground">Write answers on paper and upload photos</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="mt-1 h-5 w-5 text-accent" />
                  <div>
                    <p className="font-semibold">Expert Evaluation</p>
                    <p className="text-sm text-muted-foreground">Your answers will be reviewed by experienced mentors</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="mt-1 h-5 w-5 text-accent" />
                  <div>
                    <p className="font-semibold">Detailed Feedback</p>
                    <p className="text-sm text-muted-foreground">Receive comprehensive feedback to improve</p>
                  </div>
                </div>
              </div>

              <div className="mb-6 rounded-lg bg-secondary/5 p-6">
                <p className="mb-2 text-3xl font-bold text-secondary">₹799</p>
                <p className="text-muted-foreground">One-time payment for lifetime access</p>
              </div>

              <Button className="w-full" size="lg" variant="secondary" asChild>
                <Link href="/mains/payment">Proceed to Payment</Link>
              </Button>
            </Card>
          ) : (
            <Card className="p-8">
              <div className="mb-6 text-center">
                <CheckCircle className="mx-auto mb-4 h-16 w-16 text-accent" />
                <h2 className="text-2xl font-bold">You have access to Mains!</h2>
                <p className="mt-2 text-muted-foreground">Ready to attempt the descriptive exam?</p>
              </div>
              <Button className="w-full" size="lg" variant="secondary" asChild>
                <Link href="/mains/questions">View Questions</Link>
              </Button>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
