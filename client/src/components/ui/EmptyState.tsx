import { useTranslation } from "react-i18next";

type Props = {
  message?: string;
};

export default function EmptyState({ message }: Props) {
  const { t } = useTranslation();

  return (
    <div className="text-center text-gray-400 p-6">
      {message ?? t("state.empty")}
    </div>
  );
}