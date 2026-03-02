import { ReactNode } from "react";

type DashboardSectionProps = {
  title?: string;
  children: ReactNode;
  action?: ReactNode;
};

export default function DashboardSection({ title, children, action }: DashboardSectionProps) {
  return (
    <div className="bg-muted/50 rounded-2xl p-5 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        {title && <p className="text-lg font-semibold mb-3">{title}</p>}
        {action}
      </div>
      
      {children}
    </div>
  );
}
