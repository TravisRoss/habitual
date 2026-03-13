"use client";

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreVertical, Pencil, Target, Trash2 } from "lucide-react";
import { useTranslations } from "next-intl";

type BurgerMenuProps = {
  onEdit: () => void;
  onDelete: () => void;
  onAddGoal?: () => void;
};

export default function BurgerMenu({ onEdit, onDelete, onAddGoal }: BurgerMenuProps) {
  const t = useTranslations("common");
  const tHabits = useTranslations("habits");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center p-1 text-muted-foreground hover:text-foreground">
          <MoreVertical className="h-4 w-4" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onSelect={onEdit}>
          <Pencil className="h-4 w-4 mr-2" />
          <span>{t("edit")}</span>
        </DropdownMenuItem>
        {onAddGoal && (
          <DropdownMenuItem onSelect={onAddGoal}>
            <Target className="h-4 w-4 mr-2" />
            <span>{tHabits("addGoal")}</span>
          </DropdownMenuItem>
        )}
        <DropdownMenuItem className="text-destructive" onSelect={onDelete}>
          <Trash2 className="h-4 w-4 mr-2" />
          <span>{t("delete")}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
