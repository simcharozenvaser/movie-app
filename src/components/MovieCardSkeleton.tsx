export default function MovieCardSkeleton() {
  return (
    <div className="w-[220px] h-[360px] bg-gray-800 rounded-xl animate-pulse flex flex-col">
      <div className="w-full h-[260px] bg-gray-700" />
      <div className="p-3 space-y-2">
        <div className="h-4 bg-gray-700 rounded w-3/4" />
        <div className="h-3 bg-gray-700 rounded w-1/2" />
        <div className="h-3 bg-gray-700 rounded w-1/3" />
      </div>
    </div>
  );
}