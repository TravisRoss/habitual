import { Button } from "@/components/ui/button";
import type { LucideIcon } from "lucide-react";

export const itemCls =
  "flex h-auto w-full items-center gap-3 rounded-md bg-muted/50 p-4 text-sm font-normal transition-colors hover:bg-accent hover:text-brand active:opacity-90";

type SettingItemProps = {
  icon: LucideIcon;
  label: string;
  value?: string;
  onClick?: () => void;
};

export default function SettingItem({ icon: Icon, label, value, onClick }: SettingItemProps) {
  return (
    <Button variant="ghost" className={itemCls} onClick={onClick}>
      <Icon className="size-5 shrink-0" />
      <span className="flex-1 text-left">{label}</span>
      {value && <span className="text-muted-foreground capitalize">{value}</span>}
    </Button>
  );
}
