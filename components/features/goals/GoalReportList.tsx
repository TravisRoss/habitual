import React from 'react'
import { useGoals } from '@/hooks/useGoals'
import GoalReportListItem from './GoalReportListItem'

type GoalReportListProps = {
  isPreview?: boolean;
}

export default function GoalReportList({isPreview}: GoalReportListProps) {
    const { data: goals } = useGoals();

  const goalList = isPreview ? goals?.slice(0, 3) : goals;

  return (
    <ul className="flex flex-col gap-2">
      {goalList?.length === 0 && (
        <li className="text-sm text-muted-foreground">
          No goals yet. Create some to stay motivated!
        </li>
      )}
      {goalList?.map((goal) => (       
        <GoalReportListItem key={goal.id} goal={goal} />
      ))}       
    </ul>
  )
}
