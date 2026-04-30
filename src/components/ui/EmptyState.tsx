type Props = {
  message?: string;
};

export default function EmptyState({
  message = "No data available",
}: Props) {
  return (
    <div className="text-center text-gray-400 p-6">
      {message}
    </div>
  );
}