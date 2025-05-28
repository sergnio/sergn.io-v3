import { useRef } from "react";
import { Optional } from "~/types/utils";

export type FileValue = Optional<File>;

interface Props {
  file: FileValue;
  onChange: (file: FileValue) => void;
}
export const FileUploader = ({ file, onChange }: Props) => {
  const hiddenInputRef = useRef<HTMLInputElement>(null);

  return (
    <div>
      <button
        type="button"
        onClick={() => hiddenInputRef.current?.click()}
        className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
      >
        {file ? "Change file" : "Choose a file"}
      </button>
      <input
        ref={hiddenInputRef}
        type="file"
        name="coffeeImage"
        accept="image/*"
        onChange={(e) => {
          const selectedFile = e.target.files?.[0] ?? null;
          onChange(selectedFile);
        }}
        className="hidden"
        aria-hidden
      />

      {file && <p className="mt-2 text-sm text-gray-700">{file.name}</p>}
    </div>
  );
};
