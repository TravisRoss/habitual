"use client";

import GoalReportList from '@/components/features/goals/GoalReportList'
import { ReportSelect } from '@/components/features/progress/ProgressSelect';
import BackButton from '@/components/features/shared/BackButton';
import { ReportPeriod } from '@/types';
import { useState } from 'react';


export default function page() {
  const [value, setValue] = useState<ReportPeriod>("Weekly")

  return (
    <>
      <div className="flex justify-between items-center mb-2">
        <BackButton label={"Back to Progress"}/>
        <ReportSelect value={value} onChange={(value) => {setValue(value)}} />
      </div>
      <GoalReportList />
    </>
  )
}
