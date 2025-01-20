export default function ConfirmationEmailMessage({
  isVisible,
  setConfirmEmailMessage,
}) {
  if (!isVisible) return null;
  return (
    <div className="fixed top-20 right-2 text-black text-sm w-72 p-4 bg-white shadow-lg rounded-lg border border-gray-200">
      <div className="w-2 bg-blue-500 absolute left-0 top-0 bottom-0 rounded-l-lg"></div>
      <p className="ml-6">
        Please verify your email to enable workout tracking.
      </p>
      <button
        onClick={(e) => {
          e.stopPropagation();
          setConfirmEmailMessage(false);
        }}
        className="absolute top-2 right-2 text-gray-400 hover:text-black focus:outline-none"
      >
        ✖
      </button>
    </div>
  );
}
