
type Props = {
  message?: string;
  onRetry?: () => void;
};

export default function ErrorState({
  message,
  onRetry,
}: Props) {

  return (
    <div className="text-center text-red-400 p-6">
      <p>{message ?? "Error"}</p>

      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-3 px-4 py-2 bg-red-600 rounded"
        >
          Retry
        </button>
      )}
    </div>
  );
}