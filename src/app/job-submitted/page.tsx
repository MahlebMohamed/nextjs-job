import H1 from "@/components/h1";
import React from "react";

export default function page() {
  return (
    <main className="m-auto my-10 max-w-5xl space-y-5 text-center">
      <H1>Thank you for submitting your job posting!</H1>
      <p className="text-muted-foreground">
        We will review your job posting and get back to you as soon as possible.
      </p>
    </main>
  );
}
