"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { FieldGroup } from "@/components/ui/field";
import { Spinner } from "@/components/ui/spinner";
import { signUpSchema, type SignUpFormValues } from "@/lib/zod";
import SignUpFields from "@/components/features/auth/SignUpFields";
import { updateProfileAction } from "@/app/_lib/actions";
import { toast } from "sonner";

type Props = {
  defaultValues: Pick<SignUpFormValues, "name" | "email">;
};

export default function AccountForm({ defaultValues }: Props) {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues,
  });

  async function handleFormSubmit(data: SignUpFormValues) {
    const result = await updateProfileAction(data);
    if (result?.error) {
      setError("root", { message: result.error });
    }

    toast.success("Profile updated successfully.");
  }

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} noValidate>
      <FieldGroup>
        <SignUpFields
          register={register}
          errors={errors}
          passwordLabel="New Password"
          confirmLabel="Confirm New Password"
        />

        {errors.root && (
          <p
            role="alert"
            className="text-sm text-red-500 font-nunito text-center"
          >
            {errors.root.message}
          </p>
        )}

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full h-[49px] font-nunito font-extrabold text-sm text-white border-0 btn-primary"
        >
          {isSubmitting ? <Spinner className="size-4" /> : "Save Changes"}
        </Button>
      </FieldGroup>
    </form>
  );
}
