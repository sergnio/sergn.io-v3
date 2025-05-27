import {
  Button,
  ComboBox,
  Input,
  Label,
  ListBox,
  ListBoxItem,
  Popover,
  Select,
  SelectValue,
} from "react-aria-components";
import { camelize } from "~/utils/transformers";

export interface Option {
  id: string;
  name: string;
}

interface DropdownProps {
  label: string;
  options: Option[];
}

export const Dropdown = ({ label, options }: DropdownProps) => {
  return (
    <Select name={camelize(label)}>
      <Label>{label}</Label>
      <Button>
        <SelectValue />
        <span aria-hidden="true">▼</span>
      </Button>
      <Popover>
        <ListBox key={"fasdfadsf"} items={options} />
          {options.length > 0 ? (
            options.map((method) => (
              <ListBoxItem
                key={method.id}
                textValue={method.name}
                value={method.id as unknown as object}
              >
                {method.name}
              </ListBoxItem>
            ))
          ) : (
            <ListBoxItem>No {label.toLowerCase()} found</ListBoxItem>
          )}
        </ListBox>
      </Popover>
    </Select>
  );
};
