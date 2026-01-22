"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { CustomInput } from "@/components/CustomInput";
import { useRouter } from "next/navigation";
import { registerUserAction } from "@/app/actions/auth.register";

const registerSchema = z
  .object({
    token: z.string(),
    // phoneNumber: z
    //   .string()
    //   .min(1, "Phone number is required")
    //   .regex(/^\+?\d{7,15}$/, "Invalid phone number"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(6),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type RegisterFormValues = z.infer<typeof registerSchema>;

type Props = {
  inviteData: {
    email: string;
    firstName: string;
    lastName: string;
    roleName: string;
  };
  token: string;
};

export default function RegisterForm({ inviteData, token }: Props) {
  const router = useRouter();

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      token,
      // phoneNumber: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(data: RegisterFormValues) {
    try {
      await registerUserAction(data);
      router.push("/login");
    } catch (err: any) {
      alert(err.message || "Registration failed");
    }
  }

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="max-w-md mx-auto space-y-4"
    >
      <h1 className="text-2xl font-bold mb-4">Complete Your Registration</h1>

      {/* Prefilled, disabled inputs */}
      <CustomInput label="Email" value={inviteData.email} disabled />
      <CustomInput label="First Name" value={inviteData.firstName} disabled />
      <CustomInput label="Last Name" value={inviteData.lastName} disabled />
      <CustomInput label="Role Name" value={inviteData.roleName} disabled />

      <input type="hidden" {...form.register("token")} value={token} />

      {/* Editable inputs */}
      {/* <CustomInput
        label="Phone Number"
        placeholder="+1234567890"
        error={form.formState.errors.phoneNumber?.message}
        {...form.register("phoneNumber")}
      /> */}
      <CustomInput
        label="Password"
        type="password"
        error={form.formState.errors.password?.message}
        {...form.register("password")}
      />
      <CustomInput
        label="Confirm Password"
        type="password"
        error={form.formState.errors.confirmPassword?.message}
        {...form.register("confirmPassword")}
      />

      <Button type="submit" className="w-full">
        Register
      </Button>
    </form>
  );
}
