"use client";

import { forgotPasswordAction } from "@/app/actions/auth.forgot-password";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

type FormValues = {
  email: string;
};

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<FormValues>({
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(data: FormValues) {
    await forgotPasswordAction(data.email);
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
        <div className="w-full max-w-md space-y-5 rounded-xl border bg-white p-6 shadow-sm">
          <h1 className="text-xl font-semibold">Check your email</h1>
          <p className="text-muted-foreground mt-2">
            If the email exists, a reset link has been sent.
          </p>

          <div className="mt-4 text-center text-sm text-gray-600">
            <button
              type="button"
              onClick={() => router.push("/login")}
              className="font-medium text-black hover:underline"
            >
              Back to Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md space-y-5 rounded-xl border bg-white p-6 shadow-sm"
      >
        <h1 className="text-xl font-semibold mb-4">Forgot Password</h1>

        <div className="space-y-1">
          <label className="text-sm font-medium">Email</label>
          <input
            type="email"
            placeholder="Email address"
            className="w-full rounded border px-3 py-2"
            autoComplete="email"
            {...register("email", {
              required: true,
            })}
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded bg-black py-2 text-white disabled:opacity-60"
        >
          {isSubmitting ? "Sending..." : "Send reset link"}
        </button>

        <div className="text-center text-sm text-gray-600">
          <button
            type="button"
            onClick={() => router.push("/login")}
            className="font-medium text-black hover:underline"
          >
            Back to Login
          </button>
        </div>
      </form>
    </div>
  );
}
