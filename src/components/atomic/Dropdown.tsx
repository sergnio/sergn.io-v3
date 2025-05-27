import type { ListBoxItemProps } from "react-aria-components";
import {
  Autocomplete,
  Button,
  Label,
  ListBox,
  ListBoxItem,
  Popover,
  Select,
  SelectValue,
  useFilter,
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
  let { contains } = useFilter({ sensitivity: "base" });

  return (
    <Select name={camelize(label)}>
      <Label>{label}</Label>
      <Button>
        <SelectValue />
        <span aria-hidden="true">▼</span>
      </Button>
      <Popover>
        <Autocomplete filter={contains}>
          <ListBox items={options}>
            {(item) => <SelectItem>{item.name}</SelectItem>}
          </ListBox>
        </Autocomplete>
      </Popover>
    </Select>
  );
};

function SelectItem(props: ListBoxItemProps & { children: string }) {
  return (
    <ListBoxItem {...props} textValue={props.children}>
      {({ isSelected }) => (
        <>
          <span>{props.children}</span>
          {isSelected && <>checked</>}
        </>
      )}
    </ListBoxItem>
  );
}
