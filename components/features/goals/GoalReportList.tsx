import React from 'react'
import { useGoals } from '@/hooks/useGoals'
import GoalReportListItem from './GoalReportListItem'

export default function GoalReportList() {
    const { data: goals } = useGoals();

  return (
    <div>
      {goals?.length === 0 && (
        <li className="text-sm text-muted-foreground">
          No goals yet. Create some to stay motivated!
        </li>
      )}
      {goals?.map((goal) => (       
        <GoalReportListItem key={goal.id} goal={goal} />
      ))}       
    </div>
  )
}
