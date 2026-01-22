"use client";

import { resetPasswordAction } from "@/app/actions/auth.reset-password";
import { useSearchParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

type FormValues = {
  password: string;
};

export default function ResetPasswordPage() {
  const params = useSearchParams();
  const rawToken = params.get("token"); // string | null
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<FormValues>({
    defaultValues: {
      password: "",
    },
  });

  if (!rawToken) {
    return (
      <div className="mt-20 text-center">
        <p className="text-red-500">Invalid or missing reset token</p>
      </div>
    );
  }

  const token = rawToken;

  async function onSubmit(data: FormValues) {
    await resetPasswordAction(token, data.password);
    router.push("/login");
  }

  return (
    <div className="max-w-md mx-auto mt-20">
      <h1 className="text-xl font-semibold mb-4">Reset Password</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input
          type="password"
          placeholder="New password"
          className="w-full rounded border px-3 py-2"
          autoComplete="new-password"
          {...register("password", {
            required: true,
          })}
        />

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded bg-black py-2 text-white disabled:opacity-60"
        >
          {isSubmitting ? "Resetting..." : "Reset password"}
        </button>
      </form>
    </div>
  );
}
