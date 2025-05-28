import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Dropdown, Option } from "./Dropdown";

const meta: Meta<typeof Dropdown> = {
  title: "Dropdown/Dropdown",
  component: Dropdown,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Dropdown>;

export const Default: Story = {
  render: (args) => {
    const [selected, setSelected] = useState<Option | null>(null);

    return (
      <Dropdown
        {...args}
        value={selected}
        onChange={(option) => setSelected(option)}
      />
    );
  },
  args: {
    label: "Example",
    options: [
      { id: "abc-fde", name: "Option 1" },
      { id: "abc-153", name: "Option 2" },
      { id: "abc-199", name: "Option 3" },
    ],
  },
};
