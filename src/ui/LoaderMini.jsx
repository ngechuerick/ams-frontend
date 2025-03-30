export default function LoaderMini() {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
      <p className="mt-3 text-lg font-medium text-gray-700">Loading data...</p>
    </div>
  );
}
