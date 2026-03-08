import BackButton from "./BackButton";

interface SubPageLayoutProps {
  title: string;
  label?: string;
  children: React.ReactNode;
}

export default function SubPageLayout({
  title,
  children,
  label,
}: SubPageLayoutProps) {
  return (
    <div className="space-y-4">
      <BackButton label={label || "Back to Dashboard"} />
      <p className="text-2xl font-bold">{title}</p>
      {children}
    </div>
  );
}
