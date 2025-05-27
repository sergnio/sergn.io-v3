import {
  ComboBox,
  Label,
  Input,
  Button,
  Popover,
  ListBox,
  ListBoxItem,
} from "react-aria-components";
import { Key } from "react";
import { camelize } from "~/utils/transformers";

export interface Option {
  id: string;
  name: string;
}

interface DropdownProps {
  label: string;
  options: Option[];
  onSelectionChange?: (key: Key) => void;
}

export const Dropdown = ({
  label,
  options,
  onSelectionChange,
}: DropdownProps) => {
  return (
    <ComboBox onSelectionChange={(e) => onSelectionChange?.(e as Key)}>
      <Label>{label}</Label>
      <div className="relative flex items-center gap-1">
        <Input name={camelize(label)} />
        <Button>▼</Button>
      </div>
      <Popover>
        <ListBox>
          {options.length > 0 ? (
            options.map((method) => (
              <ListBoxItem key={method.id} textValue={method.name}>
                {method.name}
              </ListBoxItem>
            ))
          ) : (
            <ListBoxItem>No brew methods found</ListBoxItem>
          )}
        </ListBox>
      </Popover>
    </ComboBox>
  );
};
