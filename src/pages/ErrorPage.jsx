export default function ErrorPage({ resetErrorBoundary }) {
  return (
    <div className="w-full h-full flex flex-col items-center mt-10">
      <div className="flex flex-col items-center">
        <p className="text-center">
          Something went wrong. Try clicking the refresh page button to reload
          the application.
        </p>
        <button
          className="bg-red-400 hover:bg-red-600 px-4 py-1 rounded"
          onClick={resetErrorBoundary}
        >
          Refresh Page
        </button>
      </div>
    </div>
  );
}
