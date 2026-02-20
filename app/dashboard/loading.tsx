import { Spinner } from "@/components/ui/spinner";

export default function DashboardLoading() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <Spinner className="size-10 text-[#F59E0B]" />
    </div>
  );
}
