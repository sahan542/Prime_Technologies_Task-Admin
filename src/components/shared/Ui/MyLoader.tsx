"use client";

import { cn } from "@/lib/utils";
import "@/styles/loader.css";
import { LoaderSpinner } from "./LoaderSpinner";

interface LoaderProps {
  className?: string;
  text?: string;
}

export function MyLoader({ className, text = "Loading..." }: LoaderProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-4 min-h-screen p-4",
        className
      )}
    >
      {/* <div className="relative">
        <div className="loading-spin-slow relative flex items-center justify-center rounded-full w-40 h-40">
          <CrescentMoon className="text-primary absolute" size={40} />
          <div className="absolute inset-0">
            <Skeleton className="h-full w-full rounded-full opacity-20" />
          </div>
        </div>
      </div> */}
      <LoaderSpinner strokeWidth={2} size={60} />
      {text && (
        <p className="text-center text-lg font-medium text-muted-foreground animate-pulse">
          {text}
        </p>
      )}
    </div>
  );
}
