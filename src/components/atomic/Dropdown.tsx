import { DropdownMenu, Button } from "@radix-ui/themes";
import { CheckIcon } from "@radix-ui/react-icons";
import { useState } from "react";

export interface Option {
  id: string;
  name: string;
}

interface DropdownProps {
  label: string;
  options: Option[];
  value: Option | null;
  onChange: (option: Option) => void;
}

export const Dropdown = ({
  label,
  options,
  value,
  onChange,
}: DropdownProps) => {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">{label}</label>

      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <Button variant="soft">
            {value?.name || "Select..."}
            <DropdownMenu.TriggerIcon />
          </Button>
        </DropdownMenu.Trigger>

        <DropdownMenu.Content variant="soft">
          {options.map((option) => (
            <DropdownMenu.Item
              key={option.id}
              onSelect={() => onChange(option)}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <span>{option.name}</span>
                {value?.id === option.id && <CheckIcon color="green" />}
              </div>
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </div>
  );
};
