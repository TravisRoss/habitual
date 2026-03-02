import { Skeleton } from "../ui/skeleton";

type ListSkeletonProps = {
  count?: number;
};

export default function ListSkeleton({ count = 3 }: ListSkeletonProps) {
  return (
    <ul className="flex flex-col gap-2">
      {Array.from({ length: count }).map((_, i) => (
        <li key={i}>
          <Skeleton className="h-12 w-full rounded-xl bg-muted" />
        </li>
      ))}
    </ul>
  );
}
