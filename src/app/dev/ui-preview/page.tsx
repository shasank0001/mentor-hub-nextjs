'use client';

import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function UIPreviewPage() {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <main className="container mx-auto flex max-w-3xl flex-col gap-8 py-12">
      <section className="space-y-4">
        <h1 className="text-3xl font-bold">UI Preview</h1>
        <p className="text-muted-foreground">
          Quick smoke-test page to confirm shadcn/ui components render as expected in the Next.js app.
        </p>
        <div className="flex flex-wrap gap-4">
          <Button>Primary Button</Button>
          <Button variant="outline">Outline Button</Button>
          <Button variant="ghost">Ghost Button</Button>
        </div>
      </section>

      <Card>
        <CardHeader>
          <CardTitle>Example Card</CardTitle>
          <CardDescription>Demonstrates card layout and typography tokens.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>Cards are useful for grouping related content.</p>
          <div className="grid gap-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" placeholder="Jane Doe" />
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button>Save changes</Button>
        </CardFooter>
      </Card>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogTrigger asChild>
          <Button variant="secondary">Open Dialog</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Dialog Example</DialogTitle>
            <DialogDescription>
              Use this modal to validate overlay, focus trapping, and close behavior.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-2 py-4">
            <Label htmlFor="email">Email</Label>
            <Input id="email" placeholder="jane@example.com" type="email" />
          </div>
          <DialogFooter className="gap-2">
            <Button variant="ghost" onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setDialogOpen(false)}>Confirm</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </main>
  );
}
