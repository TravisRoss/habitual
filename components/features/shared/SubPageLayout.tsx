import BackButton from "./BackButton";
import { getTranslations } from "next-intl/server";

interface SubPageLayoutProps {
  title: string;
  label?: string;
  children: React.ReactNode;
}

export default async function SubPageLayout({
  title,
  children,
  label,
}: SubPageLayoutProps) {
  const t = await getTranslations("common");

  return (
    <div className="space-y-4">
      <BackButton label={label ?? t("backToDashboard")} />
      <p className="text-2xl font-bold">{title}</p>
      {children}
    </div>
  );
}
