import { Button, DropdownMenu } from "@radix-ui/themes";
import { CheckIcon } from "@radix-ui/react-icons";
import { Optional } from "~/types/utils";

export interface Option {
  id: string;
  name: string;
}

export type DropdownValue = Optional<Option>;

interface DropdownProps {
  label: string;
  options: Option[];
  value: DropdownValue;
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
      <DropdownMenu.Root>
        <DropdownMenu.Label>{label}</DropdownMenu.Label>
        <DropdownMenu.Trigger>
          <Button variant="soft">
            {value?.name || `Select a ${label.toLowerCase()}`}
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
