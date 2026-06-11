type Props = {
  message?: string;
};

export default function EmptyState({ message }: Props) {

  return (
    <div className="text-center text-gray-400 p-6">
      {message ?? "Empty"}
    </div>
  );
}