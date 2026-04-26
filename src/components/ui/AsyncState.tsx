import ErrorState from "./ErrorState";
import EmptyState from "./EmptyState";

type Props = {
  loading?: boolean;
  error?: string | null;
  isEmpty?: boolean;
  skeleton?: React.ReactNode;
  children: React.ReactNode;
};

export default function AsyncState({
  loading,
  error,
  isEmpty,
  skeleton,
  children,
}: Props) {
  if (loading) {
    return <>{skeleton}</>;
  }

  if (error) {
    return <ErrorState message={error} />;
  }

  if (isEmpty) {
    return <EmptyState />;
  }

  return <>{children}</>;
}