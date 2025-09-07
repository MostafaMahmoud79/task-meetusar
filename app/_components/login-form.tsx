"use client";

import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import CustomInputField from "./custom-input-field";
import { LockKeyhole, Mail } from "lucide-react";
import clsx from "clsx";
import {
  LoginFormInputs,
  loginFormSchema,
} from "@/lib/validation/login-schema";
import { loginAction } from "@/lib/server/actions/login-action";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();
  const form = useForm<LoginFormInputs>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: LoginFormInputs) {
    const response = await loginAction(values);
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    if (response.status === "success") {
      router.replace("/dashboard");
    } else {
      form.setError("root", {
        message: response.error.message,
      });
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-9 w-full">
        <div className="space-y-5">
          <CustomInputField
            control={form.control}
            name="email"
            placeholder="email"
            icon={<Mail className="size-6 text-[#1A1A1E]" />}
          />
          <CustomInputField
            type="password"
            control={form.control}
            name="password"
            placeholder="password"
            icon={<LockKeyhole className="size-6 text-[#1A1A1E]" />}
          />
        </div>

        <button
          type="submit"
          className={clsx(
            "rounded-[8px] text-white w-full py-3 px-5 capitalize",
            {
              "bg-gray-400":
                !form.formState.isValid || form.formState.isSubmitting,
              "bg-[#9414FF] cursor-pointer":
                form.formState.isValid && !form.formState.isSubmitting,
            }
          )}
        >
          {form.formState.isSubmitting ? "Loading.." : "login"}
        </button>
        {form.formState.errors.root && !form.formState.isSubmitting && (
          <p className="text-destructive text-lg text-center">
            {form.formState.errors.root?.message}
          </p>
        )}
      </form>
    </Form>
  );
}
