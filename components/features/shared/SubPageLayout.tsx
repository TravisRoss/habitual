import BackButton from "./BackButton";

interface SubPageLayoutProps {
  title: string;
  children: React.ReactNode;
}

export default function SubPageLayout({ title, children }: SubPageLayoutProps) {
  return (
    <div className="space-y-4">
      <BackButton href="/dashboard" label="Back to Dashboard" />
      <p className="text-2xl font-bold">{title}</p>
      {children}
    </div>
  );
}
