import { CreateGoalButton } from "@/components/features/CreateGoalButton";
import GoalsList from "@/components/features/GoalsList";
import SubPageLayout from "@/components/features/SubPageLayout";

export default function page() {
  return (
    <SubPageLayout title="Your Goals">
      <GoalsList />
      <CreateGoalButton />
    </SubPageLayout>
  );
}
