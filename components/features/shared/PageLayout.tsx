import BackButton from "./BackButton";
import { ReactNode } from "react";

type PageLayoutProps = {
  title: ReactNode;
  titleAction?: ReactNode;
  back?: string;
  backHref?: string;
  children: ReactNode;
};

export default function PageLayout({
  title,
  titleAction,
  back,
  backHref,
  children,
}: PageLayoutProps) {
  return (
    <div className="max-w-3xl mx-auto space-y-4">
      {back && <BackButton label={back} href={backHref} />}
      <div className="flex items-center justify-between">
        <p className="text-2xl font-bold">{title}</p>
        {titleAction}
      </div>
      <div className="space-y-4">{children}</div>
    </div>
  );
}
