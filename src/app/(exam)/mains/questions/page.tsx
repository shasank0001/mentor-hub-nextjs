'use client';

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, CheckCircle, FileText, Upload } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";

const mockQuestions = [
  {
    id: 1,
    question:
      "Discuss the impact of climate change on India's agricultural sector. Suggest measures to adapt to these changes.",
    marks: 15,
  },
  {
    id: 2,
    question: "Analyze the role of women in India's freedom struggle and their contribution to nation-building.",
    marks: 15,
  },
  {
    id: 3,
    question: "Explain the significance of the Green Revolution in India. What were its positive and negative impacts?",
    marks: 20,
  },
];

export default function MainsQuestionsPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [uploadedFiles, setUploadedFiles] = useState<Record<number, File>>({});

  useEffect(() => {
    if (!user || !user.paymentStatus.mains) {
      router.replace("/mains");
    }
  }, [router, user]);

  const handleFileUpload = (questionId: number, file: File | null) => {
    if (!file) {
      return;
    }

    setUploadedFiles((current) => ({ ...current, [questionId]: file }));
    toast.success(`Answer sheet for Question ${questionId} uploaded`);
  };

  const handleSubmit = () => {
    const uploadedCount = Object.keys(uploadedFiles).length;

    if (uploadedCount === 0) {
      toast.error("Please upload at least one answer sheet");
      return;
    }

    toast.success("Answer sheets submitted successfully! Your mentor will review them soon.");
    router.push("/dashboard");
  };

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

        <div className="mx-auto max-w-4xl">
          <div className="mb-8">
            <h1 className="mb-2 text-4xl font-bold">Main Examination Questions</h1>
            <p className="text-muted-foreground">Write your answers on paper, take clear photos, and upload them below</p>
          </div>

          <div className="space-y-6">
            {mockQuestions.map((question) => (
              <Card key={question.id} className="p-6">
                <div className="mb-4 flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <div className="rounded-full bg-secondary/10 p-2">
                      <FileText className="h-5 w-5 text-secondary" />
                    </div>
                    <div>
                      <h3 className="mb-2 text-lg font-bold">Question {question.id}</h3>
                      <p className="text-foreground">{question.question}</p>
                    </div>
                  </div>
                  <div className="rounded-lg bg-secondary/10 px-3 py-1">
                    <span className="text-sm font-semibold text-secondary">{question.marks} marks</span>
                  </div>
                </div>

                <div className="mt-6 rounded-lg border-2 border-dashed border-border bg-muted/30 p-6">
                  <Label htmlFor={`file-${question.id}`} className="cursor-pointer">
                    <div className="flex flex-col items-center gap-2 text-center">
                      {uploadedFiles[question.id] ? (
                        <>
                          <CheckCircle className="h-10 w-10 text-accent" />
                          <p className="font-medium text-accent">{uploadedFiles[question.id]?.name}</p>
                          <p className="text-sm text-muted-foreground">Click to change file</p>
                        </>
                      ) : (
                        <>
                          <Upload className="h-10 w-10 text-muted-foreground" />
                          <p className="font-medium">Upload Answer Sheet</p>
                          <p className="text-sm text-muted-foreground">Click to select a file (JPG, PNG, or PDF)</p>
                        </>
                      )}
                    </div>
                  </Label>
                  <Input
                    id={`file-${question.id}`}
                    type="file"
                    accept="image/*,.pdf"
                    className="hidden"
                    onChange={(event) => handleFileUpload(question.id, event.target.files?.[0] ?? null)}
                  />
                </div>
              </Card>
            ))}
          </div>

          <Card className="mt-6 p-6">
            <div className="mb-4">
              <h3 className="mb-2 text-lg font-bold">Upload Summary</h3>
              <p className="text-muted-foreground">
                {Object.keys(uploadedFiles).length} of {mockQuestions.length} answers uploaded
              </p>
            </div>
            <Button
              onClick={handleSubmit}
              size="lg"
              className="w-full"
              variant="secondary"
              disabled={Object.keys(uploadedFiles).length === 0}
            >
              Submit All Answers
            </Button>
            <p className="mt-2 text-center text-sm text-muted-foreground">
              You can submit even if you haven't completed all questions
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}
