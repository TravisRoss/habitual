import { CreateGoalButton } from "@/components/features/goals/CreateGoalButton";
import GoalsList from "@/components/features/goals/GoalsList";
import SubPageLayout from "@/components/features/shared/SubPageLayout";

export default function page() {
  return (
    <SubPageLayout title="Your Goals">
      <GoalsList />
      <CreateGoalButton />
    </SubPageLayout>
  );
}
