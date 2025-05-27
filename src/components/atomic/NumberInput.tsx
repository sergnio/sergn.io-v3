import {
  Button,
  FieldError,
  Group,
  Input,
  Label,
  NumberField,
} from "react-aria-components";
import { camelize } from "~/utils/transformers";

interface Props {
  label: string;
  incrementDecrementButtons?: boolean;
}

export const NumberInput = ({ label, incrementDecrementButtons }: Props) => (
  <NumberField name={camelize(label)} isRequired>
    <Label>{label}</Label>
    {incrementDecrementButtons ? (
      <Group>
        <Button slot="decrement">-</Button>
        <Input />
        <Button slot="increment">+</Button>
      </Group>
    ) : (
      <Input />
    )}
    <FieldError />
  </NumberField>
);
