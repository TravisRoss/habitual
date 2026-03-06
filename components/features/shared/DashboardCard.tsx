import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ReactNode } from "react";

type DashboardCardProps = {
  title?: string;
  children: ReactNode;
  action?: ReactNode;
};

export default function DashboardCard({
  title,
  children,
  action,
}: DashboardCardProps) {
  return (
    <Card>
      {(title || action) && (
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            {title && <p className="text-lg font-semibold">{title}</p>}
            {action}
          </CardTitle>
        </CardHeader>
      )}
      <CardContent>{children}</CardContent>
    </Card>
  );
}
