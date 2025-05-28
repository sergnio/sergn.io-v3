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

/** Glorious dropdown */
export const Dropdown = ({ label, options }: DropdownProps) => {
  let { contains } = useFilter({ sensitivity: "base" });

  return (
    <Select name={camelize(label)} className="relative inline-block text-left">
      <Label>{label}</Label>
      <Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50">
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
