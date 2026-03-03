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
      <CardHeader>
        <CardTitle className="flex justify-between">
          {title && <p className="text-lg font-semibold mb-3">{title}</p>}
          {action}
        </CardTitle>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}
