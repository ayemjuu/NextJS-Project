"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";

export type SelectOption = {
  label: string;
  value: string;
};

type CustomSelectProps = {
  label: string;
  required?: boolean;
  error?: string;
  value?: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  placeholder?: string;
  className?: string;
  disabled?: boolean;
};

export function CustomSelect({
  label,
  required,
  error,
  value,
  onChange,
  options,
  placeholder = "Select an option",
  className,
  disabled,
}: CustomSelectProps) {
  return (
    <div className="space-y-1">
      {/* Label + Error */}
      <div className="flex items-center justify-between">
        <Label>
          {label}
          {required && <span className="ml-1 text-red-500">*</span>}
        </Label>

        {error && <span className="text-xs text-red-600">{error}</span>}
      </div>

      {/* Select */}
      <Select value={value} onValueChange={onChange} disabled={disabled}>
        <SelectTrigger
          className={cn(
            "w-full",
            error && "border-destructive focus:ring-destructive",
            className
          )}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>

        <SelectContent>
          {options.map((opt) => (
            <SelectItem key={opt.value} value={opt.value}>
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
