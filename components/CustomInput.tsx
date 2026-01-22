"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

type CustomInputProps = {
  label: string;
  required?: boolean;
  error?: string;
  className?: string;
} & React.ComponentProps<typeof Input>;

export function CustomInput({
  label,
  required,
  error,
  className,
  id,
  ...props
}: CustomInputProps) {
  const inputId = id ?? props.name;

  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between">
        <Label htmlFor={inputId}>
          {label}
          {required && <span className="text-red-500">*</span>}
        </Label>

        {error && <span className="text-xs text-red-600">{error}</span>}
      </div>

      <Input
        id={inputId}
        aria-invalid={Boolean(error)}
        className={cn(className)}
        {...props}
      />
    </div>
  );
}
