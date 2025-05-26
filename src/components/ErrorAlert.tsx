export const ErrorAlert = ({ message }: { message: string }) => (
  <div
    role="alert"
    className="mt-4 rounded-md bg-red-100 border border-red-300 text-red-800 px-4 py-3"
  >
    {message}
  </div>
);
