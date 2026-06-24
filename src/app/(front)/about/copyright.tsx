"use client";

export function Copyright({ text }: { text: string }) {
  return <>{new Date().getFullYear()} {text}</>;
}
