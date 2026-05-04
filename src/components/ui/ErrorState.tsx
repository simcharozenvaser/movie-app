import { useTranslation } from "react-i18next";

type Props = {
  message?: string;
  onRetry?: () => void;
};

export default function ErrorState({
  message,
  onRetry,
}: Props) {
  const { t } = useTranslation();

  return (
    <div className="text-center text-red-400 p-6">
      <p>{message ?? t("state.error")}</p>

      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-3 px-4 py-2 bg-red-600 rounded"
        >
          {t("common.retry")}
        </button>
      )}
    </div>
  );
}