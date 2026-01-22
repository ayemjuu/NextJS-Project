import { z } from "zod";

export const userFormSchema = z.object({
  id: z.string().optional(),
  email: z.string().email("Invalid email address"),
  firstName: z.string(),
  lastName: z.string(),
  roleId: z.number().int().positive("Role is required"),
  isActive: z.boolean(),
});

export const inviteFormSchema = userFormSchema.extend({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
});

export type UserFormValues = z.infer<typeof userFormSchema>;
export type AddFormValues = z.infer<typeof inviteFormSchema>;
