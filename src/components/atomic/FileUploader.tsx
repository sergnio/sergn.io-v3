import { FileTrigger, Button } from "react-aria-components";
import { useState } from "react";
import { Undefinable } from "~/types/utils";

export const FileUploader = () => {
  let [file, setFile] = useState<Undefinable<string>>();

  return (
    <>
      <FileTrigger
        acceptedFileTypes={["image/*"]}
        acceptDirectory={false}
        allowsMultiple={false}
        onSelect={(e) => {
          const files = e ? Array.from(e) : [];
          const filenames = files.map((file) => file.name);
          setFile(filenames[0]);
        }}
      >
        <Button>Select a file</Button>
      </FileTrigger>
      {file && file}
    </>
  );
};
