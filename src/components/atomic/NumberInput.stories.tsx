import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { NumberInput } from "./NumberInput";
import { Form } from "radix-ui";

const meta: Meta<typeof NumberInput> = {
  title: "Atomic/NumberInput",
  component: NumberInput,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof NumberInput>;

export const Default: Story = {
  render: (args) => {
    return (
      <Form.Root>
        <NumberInput {...args} />
      </Form.Root>
    );
  },
  args: {
    label: "Example",
    incrementDecrementButtons: true,
  },
};
