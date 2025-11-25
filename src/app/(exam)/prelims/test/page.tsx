'use client';

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AlertCircle, ArrowLeft, Clock } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useAuth } from "@/contexts/AuthContext";

const mockQuestions = [
  {
    id: 1,
    question: "What is the capital of India?",
    options: ["Mumbai", "New Delhi", "Kolkata", "Chennai"],
    correctAnswer: 1,
  },
  {
    id: 2,
    question: "Who wrote the national anthem of India?",
    options: ["Rabindranath Tagore", "Bankim Chandra Chatterjee", "Sarojini Naidu", "Mahatma Gandhi"],
    correctAnswer: 0,
  },
  {
    id: 3,
    question: "In which year did India gain independence?",
    options: ["1945", "1946", "1947", "1948"],
    correctAnswer: 2,
  },
];

export default function PrelimsTestPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [timeLeft, setTimeLeft] = useState(7200);
  const answersRef = useRef<Record<number, number>>({});

  useEffect(() => {
    answersRef.current = answers;
  }, [answers]);

  useEffect(() => {
    if (!user || !user.paymentStatus.prelims) {
      router.replace("/prelims");
      return;
    }

    const timer = window.setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          window.clearInterval(timer);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => window.clearInterval(timer);
  }, [router, user]);

  const formatTime = useMemo(
    () =>
      (seconds: number) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        return `${hours}:${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
      },
    [],
  );

  const handleAnswerChange = (value: string) => {
    setAnswers((current) => ({ ...current, [currentQuestion]: Number.parseInt(value, 10) }));
  };

  const handleNext = () => {
    if (currentQuestion < mockQuestions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
    }
  };

  const handleSubmit = () => {
    const answersToUse = answersRef.current;

    const score = mockQuestions.reduce((acc, question, index) => {
      return answersToUse[index] === question.correctAnswer ? acc + 1 : acc;
    }, 0);

    const total = mockQuestions.length;
    const percentage = (score / total) * 100;
    const query = new URLSearchParams({
      score: score.toString(),
      total: total.toString(),
      percentage: percentage.toString(),
    });

    router.push(`/prelims/results?${query.toString()}`);
  };

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/dashboard">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Exit
              </Link>
            </Button>
            <div className="flex items-center gap-2 text-muted-foreground">
              <AlertCircle className="h-5 w-5" />
              <span className="text-sm">
                Question {currentQuestion + 1} of {mockQuestions.length}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2 rounded-lg bg-primary/10 px-4 py-2">
            <Clock className="h-5 w-5 text-primary" />
            <span className="text-lg font-bold text-primary">{formatTime(timeLeft)}</span>
          </div>
        </div>

        <Card className="mx-auto max-w-3xl p-8">
          <div className="mb-6">
            <h2 className="mb-4 text-2xl font-bold">Question {currentQuestion + 1}</h2>
            <p className="text-lg">{mockQuestions[currentQuestion].question}</p>
          </div>

          <RadioGroup
            value={answers[currentQuestion]?.toString()}
            onValueChange={handleAnswerChange}
            className="space-y-4"
          >
            {mockQuestions[currentQuestion].options.map((option, index) => (
              <div key={index} className="flex items-center space-x-3 rounded-lg border p-4 hover:bg-muted/50">
                <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer text-base">
                  {option}
                </Label>
              </div>
            ))}
          </RadioGroup>

          <div className="mt-8 flex justify-between gap-4">
            <Button variant="outline" onClick={handlePrevious} disabled={currentQuestion === 0}>
              Previous
            </Button>
            <div className="flex gap-4">
              {currentQuestion < mockQuestions.length - 1 ? (
                <Button onClick={handleNext}>Next</Button>
              ) : (
                <Button onClick={handleSubmit} variant="secondary">
                  Submit Test
                </Button>
              )}
            </div>
          </div>
        </Card>

        <Card className="mx-auto mt-6 max-w-3xl p-6">
          <h3 className="mb-4 font-semibold">Question Navigator</h3>
          <div className="grid grid-cols-10 gap-2">
            {mockQuestions.map((_, index) => (
              <Button
                key={index}
                variant={
                  currentQuestion === index
                    ? "default"
                    : answers[index] !== undefined
                      ? "secondary"
                      : "outline"
                }
                size="sm"
                onClick={() => setCurrentQuestion(index)}
              >
                {index + 1}
              </Button>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
