import { FileTrigger, Button } from "react-aria-components";
import { useRef, useState } from "react";
import { Nullable, Undefinable } from "~/types/utils";

export const FileUploader = () => {
  const [file, setFile] = useState<Nullable<File>>(null);
  const hiddenInputRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <input
        ref={hiddenInputRef}
        type="file"
        name="coffeeImage"
        accept="image/*"
        style={{ display: "none" }}
        onChange={(e) => {
          const selectedFile = e.target.files?.[0] ?? null;
          setFile(selectedFile);
        }}
      />
      <FileTrigger
        acceptedFileTypes={["image/*"]}
        acceptDirectory={false}
        allowsMultiple={false}
        onSelect={(files) => {
          const file = files?.[0] ?? null;
          setFile(file);
          if (hiddenInputRef.current) {
            hiddenInputRef.current.files = files;
          }
        }}
      >
        <Button>Select a file</Button>
      </FileTrigger>
      {file && file.name}
    </>
  );
};
