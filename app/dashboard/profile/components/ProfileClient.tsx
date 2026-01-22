"use client";

import { useForm } from "react-hook-form";
import { changePasswordAction } from "@/app/actions/auth.change-password";
import { useState } from "react";

type Props = {
  user: {
    id: string;
    fullName: string | null;
    email: string;
    role: string;
    createdAt: string;
  };
  session: {
    role: string;
  };
};

type ChangePasswordForm = {
  currentPassword: string;
  newPassword: string;
};

export default function ProfileClient({ user, session }: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ChangePasswordForm>();

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(data: ChangePasswordForm) {
    setError(null);
    setSuccess(false);

    try {
      await changePasswordAction(data.currentPassword, data.newPassword);

      setSuccess(true);
      reset(); // clears form
    } catch (err: any) {
      setError(err?.message ?? "Something went wrong");
    }
  }

  return (
    <div className="max-w-lg space-y-6">
      {/* Profile info */}
      <div className="rounded-lg border bg-white p-6 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gray-900 text-lg font-semibold text-white">
            {user.fullName?.[0] ?? "U"}
          </div>

          <div>
            <p className="text-lg font-medium">
              {user.fullName ?? "Unnamed User"}
            </p>
            <p className="text-sm text-muted-foreground">{user.email}</p>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <InfoRow label="Role" value={user.role} />
          <InfoRow
            label="Joined"
            value={new Date(user.createdAt).toLocaleDateString()}
          />
          <InfoRow label="Session Role" value={session.role} />
        </div>
      </div>

      {/* Change password */}
      <div className="rounded border p-4">
        <h2 className="mb-3 font-medium">Change Password</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          <div>
            <input
              type="password"
              placeholder="Current password"
              className="w-full rounded border px-3 py-2"
              autoComplete="off"
              {...register("currentPassword", {
                required: "Current password is required",
              })}
            />
            {errors.currentPassword && (
              <p className="text-sm text-red-500">
                {errors.currentPassword.message}
              </p>
            )}
          </div>

          <div>
            <input
              type="password"
              placeholder="New password"
              className="w-full rounded border px-3 py-2"
              autoComplete="off"
              {...register("newPassword", {
                required: "New password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
              })}
            />
            {errors.newPassword && (
              <p className="text-sm text-red-500">
                {errors.newPassword.message}
              </p>
            )}
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}
          {success && (
            <p className="text-sm text-green-600">
              Password updated successfully
            </p>
          )}

          <button
            disabled={isSubmitting}
            className="rounded bg-black px-4 py-2 text-white disabled:opacity-50"
          >
            {isSubmitting ? "Updating..." : "Update password"}
          </button>
        </form>
      </div>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="text-sm font-medium">{value}</p>
    </div>
  );
}
