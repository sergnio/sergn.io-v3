import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { CheckIcon, ChevronDownIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import clsx from "clsx";

export interface Option {
  id: string;
  name: string;
}

interface DropdownProps {
  label: string;
  options: Option[];
}

/** Radix Dropdown */
export const Dropdown = ({ label, options }: DropdownProps) => {
  const [selected, setSelected] = useState<Option | null>(null);

  return (
    <div className="inline-block text-left">
      <span className="block text-sm font-medium mb-1">{label}</span>

      <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild>
          <button
            className={clsx(
              "inline-flex w-full justify-between items-center rounded-md px-3 py-2 text-sm font-semibold",
              "bg-white text-gray-900 shadow ring-1 ring-gray-300 hover:bg-gray-50",
            )}
          >
            {selected?.name || "Select..."}
            <ChevronDownIcon className="ml-2 h-4 w-4" />
          </button>
        </DropdownMenu.Trigger>

        <DropdownMenu.Portal>
          <DropdownMenu.Content
            sideOffset={5}
            className="z-50 w-[var(--radix-dropdown-menu-trigger-width)] rounded-md bg-white p-1 shadow-lg ring-1 ring-gray-200"
          >
            {options.map((option) => (
              <DropdownMenu.Item
                key={option.id}
                className={clsx(
                  "cursor-pointer select-none rounded-sm px-3 py-2 text-sm text-gray-900 hover:bg-gray-100",
                  selected?.id === option.id && "font-semibold",
                )}
                onSelect={() => setSelected(option)}
              >
                <div className="flex items-center justify-between">
                  <span>{option.name}</span>
                  {selected?.id === option.id && (
                    <CheckIcon className="h-4 w-4 text-green-600" />
                  )}
                </div>
              </DropdownMenu.Item>
            ))}
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    </div>
  );
};
