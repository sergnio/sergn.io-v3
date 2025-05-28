import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { FileUploader, FileValue } from "./FileUploader";

const meta: Meta<typeof FileUploader> = {
  title: "Atomic/FileUploader",
  component: FileUploader,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof FileUploader>;

export const Default: Story = {
  render: (args) => {
    const [file, setFile] = useState<FileValue>(undefined);

    return <FileUploader {...args} file={file} onChange={setFile} />;
  },
  args: {},
};
