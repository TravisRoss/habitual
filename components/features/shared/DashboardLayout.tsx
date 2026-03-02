import { ReactNode } from "react";

type DashboardLayoutProps = {
  title: string;
  titleAction?: ReactNode;
  children: ReactNode;
};

export default function DashboardLayout({ title, titleAction, children }: DashboardLayoutProps) {
  return (
    <div className="max-w-lg mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-1">
        <p className="text-2xl font-bold">{title}</p>
        {titleAction}
      </div>
      
      <div className="space-y-4 mt-4">
        {children}
      </div>
    </div>
  );
}
