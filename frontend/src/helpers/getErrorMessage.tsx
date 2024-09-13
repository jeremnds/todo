import { FieldError } from "react-hook-form";

export const getErrorMessage = (error: FieldError | undefined) => {
  return (
    error?.message && (
      <div className="pb-2">
        <span className="text-md text-red-600">{error.message}</span>
      </div>
    )
  );
};
