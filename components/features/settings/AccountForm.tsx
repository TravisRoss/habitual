"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { FieldGroup } from "@/components/ui/field";
import { Spinner } from "@/components/ui/spinner";
import { createSignUpSchema, type SignUpFormValues } from "@/lib/zod";
import SignUpFields from "@/components/features/auth/SignUpFields";
import { updateProfileAction } from "@/app/_lib/actions";
import { toast } from "sonner";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

type Props = {
  defaultValues: Pick<SignUpFormValues, "name" | "email">;
};

export default function AccountForm({ defaultValues }: Props) {
  const t = useTranslations("settings.accountPage");
  const tCommon = useTranslations("common");
  const tFields = useTranslations("auth.fields");
  const tVal = useTranslations("validation");
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<SignUpFormValues>({
    resolver: zodResolver(createSignUpSchema(tVal)),
    defaultValues,
  });

  async function handleFormSubmit(data: SignUpFormValues) {
    const result = await updateProfileAction(data);
    if (result?.error) {
      setError("root", { message: result.error });
    }

    toast.success(t("success"));
  }

  function handleReset() {
    reset();
    router.push("/dashboard/settings");
  }

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} noValidate>
      <FieldGroup>
        <SignUpFields
          register={register}
          errors={errors}
          passwordLabel={tFields("newPassword")}
          confirmLabel={tFields("confirmNewPassword")}
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
          variant="outline"
          className="w-full h-12.25 font-nunito font-extrabold text-sm text-white border-0 btn-primary"
        >
          {isSubmitting ? <Spinner className="size-4" /> : t("saveButton")}
        </Button>
        <Button
          variant="outline"
          disabled={isSubmitting}
          className="w-full h-12.25 font-nunito font-extrabold text-sm text-white border-0"
          onClick={handleReset}
        >
          {isSubmitting ? <Spinner className="size-4" /> : tCommon("cancel")}
        </Button>
      </FieldGroup>
    </form>
  );
}
